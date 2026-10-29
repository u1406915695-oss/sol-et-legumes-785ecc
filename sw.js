/* Panier (anciennement Sol & Légumes) – service worker « cache d'abord ».
   Mise à jour silencieuse (18/10/2026) : une nouvelle version se télécharge en arrière-plan et ATTEND (pas de skipWaiting à l'installation) ;
   elle prend la main à la prochaine ouverture de l'appli (navigation sans autre page ouverte), jamais en pleine utilisation.
   La page (index.html) n'est plus remplacée en arrière-plan dans le cache : chaque version de service worker sert SA page.
   Généré par build.py → public/sw.js (ne pas modifier public/sw.js à la main : modifier ce modèle).
   Le numéro de version (date + empreinte du contenu) nomme le cache. */
var C='sol-legumes-2026-10-29-1d387622';
var INDEX=new URL('index.html',self.registration.scope).href;
var ANNEXES=['manifest.json','icon-192.png','icon-512.png','apple-touch-icon.png','favicon-32.png'];
/* v6 : photos d'illustration des recettes (liste produite par build.py), mises en cache à l'installation pour être disponibles hors ligne (au mieux : une photo manquante est reprise au premier affichage en ligne). */
var PHOTOS=["photos/tarte-pommes-miel.webp", "photos/araignee-farcie.webp", "photos/pommes-de-terre-romarin-miel.webp", "photos/veloute-carottes-pdt-miel-thym.webp", "photos/chou-rouge-pommes-demi-chou.webp", "photos/endives-braisees-pomme-miel.webp", "photos/galettes-sarrasin-pommes-miel.webp", "photos/pommes-four-coeur-miel.webp", "photos/poires-pochees-miel-thym.webp", "photos/veloute-potimarron-carotte-miel.webp", "photos/chataignes-pommes-poelees-miel.webp", "photos/fraises-miel-minute.webp", "photos/courgettes-ail-origan-poelee.webp", "photos/tomates-rotis-ail-thym-miel.webp", "photos/melon-miel-frais.webp", "photos/prunes-dorees-four-miel.webp", "photos/carottes-glacees-miel-thym.webp", "photos/veloute-courgettes-pdt-ail.webp", "photos/plantes/ble-tendre.webp", "photos/plantes/ble-dur.webp", "photos/plantes/orge-hiver.webp", "photos/plantes/triticale.webp", "photos/plantes/seigle.webp", "photos/plantes/sorgho-grain.webp", "photos/plantes/millet.webp", "photos/plantes/sarrasin.webp", "photos/plantes/tournesol.webp", "photos/plantes/colza.webp", "photos/plantes/mais-grain.webp", "photos/plantes/feverole.webp", "photos/plantes/lentille.webp", "photos/plantes/pois-chiche.webp", "photos/plantes/luzerne.webp", "photos/plantes/sainfoin.webp", "photos/plantes/vigne.webp", "photos/plantes/olivier.webp", "photos/plantes/amandier.webp", "photos/plantes/pistachier.webp", "photos/plantes/abricotier.webp", "photos/plantes/chataignier.webp", "photos/plantes/kiwi.webp", "photos/plantes/lavande-fine.webp", "photos/plantes/lavandin.webp", "photos/plantes/thym.webp", "photos/plantes/romarin.webp", "photos/plantes/origan.webp", "photos/plantes/safran.webp", "photos/plantes/asperge.webp", "photos/plantes/carotte.webp", "photos/plantes/ail.webp", "photos/plantes/oignon.webp", "photos/plantes/melon.webp", "photos/plantes/tomate.webp", "photos/plantes/pomme-de-terre.webp", "photos/plantes/fraise.webp", "photos/plantes/pommier-cidre.webp", "photos/plantes/cassis.webp", "photos/plantes/myrtille.webp", "photos/plantes/immortelle.webp", "photos/plantes/lin-textile.webp", "photos/plantes/betterave-sucriere.webp", "photos/plantes/endive.webp", "photos/chambres/ch-quiche-orties.webp", "photos/chambres/plat-ch-pommes-coings-crumble.webp", "photos/chambres/ch-poulet-citron.webp", "photos/chambres/ch-crique-ardechoise.webp", "photos/chambres/ch-garbure.webp", "photos/chambres/ch-tarte-oignon-citou.webp", "photos/chambres/ch-gateau-noix.webp", "photos/chambres/ch-lapin-moutarde.webp", "photos/chambres/ch-cepes-farcis.webp", "photos/app/bandeau.webp", "photos/app/capture-1.webp", "photos/app/capture-2.webp", "photos/app/capture-3.webp", "photos/app/capture-4.webp", "photos/app/capture-5.webp", "photos/app/capture-6.webp", "photos/eco/chinchard-four-pdt-tomates.webp", "photos/eco/eco-calmars-tomate-pdt.webp", "photos/eco/eco-compote-pommes-poires-miel.webp", "photos/eco/eco-courgettes-tomates-fondantes.webp", "photos/eco/eco-flan-oeufs-lait-miel.webp", "photos/eco/eco-lotte-court-bouillon.webp", "photos/eco/eco-merlu-papillote-tomates-courgettes.webp", "photos/eco/eco-oeufs-cocotte-poireaux.webp", "photos/eco/eco-omelette-courgettes-ail.webp", "photos/eco/eco-omelette-pdt-oignon.webp", "photos/eco/eco-puree-carottes-oeufs.webp", "photos/eco/eco-puree-potimarron-pdt.webp", "photos/eco/eco-soupe-poireaux-pdt-carottes.webp", "photos/eco/eco-veloute-potimarron-lait.webp", "photos/eco/plat-eco-bouillon-verts-poireaux-pdt.webp", "photos/eco/plat-eco-brandade-merlu.webp", "photos/eco/plat-eco-carottes-rapees-pomme-miel.webp", "photos/eco/plat-eco-encornets-ail.webp", "photos/eco/plat-eco-gratin-dauphinois-lait.webp", "photos/eco/plat-eco-gratin-pdt-poireaux.webp", "photos/eco/plat-eco-merlu-poche-pdt.webp", "photos/eco/plat-eco-poireaux-vinaigrette-oeuf.webp", "photos/eco/plat-eco-poulpe-pdt-oignon.webp", "photos/eco/plat-eco-saint-jacques-fondue-poireaux.webp", "photos/eco/plat-eco-saint-jacques-puree-carottes.webp", "photos/eco/plat-eco-salade-endives-pommes-oeufs.webp", "photos/eco/plat-eco-soupe-oignon.webp", "photos/eco/plat-eco-veloute-potimarron-chataignes.webp", "photos/eco/poelee-poireaux-pdt-miel-thym.webp", "photos/peche/araignee.webp", "photos/api/chataignier.webp", "photos/api/colza.webp", "photos/api/lavande.webp", "photos/api/phacelie.webp", "photos/api/sarrasin.webp", "photos/api/tournesol.webp", "photos/peche/coque.webp", "photos/peche/coquille-st-jacques.webp", "photos/peche/couteau.webp", "photos/peche/encornet.webp", "photos/peche/etrille.webp", "photos/peche/palourde.webp", "photos/peche/poulpe.webp"];

