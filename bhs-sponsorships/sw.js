// Minimal service worker so the page can be installed as an app.
// Always goes to the network; submissions are never cached.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function () {});
