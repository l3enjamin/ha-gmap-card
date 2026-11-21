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

async function ensureLibrariesLoaded(): Promise<any> {
  if (!window.google?.maps) {
    throw new Error("Google Maps loaded but window.google.maps is undefined");
  }
  if (typeof window.google.maps.importLibrary === "function") {
    await window.google.maps.importLibrary("maps");
    try {
      await window.google.maps.importLibrary("marker");
    } catch (_) {}
  }
  return window.google;
}

/**
 * Singleton Google Maps API loader using modern `loading=async` dynamic script injection.
 * Resolves to `window.google` after core `maps` and `marker` libraries are ready.
 */
export function loadGoogleMaps(options: MapLoaderOptions): Promise<any> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Cannot load Google Maps outside browser environment"));
  }

  if (window.google?.maps) {
    return ensureLibrariesLoaded();
  }

  if (window._haGmapLoadingPromise) {
    return window._haGmapLoadingPromise;
  }

  window._haGmapLoadingPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
    if (existing) {
      if (window.google?.maps) {
        ensureLibrariesLoaded().then(resolve, reject);
        return;
      }
      existing.addEventListener("load", () => ensureLibrariesLoaded().then(resolve, reject), { once: true });
      existing.addEventListener(
        "error",
        (e) => {
          window._haGmapLoadingPromise = undefined;
          reject(e);
        },
        { once: true }
      );
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
      ensureLibrariesLoaded().then(resolve, (err) => {
        window._haGmapLoadingPromise = undefined;
        reject(err);
      });
    };
    script.onerror = (err) => {
      window._haGmapLoadingPromise = undefined;
      reject(err);
    };

    document.head.appendChild(script);
  });

  return window._haGmapLoadingPromise;
}
