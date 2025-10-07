const CACHE_NAME = 're-wedding-v2';
const ASSETS = [
  '/app.html',
  '/assets/css/styles.css',
  '/assets/js/main.js',
  'https://unpkg.com/swiper@9/swiper-bundle.min.css',
  'https://unpkg.com/swiper@9/swiper-bundle.min.js',
  'https://unpkg.com/aos@2.3.4/dist/aos.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => k !== CACHE_NAME && caches.delete(k))))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});


