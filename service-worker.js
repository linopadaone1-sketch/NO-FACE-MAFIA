const CACHE_NAME = 'nfm-v1';
const URLS_TO_CACHE = [
  'index.html',
  'beats.html',
  'artistes.html',
  'projets.html',
  'apropos.html',
  'contact.html',
  'css/style.css',
  'js/main.js',
  'js/beats.js',
  'js/artistes.js',
  'js/projets.js',
  'js/contact.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});