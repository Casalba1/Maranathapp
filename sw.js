// Service worker di Maranathapp: riceve le notifiche push e le mostra sul telefono.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) {}
  e.waitUntil(self.registration.showNotification(d.title || 'Maranathapp', {
    body: d.body || 'Hai un nuovo messaggio.',
    icon: 'icon-180.png',
    badge: 'favicon-32.png',
    tag: d.tag || 'maranathapp-avviso'
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) { if ('focus' in c) return c.focus(); }
    return self.clients.openWindow('./');
  }));
});
