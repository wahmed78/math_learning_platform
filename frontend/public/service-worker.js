// Import Workbox libraries
import { precacheAndRoute } from 'workbox-precaching';

// Precache files generated during the build process
precacheAndRoute(self.__WB_MANIFEST);

// Listen for 'install' event
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  // Perform any additional setup or caching here
});

// Listen for 'activate' event
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  // Perform cleanup of old caches if necessary
});

// Handle fetch events
self.addEventListener('fetch', (event) => {
  console.log('[Service Worker] Fetching:', event.request.url);
  // You can implement custom caching strategies here
});
