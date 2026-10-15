// minimal service worker so the app can be installed/opened offline once it's been loaded once.
// (on a plain file:// page this simply won't register — browsers require a real http/https origin
// for service workers — the page already ignores that failure, so this file is only needed if you
// ever host these files on a small local/web server instead of opening the .html directly.)
const CACHE_NAME = 'pattern-log-builder-v1';
const ASSETS = ['index.html', 'manifest.json', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
