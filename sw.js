const CACHE_NAME = 'CALENDAR-V1';

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll([
        '/',
        '/converter.js',
        '/converter.css',
        // Add more files and paths to cache as needed
      ]);
      console.log('Service Worker installed successfully');
    } catch (error) {
      console.error('Service Worker installation failed:', error);
    }
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    // Clean up old caches
    const cacheKeys = await caches.keys();
    await Promise.all(
      cacheKeys.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      })
    );
    console.log('Service Worker activated successfully');
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    // Try to get the resource from the cache
    const cachedResponse = await cache.match(event.request);

    // If the resource is in the cache, return it
    if (cachedResponse) {
      return cachedResponse;
    }

    try {
      // If the resource is not in the cache, try the network
      const fetchResponse = await fetch(event.request);

      // Check if the response is valid
      if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
        return fetchResponse;
      }

      // Clone the response to save it in the cache
      const responseToCache = fetchResponse.clone();

      // Save the resource in the cache and return it
      cache.put(event.request, responseToCache);
      return fetchResponse;
    } catch (error) {
      // The network request failed, return a custom offline page or handle as needed
      return caches.match('/offline.html');
    }
  })());
});