/* Installation : la page est indispensable (échec = on garde l'ancienne version) ; manifest, icônes et photos : au mieux. */
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(C).then(function(c){
    var neuf=function(u){return new Request(u,{cache:'reload'});};
    return c.add(neuf(INDEX)).then(function(){
      return Promise.all(ANNEXES.concat(PHOTOS).map(function(a){return c.add(neuf(new URL(a,self.registration.scope).href)).catch(function(){});}));
    });
  }));   /* pas de skipWaiting ici : la nouvelle version attend la prochaine ouverture (voir « navigation » plus bas) */
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
  /* « passer » : activer tout de suite cette version en attente (bouton « Vérifier s'il y a une mise à jour », page déjà de cette version,
     ou service worker précédent au moment d'une réouverture) */
  if(e.data.type==='passer'){self.skipWaiting();return;}
  var src=e.source;
  /* « version » : réponse sur le canal fourni (MessageChannel) s'il y en a un, sinon à l'expéditeur */
  if(e.data.type==='version'){var rep={type:'version',cache:C};if(e.ports&&e.ports[0])e.ports[0].postMessage(rep);else src.postMessage(rep);return;}
  /* Feature hors ligne (17/10/2026) : réseau faible = une photo ou une icône a pu manquer à l'installation ; à chaque ouverture en ligne,
     la page demande de compléter le cache avec ce qui manque (rien n'est retéléchargé si tout est déjà là). */
  if(e.data.type==='completer'){
    e.waitUntil(caches.open(C).then(function(c){
      return Promise.all(ANNEXES.concat(PHOTOS).map(function(a){
        var u=new URL(a,self.registration.scope).href;
        return c.match(u).then(function(m){return m?0:c.add(new Request(u,{cache:'reload'})).then(function(){return 1;},function(){return 0;});});
      }));
    }).then(function(l){var n=l.reduce(function(s,x){return s+x;},0);src.postMessage({type:'complete',ajoutes:n,total:ANNEXES.length+PHOTOS.length});},function(){}));
    return;
  }
  if(e.data.type!=='etat')return;
  e.waitUntil(etat.then(function(ok){if(ok!==null)src.postMessage({type:'reseau',ok:ok});}));
});

