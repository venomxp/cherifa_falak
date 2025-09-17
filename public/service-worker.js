// This service worker handles the logic for displaying notifications,
// allowing them to be triggered even when the app is not in the foreground.

self.addEventListener('install', () => {
  // Activate the new service worker as soon as it's installed.
  self.skipWaiting();
});

self.addEventListener('message', (event) => {
  // Listen for messages from the main app to show a notification.
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const { title, options } = event.data.payload;
    event.waitUntil(self.registration.showNotification(title, options));
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  // This logic focuses the app's window if it's already open,
  // or opens a new one if it's closed.
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        let client = clientList[0];
        // Find the focused client if multiple windows are open.
        for (let i = 0; i < clientList.length; i++) {
          if (clientList[i].focused) {
            client = clientList[i];
          }
        }
        return client.focus();
      }
      return clients.openWindow('/');
    })
  );
});
