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
  event.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        console.log('[INSTALL] Adding all core files to cache');
        return cache.addAll(filesToCache);
      })
      .then(function() {
        console.log('[INSTALL] All required files have been cached');
        return self.skipWaiting();
      })
  );
});

// Fetch listener
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {

        if( response ) {
          console.log('[FETCH] Returnig from Cache', event.request.url);
          return response;
        } 

        console.log('[FETCH] Returnig from Server:', event.request.url);
        return fetch(event.request);
        
      })
      .catch(function(error) {
        console.log(error);
      })
  );
});

// Activate listener
self.addEventListener('activate', function (event) {
  console.log('[ACTIVATE] Activating ServiceWorker!');

  console.log('[ACTIVATE] Claiming this ServiceWorker!');
  event.waitUntil(self.clients.claim());
});


