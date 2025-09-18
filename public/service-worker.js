// This service worker is no longer used for notifications,
// as the app now integrates with the AppCreator24 native notification system.
// It is kept for potential future PWA caching features.

self.addEventListener('install', () => {
  self.skipWaiting();
});
