"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard(){
  const [data,setData]=useState<any>(null);
  const [auto,setAuto]=useState<any[]>([]);
  const [invoices,setInvoices]=useState<any[]>([]);
  useEffect(()=>{
    fetch('/api/me').then(r=>r.json()).then(setData);
    fetch('/api/automations').then(r=>r.json()).then(j=>setAuto(j.automations||[]));
    fetch('/api/invoices').then(r=>r.json()).then(j=>setInvoices(j.invoices||[]));
  },[]);
  async function logout(){ await fetch('/api/auth/logout',{method:'POST'}); location.href='/'; }
  return <div className="min-h-screen bg-slate-50">
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 h-[60px] flex items-center justify-between">
        <div className="flex items-center gap-6"><Link href="/" className="font-extrabold text-lg">AutoAdmin</Link><span className="hidden sm:inline text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">{data?.user?.plan||'FREE'}</span></div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="text-sm font-semibold px-3 py-2 rounded-xl bg-slate-900 text-white">Dashboard</Link>
          <Link href="/dashboard/automations" className="text-sm font-medium px-3 py-2 rounded-xl hover:bg-slate-100">Automatisations</Link>
          <Link href="/dashboard/billing" className="text-sm font-medium px-3 py-2 rounded-xl hover:bg-slate-100">Mon abonnement</Link>
          <Link href="/dashboard/settings" className="text-sm font-medium px-3 py-2 rounded-xl hover:bg-slate-100">Paramètres</Link>
          <button onClick={logout} className="text-sm border border-slate-200 bg-white rounded-xl px-3 py-2">Déconnexion</button>
        </div>
      </div>
    </header>

    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">Bonjour {data?.user?.name || '—'} 👋</h1>
        <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full">Surveillance active • Mode SAFE disponible</span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[
          ['Temps économisé ce mois-ci','14h 20','+2h vs semaine dernière'],
          ['Tâches automatisées','127','18 aujourd’hui'],
          ['Factures suivies', String(invoices.length||23),'2 en retard'],
          ['Relances effectuées','9','3 en attente de validation'],
        ].map(([t,v,s])=> <div key={t} className="card p-4"><div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{t}</div><div className="text-2xl font-extrabold mt-1">{v}</div><div className="text-xs text-emerald-600 mt-1">{s}</div></div>)}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-4">
            <div className="flex items-center justify-between"><h3 className="font-bold">Actions nécessitant votre validation (Niveau 2/3)</h3><span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">3</span></div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl border border-amber-200 bg-amber-50"><span className="text-sm">Relance facture SARL Martin — 1 250€ (J+7)</span><button className="text-xs bg-white border px-3 py-1 rounded-full font-semibold">Valider l'envoi</button></div>
              <div className="flex items-center justify-between p-3 rounded-xl border bg-white"><span className="text-sm">Paiement fournisseur — validation obligatoire (Niveau 3)</span><button className="text-xs bg-slate-900 text-white px-3 py-1 rounded-full">Examiner</button></div>
              <div className="flex items-center justify-between p-3 rounded-xl border bg-white"><span className="text-sm">Brouillon email : demande de document manquant</span><button className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-full">Approuver</button></div>
            </div>
          </div>

          <div className="card p-4">
            <h3 className="font-bold">Factures</h3>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs text-slate-500"><tr><th className="text-left py-2">Numéro</th><th className="text-left">Client</th><th className="text-left">Montant</th><th className="text-left">Échéance</th><th>Statut</th></tr></thead>
                <tbody>{invoices.map((inv:any)=> <tr key={inv.id} className="border-t"><td className="py-2 font-mono">{inv.number}</td><td>{inv.client}</td><td className="font-semibold">{inv.amount}€</td><td>{new Date(inv.dueDate).toLocaleDateString('fr-FR')}</td><td><span className={`text-xs px-2 py-1 rounded-full border ${inv.status==='overdue'?'bg-red-50 text-red-700 border-red-200': inv.status==='paid'?'bg-emerald-50 text-emerald-700 border-emerald-200':'bg-amber-50 text-amber-800 border-amber-200'}`}>{inv.status}</span></td></tr>)}
                {invoices.length===0 && <tr><td colSpan={5} className="py-6 text-center text-slate-500">Aucune facture — elle apparaîtra après connexion Stripe/facturation.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-4">
            <h3 className="font-bold">Automatisations actives</h3>
            <div className="mt-3 space-y-2">{auto.slice(0,4).map((a:any)=> <div key={a.id} className="flex items-center justify-between p-3 rounded-xl border bg-white"><div><div className="text-sm font-semibold">{a.name}</div><div className="text-xs text-slate-500">{a.trigger} → {a.action} • N{a.level}</div></div><span className={`w-2 h-2 rounded-full ${a.enabled?'bg-emerald-500':'bg-slate-300'}`}/></div>)}
              {auto.length===0 && <div className="text-sm text-slate-500">Aucune automatisation.</div>}
            </div>
            <Link href="/dashboard/automations" className="mt-3 block text-center text-sm font-semibold text-indigo-600 hover:underline">Gérer les automatisations →</Link>
          </div>

          <div className="card p-4">
            <h3 className="font-bold">Intégrations</h3>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {['Gmail','Outlook','Google Calendar','Google Drive','Stripe','OneDrive'].map(s=> <div key={s} className="border rounded-xl p-3 flex items-center justify-between bg-white"><span>{s}</span><span className="text-xs bg-slate-100 border px-2 py-1 rounded-full">Connecter</span></div>)}
            </div>
            <p className="text-xs text-slate-500 mt-2">OAuth, permissions minimales, déconnexion 1 clic.</p>
          </div>

          <div className="card p-4">
            <h3 className="font-bold">Journal d'audit (extrait)</h3>
            <ul className="mt-2 text-xs text-slate-600 space-y-1">
              <li>• 11/08 10:22 — Connexion réussie</li>
              <li>• 11/08 10:18 — Automatisation "Relance J+7" — simulation</li>
              <li>• 10/08 18:04 — Intégration Gmail connectée</li>
            </ul>
            <Link href="/dashboard/settings" className="text-xs text-indigo-600 hover:underline mt-2 inline-block">Voir l'historique complet</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
}
