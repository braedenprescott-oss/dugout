// Dugout service worker — cache-first for the app shell, works offline.
// Bump CACHE_VERSION whenever you change any cached files to force a refresh.
const CACHE_VERSION = 'rebels-dugout-v12';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './icon-192.png'
];

// Install: pre-cache the app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// Activate: clear old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

// Fetch: cache-first, falling back to network, with network-update for HTML
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // For the main HTML, try network first so updates arrive quickly, else use cache
  if (req.mode === 'navigate' || req.destination === 'document'){
    event.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE_VERSION).then(cache => cache.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // For other static resources: cache-first
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        if (res && res.status === 200 && res.type === 'basic'){
          const copy = res.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(req, copy));
        }
        return res;
      }).catch(() => cached);
    })
  );
});
