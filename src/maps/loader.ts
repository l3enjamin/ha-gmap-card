declare global {
  interface Window {
    google?: any;
    _haGmapLoadingPromise?: Promise<any>;
  }
}

export interface MapLoaderOptions {
  apiKey: string;
  libraries?: string[];
  language?: string;
}

async function waitForMapsBootstrap(timeoutMs = 10000): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (
      typeof window.google?.maps?.Map === "function" ||
      typeof window.google?.maps?.importLibrary === "function"
    ) {
      return;
    }
    await new Promise((r) => setTimeout(r, 25));
  }
  throw new Error("Timed out waiting for Google Maps bootstrap");
}

async function ensureLibrariesLoaded(): Promise<any> {
  await waitForMapsBootstrap();

  if (typeof window.google?.maps?.importLibrary === "function") {
    const mapsLib = await window.google.maps.importLibrary("maps");
    if (mapsLib && typeof window.google.maps.Map !== "function") {
      Object.assign(window.google.maps, mapsLib);
    }
    try {
      const markerLib = await window.google.maps.importLibrary("marker");
      if (markerLib && !window.google.maps.marker) {
        window.google.maps.marker = markerLib;
      }
    } catch (_) {}
  }

  if (typeof window.google?.maps?.Map !== "function") {
    await waitForMapsBootstrap(5000);
  }
  if (typeof window.google?.maps?.Map !== "function") {
    throw new Error("Google Maps loaded but google.maps.Map constructor is unavailable");
  }

  return window.google;
}

/**
 * Singleton Google Maps API loader using modern `loading=async` dynamic script injection.
 * Resolves to `window.google` only after `google.maps.Map` and `marker` libraries are ready.
 */
export function loadGoogleMaps(options: MapLoaderOptions): Promise<any> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Cannot load Google Maps outside browser environment"));
  }

  if (typeof window.google?.maps?.Map === "function") {
    return ensureLibrariesLoaded();
  }

  if (window._haGmapLoadingPromise) {
    return window._haGmapLoadingPromise;
  }

  window._haGmapLoadingPromise = new Promise((resolve, reject) => {
    const fail = (err: any) => {
      window._haGmapLoadingPromise = undefined;
      reject(err);
    };

    if (window.google?.maps) {
      ensureLibrariesLoaded().then(resolve, fail);
      return;
    }

    const existing = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
    if (existing) {
      if (window.google?.maps) {
        ensureLibrariesLoaded().then(resolve, fail);
        return;
      }
      existing.addEventListener("load", () => ensureLibrariesLoaded().then(resolve, fail), { once: true });
      existing.addEventListener("error", fail, { once: true });
      return;
    }

    const script = document.createElement("script");
    const libraries = options.libraries || ["maps", "marker", "geometry"];
    const params = new URLSearchParams({
      key: options.apiKey,
      v: "weekly",
      loading: "async",
      libraries: libraries.join(",")
    });

    if (options.language) {
      params.set("language", options.language);
    }

    script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    script.async = true;
    script.onload = () => {
      ensureLibrariesLoaded().then(resolve, fail);
    };
    script.onerror = fail;

    document.head.appendChild(script);
  });

  return window._haGmapLoadingPromise;
}
