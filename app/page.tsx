import Link from 'next/link';

function Nav(){
  return <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[64px] flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2 font-extrabold text-xl"><span className="w-8 h-8 rounded-lg bg-indigo-600 grid place-items-center text-white">A</span> AutoAdmin</Link>
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
        <a href="#fonctionnalites" className="hover:text-slate-900">Fonctionnalités</a>
        <a href="#comment-ca-marche" className="hover:text-slate-900">Comment ça marche</a>
        <a href="#tarifs" className="hover:text-slate-900">Tarifs</a>
        <a href="#faq" className="hover:text-slate-900">FAQ</a>
      </nav>
      <div className="flex items-center gap-2">
        <Link href="/login" className="hidden sm:inline-flex px-4 py-2 rounded-xl font-semibold text-sm border border-slate-200 bg-white hover:bg-slate-50">Connexion</Link>
        <Link href="/register" className="btn-primary !py-2 !px-4 text-sm">Commencer gratuitement</Link>
      </div>
    </div>
  </header>
}

export default function Home(){
  return <div>
    <Nav/>
    {/* HERO */}
    <section className="gradient-hero border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="badge">Nouveau — Automatisation + IA + Surveillance</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">Votre administratif.<br/><span className="text-indigo-600">Automatisé.</span></h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">Connectez vos outils professionnels et laissez AutoAdmin gérer les tâches répétitives à votre place. Factures, relances, emails, documents, rendez-vous — sans rien oublier.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/register" className="btn-primary">Commencer gratuitement →</Link>
            <a href="#comment-ca-marche" className="btn-ghost">Voir comment ça marche</a>
          </div>
          <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">
            <span className="flex -space-x-2"><span className="w-7 h-7 rounded-full bg-indigo-200 border-2 border-white"/><span className="w-7 h-7 rounded-full bg-violet-200 border-2 border-white"/><span className="w-7 h-7 rounded-full bg-sky-200 border-2 border-white"/></span>
            <span>1 200+ indépendants nous font confiance • Sans carte bancaire</span>
          </div>
          <div className="mt-6 flex gap-6 text-xs text-slate-500">
            <span>✔ RGPD prêt</span><span>✔ Chiffrement</span><span>✔ Support humain</span>
          </div>
        </div>
        <div className="relative">
          <div className="card p-4 sm:p-6">
            <div className="flex items-center justify-between"><h3 className="font-bold">Tableau de bord</h3><span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full border border-emerald-100">● En surveillance</span></div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                ['Temps économisé','14h 20m','+2h cette semaine'],
                ['Tâches automatisées','127','18 aujourd’hui'],
                ['Factures suivies','23','2 en retard'],
              ].map(([a,b,c])=> <div key={a} className="rounded-xl border border-slate-100 bg-slate-50 p-3"><div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">{a}</div><div className="text-lg font-extrabold">{b}</div><div className="text-xs text-emerald-600">{c}</div></div>)}
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl border border-amber-200 bg-amber-50"><span className="text-sm font-medium">Facture #2026-042 en retard (J+7)</span><span className="text-xs bg-white border px-2 py-1 rounded-full">Relance auto prête — validation requise</span></div>
              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white"><span className="text-sm">Email: demande de document — classé automatiquement</span><span className="text-xs text-slate-500">il y a 3 min</span></div>
              <div className="flex items-center justify-between p-3 rounded-xl border border-indigo-100 bg-indigo-50"><span className="text-sm font-medium">Rendez-vous demain 10h — rappel programmé</span><span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">Automatique</span></div>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 hidden sm:block card p-3 text-xs">
            <div className="font-bold">Mode SAFE activé</div>
            <div className="text-slate-500">Simulation sans envoi réel → vous validez avant.</div>
          </div>
        </div>
      </div>
    </section>

    {/* PROBLEMS */}
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center">L'administratif vous vole du temps. Nous le récupérons.</h2>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          ['📧 Trop d’emails','Tri, détection des demandes, brouillons auto — vous validez.'],
          ['🧾 Factures oubliées','Suivi des échéances, relances, rapprochement paiements.'],
          ['📂 Documents dispersés','Drive connecté, classement et recherche instantanée.'],
          ['📅 Rendez-vous manqués','Rappels automatiques, confirmations, replanification.'],
          ['💸 Paiements en retard','Relances graduelles, alertes, historique complet.'],
          ['🔁 Tâches répétitives','Règles SI → ALORS, journal d’audit, mode simulation.'],
          ['👁️ Manque de visibilité','Dashboard, temps économisé, argent récupéré.'],
          ['⏰ Oublis & stress','Surveillance 24/7, actions sans risque en auto, le reste avec validation.'],
        ].map(([t,d])=> <div key={t} className="card p-4"><div className="font-bold">{t}</div><div className="text-sm text-slate-600 mt-1">{d}</div></div>)}
      </div>
    </section>

    {/* FEATURES */}
    <section id="fonctionnalites" className="bg-white border-y border-slate-200 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Connexions + Automatisations + Surveillance + Actions + Tableau de bord</h2>
        <p className="text-slate-600 mt-2">L'IA est le moteur. La valeur est le système complet.</p>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {[
            ['🔌 Connexions','Gmail, Outlook, Google/Microsoft Calendar, Drive, OneDrive, Stripe. OAuth, permissions minimales, déconnexion en 1 clic.'],
            ['⚙️ Automatisations SI → ALORS','Éditeur visuel, 3 niveaux de validation, anti-boucle, historique et simulation.'],
            ['🤖 IA utile','Comprend les emails, extrait les échéances, classe les documents, propose des brouillons et des automatisations.'],
            ['🛡️ Validation humaine','Niveau 1 auto, Niveau 2 validation requise, Niveau 3 toujours manuel. Journal complet.'],
            ['📊 Dashboard pro','Temps économisé, factures, relances, documents manquants, alertes, prochains rendez-vous.'],
            ['🔒 Sécurité & RGPD','HTTPS, hash bcrypt, HttpOnly cookies, rate-limit, chiffrement secrets, export & suppression des données.'],
          ].map(([t,d])=> <div key={t} className="card p-5"><div className="font-bold">{t}</div><div className="text-sm text-slate-600 mt-2 leading-relaxed">{d}</div></div>)}
        </div>
      </div>
    </section>

    {/* HOW IT WORKS */}
    <section id="comment-ca-marche" className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center">Comment ça marche</h2>
      <div className="mt-8 grid md:grid-cols-4 gap-4">
        {[
          ['1','Connectez','Gmail, Drive, Calendar, Stripe en 2 minutes via OAuth.'],
          ['2','Choisissez','Activez des modèles : relances, rappels, classement.'],
          ['3','Surveillez','AutoAdmin détecte les événements et propose les actions.'],
          ['4','Validez','Mode SAFE pour tester, puis passage en automatique sécurisé.'],
        ].map(([n,t,d])=> <div key={n} className="card p-5 text-center"><div className="w-10 h-10 rounded-full bg-indigo-600 text-white grid place-items-center font-extrabold mx-auto">{n}</div><div className="font-bold mt-3">{t}</div><div className="text-sm text-slate-600 mt-1">{d}</div></div>)}
      </div>
    </section>

    {/* PRICING */}
    <section id="tarifs" className="bg-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-extrabold text-center">Tarifs simples et transparents</h2>
        <p className="text-center text-slate-300 mt-2">Changez de plan à tout moment. Stripe Billing. Sans engagement.</p>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {[
            {name:'FREE', price:'0€', per:'/mois', features:['3 automatisations','1 intégration','Dashboard de base','Support communautaire'], cta:'Commencer gratuitement', highlight:false},
            {name:'PRO', price:'9,99€', per:'/mois', features:['Automatisations illimitées','5 intégrations','IA & brouillons','Historique & statistiques','Mode SAFE'], cta:'Choisir PRO', highlight:true},
            {name:'BUSINESS', price:'29,99€', per:'/mois', features:['Tout PRO +','Équipe (5 membres)','20 intégrations','Priorité support','API & webhooks'], cta:'Choisir BUSINESS', highlight:false},
          ].map(p=> <div key={p.name} className={`rounded-2xl p-6 border ${p.highlight?'bg-white text-slate-900 border-white shadow-xl scale-[1.02]':'bg-slate-800 border-slate-700'}`}>
            <div className="text-sm font-bold tracking-widest">{p.name}</div>
            <div className="mt-2 flex items-baseline gap-1"><span className="text-4xl font-extrabold">{p.price}</span><span className={`text-sm ${p.highlight?'text-slate-500':'text-slate-400'}`}>{p.per}</span></div>
            <ul className={`mt-4 space-y-2 text-sm ${p.highlight?'text-slate-600':'text-slate-300'}`}>{p.features.map(f=> <li key={f}>✔ {f}</li>)}</ul>
            <Link href="/register" className={`mt-6 block text-center font-bold rounded-xl py-3 ${p.highlight?'bg-indigo-600 text-white hover:bg-indigo-700':'bg-white text-slate-900 hover:bg-slate-100'}`}>{p.cta}</Link>
            <div className={`text-xs mt-3 text-center ${p.highlight?'text-slate-500':'text-slate-400'}`}>Paiement annuel -20% disponible</div>
          </div>)}
        </div>
        <div className="text-center text-xs text-slate-400 mt-6">Prix modifiables via variables d'environnement Stripe. TVA selon pays.</div>
      </div>
    </section>

    {/* FAQ */}
    <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-2xl font-extrabold text-center">FAQ</h2>
      <div className="mt-6 space-y-3">
        {[
          ['AutoAdmin lit-il mes emails sans autorisation ?','Non. Vous connectez explicitement Gmail/Outlook via OAuth avec permissions minimales (lecture). Vous pouvez déconnecter à tout moment.'],
          ['L’IA peut-elle envoyer un email ou payer à ma place ?','Niveau 1 (sans risque) en auto, Niveau 2/3 avec votre validation obligatoire. Les paiements et suppressions nécessitent toujours validation.'],
          ['Où sont mes données ?','Hébergées en UE si possible, chiffrées, exportables et supprimables (RGPD). Aucun mot de passe en clair.'],
          ['Comment fonctionne la facturation ?','Via Stripe Checkout + Customer Portal + webhooks. Abonnement synchronisé côté serveur.'],
        ].map(([q,a])=> <details key={q} className="card p-4"><summary className="font-semibold cursor-pointer">{q}</summary><p className="text-sm text-slate-600 mt-2">{a}</p></details>)}
      </div>
    </section>

    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid md:grid-cols-4 gap-6 text-sm">
        <div><div className="font-extrabold">AutoAdmin</div><div className="text-slate-500 mt-1">Automatisez votre administratif et récupérez votre temps.</div></div>
        <div><div className="font-bold">Produit</div><div className="mt-2 space-y-1 text-slate-600"><a href="#fonctionnalites" className="block hover:underline">Fonctionnalités</a><a href="#tarifs" className="block hover:underline">Tarifs</a><Link href="/legal/cgu" className="block hover:underline">CGU</Link></div></div>
        <div><div className="font-bold">Légal</div><div className="mt-2 space-y-1 text-slate-600"><Link href="/legal/confidentialite" className="block hover:underline">Confidentialité</Link><Link href="/legal/mentions" className="block hover:underline">Mentions légales</Link><Link href="/legal/cookies" className="block hover:underline">Cookies</Link></div></div>
        <div><div className="font-bold">Contact</div><div className="mt-2 text-slate-600">support@autoadmin.example<br/>Formulaire: <Link href="/contact" className="underline">/contact</Link></div></div>
      </div>
      <div className="text-center text-xs text-slate-400 pb-6">© 2026 AutoAdmin — Tous droits réservés. RGPD : pages légales à faire valider juridiquement.</div>
    </footer>
  </div>
}
