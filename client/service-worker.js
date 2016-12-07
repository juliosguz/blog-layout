// Cache name
var cacheName = 'cache-v1';

// Files to cache
var filesToCache = [
  'index.html',
  'css/main.css',
  'https://fonts.googleapis.com/css?family=Roboto:300,400,700',
];

// Install listener
self.addEventListener('install', function (event) {
  console.log('Event: Install');
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});


// Activate listener
self.addEventListener('activate', function (event) {
  console.log('Event: Activate');
  // event.waitUntil();
});


// Fetch listener
self.addEventListener('fetch', function (event) {
  console.log('Event: Fetch', event.request.url);

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
