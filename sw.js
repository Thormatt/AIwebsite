// Service Worker for Thor AI Advisory
const CACHE_NAME = 'thor-ai-v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/script.js',
  '/index.html',
  // Google Fonts
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Crimson+Text:ital@0;1&display=swap',
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // Activate worker immediately
  );
});

// Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Take control of all pages
  );
});

// Fetch Strategy: Network first, fall back to cache
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Check if valid response
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        // Add to cache for future offline use
        caches.open(CACHE_NAME)
          .then(cache => {
            // Only cache same-origin and CORS-enabled resources
            if (event.request.url.startsWith(self.location.origin) || 
                event.request.url.includes('fonts.googleapis.com') ||
                event.request.url.includes('fonts.gstatic.com')) {
              cache.put(event.request, responseToCache);
            }
          });

        return response;
      })
      .catch(() => {
        // Network failed, try to get from cache
        return caches.match(event.request)
          .then(response => {
            if (response) {
              return response;
            }
            
            // If it's a navigation request, return the index.html
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
            
            // Return a fallback offline page if you have one
            // return caches.match('/offline.html');
          });
      })
  );
});

// Optional: Handle background sync for forms
self.addEventListener('sync', event => {
  if (event.tag === 'sync-forms') {
    // Define syncFormData function or comment out for now
    // event.waitUntil(syncFormData());
    console.log('Background sync triggered but not implemented');
  }
});

// Optional: Handle push notifications for new articles
self.addEventListener('push', event => {
  if (event.data) {
    const options = {
      body: event.data.text(),
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {
          action: 'read',
          title: 'Read Article',
        },
        {
          action: 'close',
          title: 'Close',
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification('New AI Insight from Thor', options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'read') {
    // Open the website
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
