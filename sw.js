/* Sol & Légumes – service worker « cache d'abord » (stale-while-revalidate).
   Généré par build.py → public/sw.js (ne pas modifier public/sw.js à la main : modifier ce modèle).
   Le numéro de version (date + empreinte du contenu) nomme le cache. */
var C='sol-legumes-2026-10-03-fc896943';
var INDEX=new URL('index.html',self.registration.scope).href;
var ANNEXES=['manifest.json','icon-192.png','icon-512.png','apple-touch-icon.png'];

/* Installation : la page est indispensable (échec = on garde l'ancienne version) ; manifest et icônes : au mieux. */
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(C).then(function(c){
    var neuf=function(u){return new Request(u,{cache:'reload'});};
    return c.add(neuf(INDEX)).then(function(){
      return Promise.all(ANNEXES.map(function(a){return c.add(neuf(new URL(a,self.registration.scope).href)).catch(function(){});}));
    });
  }).then(function(){return self.skipWaiting();}));
});

/* Activation : on supprime les anciens caches de l'appli (et eux seuls), puis on prend la main sur les pages ouvertes. */
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(noms){
    return Promise.all(noms.filter(function(n){return n.indexOf('sol-legumes')===0&&n!==C;}).map(function(n){return caches.delete(n);}));
  }).then(function(){return self.clients.claim();}));
});

/* Résultat de la dernière mise à jour en arrière-plan de la page (true = réseau OK, false = échec) ; la page le demande à l'ouverture
   pour afficher « Sans réseau » même quand le téléphone se croit connecté (wifi sans accès). */
var etat=Promise.resolve(null);
self.addEventListener('message',function(e){
  if(!e.data||!e.source)return;
  if(e.data.type==='passer'){self.skipWaiting();return;}   /* bouton « Mettre à jour maintenant » : activer tout de suite une version en attente */
  var src=e.source;
  if(e.data.type==='version'){src.postMessage({type:'version',cache:C});return;}   /* la page compare avec sa propre version */
  if(e.data.type!=='etat')return;
  e.waitUntil(etat.then(function(ok){if(ok!==null)src.postMessage({type:'reseau',ok:ok});}));
});

/* Cache d'abord : on répond tout de suite avec la copie du téléphone et on la met à jour en arrière-plan. */
self.addEventListener('fetch',function(e){
  var r=e.request;
  if(r.method!=='GET'||r.headers.has('range'))return;          /* on ignore tout sauf les GET simples */
  if(new URL(r.url).origin!==self.location.origin)return;       /* et tout ce qui vient d'un autre site */
  var nav=r.mode==='navigate';
  var cle=nav?INDEX:r.url;                                       /* toute navigation → la page unique */
  e.respondWith(caches.open(C).then(function(c){
    return c.match(cle,{ignoreSearch:true}).then(function(copie){
      var maj=fetch(nav?INDEX:r,{cache:'no-cache'}).then(function(rep){
        var ecrit=(rep&&rep.ok&&rep.type==='basic')?c.put(cle,rep.clone()).catch(function(){}):Promise.resolve();
        return ecrit.then(function(){return rep;});
      }).catch(function(){return null;});
      e.waitUntil(maj);
      if(nav){etat=maj.then(function(rep){return !!(rep&&rep.ok);});}
      if(copie)return copie;
      return maj.then(function(rep){return rep||c.match(INDEX).then(function(i){return nav&&i?i:Response.error();});});
    });
  }));
});
