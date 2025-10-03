const CACHE_NAME = "culinaryhub-v1";
const urlsToCache = [
  "/",
  "/favoritos",
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.jpg",
];

// Install service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Caching files");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate service worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Service Worker: Clearing old cache");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch with cache-first strategy
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Return cached version or fetch new
        return (
          response ||
          fetch(event.request).then((fetchResponse) => {
            // Cache new resources
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, fetchResponse.clone());
              return fetchResponse;
            });
          })
        );
      })
      .catch(() => {
        // Return offline page if available
        return caches.match("/");
      })
  );
});