/* Version en attente (installée, pas encore active) : on lui demande le nom de son cache.
   La question est reposée toutes les 300 ms (1,5 s au plus) : juste après l'installation, Chrome peut perdre le tout premier message. */
function cacheEnAttente(w){
  return new Promise(function(ok){
    var fini=false, essais=[];
    function fin(v){if(fini)return;fini=true;essais.forEach(clearTimeout);ok(v);}
    function demander(){
      if(fini)return;
      var ch=new MessageChannel();
      ch.port1.onmessage=function(m){fin(m.data&&m.data.cache?m.data.cache:null);};
      try{w.postMessage({type:'version'},[ch.port2]);}catch(_){fin(null);}
    }
    for(var i=0;i<5;i++)essais.push(setTimeout(demander,i*300));
    essais.push(setTimeout(function(){fin(null);},1500));
  });
}
/* Navigation (ouverture ou rechargement de l'appli) :
   - si une nouvelle version attend ET qu'aucune autre page de l'appli n'est ouverte (réouverture), on sert la page de la nouvelle version
     et on lui passe la main (elle supprimera l'ancien cache à son activation) ;
   - sinon on sert la page de cette version, depuis le cache (hors ligne compris) ;
   - une petite requête HEAD sans corps dit si le réseau répond vraiment (indicateur « Sans réseau »), sans retélécharger la page. */
function navigation(e){
  var sonde=fetch(INDEX,{method:'HEAD',cache:'no-store'}).then(function(rep){return !!(rep&&rep.ok);},function(){return false;});
  etat=sonde; e.waitUntil(sonde);
  var w=self.registration.waiting;
  var bascule=!w?Promise.resolve(null):self.clients.matchAll({type:'window'}).then(function(l){
    if(l.length>1)return null;                                  /* une autre page est ouverte : on ne change rien en pleine utilisation */
    return cacheEnAttente(w).then(function(nom){
      if(!nom||nom===C||nom.indexOf('sol-legumes')!==0)return null;
      return caches.open(nom).then(function(c){return c.match(INDEX);}).then(function(rep){
        if(!rep)return null;
        w.postMessage({type:'passer'});
        return rep;
      });
    });
  }).catch(function(){return null;});
  return bascule.then(function(rep){
    if(rep)return rep;
    return caches.open(C).then(function(c){
      return c.match(INDEX).then(function(copie){
        if(copie)return copie;
        return fetch(INDEX).then(function(r){if(r&&r.ok&&r.type==='basic')c.put(INDEX,r.clone()).catch(function(){});return r;});
      });
    });
  }).catch(function(){return Response.error();});
}

/* Cache d'abord : on répond tout de suite avec la copie du téléphone (photos, icônes…) et on la met à jour en arrière-plan. */
self.addEventListener('fetch',function(e){
  var r=e.request;
  if(r.method!=='GET'||r.headers.has('range'))return;          /* on ignore tout sauf les GET simples */
  if(new URL(r.url).origin!==self.location.origin)return;       /* et tout ce qui vient d'un autre site */
  if(r.mode==='navigate'){e.respondWith(navigation(e));return;}  /* toute navigation → la page unique de la bonne version */
  var cle=r.url;
  e.respondWith(caches.open(C).then(function(c){
    return c.match(cle,{ignoreSearch:true}).then(function(copie){
      var maj=fetch(r,{cache:'no-cache'}).then(function(rep){
        var ecrit=(rep&&rep.ok&&rep.type==='basic')?c.put(cle,rep.clone()).catch(function(){}):Promise.resolve();
        return ecrit.then(function(){return rep;});
      }).catch(function(){return null;});
      e.waitUntil(maj);
      if(copie)return copie;
      return maj.then(function(rep){return rep||Response.error();});
    });
  }));
});
