// network-first: always newest site when online, cached copy when offline
const C='hm-v1';
self.addEventListener('push',e=>{let d={};try{d=e.data?e.data.json():{}}catch(x){d={title:'Jamia Hudabia',body:e.data?e.data.text():''}}
  e.waitUntil(self.registration.showNotification(d.title||'Jamia Hudabia',{body:d.body||'',icon:'./madrassa-icon-192.png',badge:'./madrassa-icon-192.png',tag:d.tag||undefined,renotify:!!d.tag,data:{url:d.url||'./'}}))});
self.addEventListener('notificationclick',e=>{e.notification.close();const u=(e.notification.data&&e.notification.data.url)||'./';
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus' in c)return c.focus()}return self.clients.openWindow(u)}))});
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./madrassa-manifest.webmanifest','./madrassa-icon-192.png'])).catch(()=>{}))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET'||new URL(r.url).origin!==location.origin) return;
  e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res}).catch(()=>caches.match(r)));
});
