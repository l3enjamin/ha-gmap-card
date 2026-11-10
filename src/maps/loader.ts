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

/**
 * Singleton Google Maps API loader using modern `loading=async` dynamic script injection.
 */
export function loadGoogleMaps(options: MapLoaderOptions): Promise<any> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Cannot load Google Maps outside browser environment"));
  }

  if (window.google?.maps?.importLibrary) {
    return Promise.resolve(window.google.maps);
  }

  if (window._haGmapLoadingPromise) {
    return window._haGmapLoadingPromise;
  }

  window._haGmapLoadingPromise = new Promise((resolve, reject) => {
    // Check if script already on page
    const existing = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
    if (existing) {
      if (window.google?.maps) {
        resolve(window.google.maps);
        return;
      }
      existing.addEventListener("load", () => resolve(window.google.maps));
      existing.addEventListener("error", (e) => reject(e));
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
      if (window.google?.maps) {
        resolve(window.google.maps);
      } else {
        reject(new Error("Google Maps loaded but window.google.maps is undefined"));
      }
    };
    script.onerror = (err) => {
      window._haGmapLoadingPromise = undefined;
      reject(err);
    };

    document.head.appendChild(script);
  });

  return window._haGmapLoadingPromise;
}
