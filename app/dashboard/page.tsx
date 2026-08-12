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
  const totalInvoices = invoices.length;
  const overdue = invoices.filter((i:any)=>i.status==='overdue').length;
  const totalRuns = auto.reduce((s,a)=>s+(a.runs||0),0);
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
        <div className="card p-4"><div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Temps économisé ce mois-ci</div><div className="text-2xl font-extrabold mt-1">{totalRuns===0 ? '0h 00' : `${Math.floor(totalRuns*0.1)}h ${totalRuns%6*10}`}</div><div className="text-xs text-slate-500 mt-1">{totalRuns===0 ? 'Commencez à automatiser' : `${totalRuns} exécutions`}</div></div>
        <div className="card p-4"><div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Tâches automatisées</div><div className="text-2xl font-extrabold mt-1">{totalRuns}</div><div className="text-xs text-slate-500 mt-1">{totalRuns===0 ? '0 aujourd’hui' : `${auto.length} automatisations`}</div></div>
        <div className="card p-4"><div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Factures suivies</div><div className="text-2xl font-extrabold mt-1">{totalInvoices}</div><div className="text-xs text-amber-600 mt-1">{overdue>0 ? `${overdue} en retard` : 'Aucune en retard'}</div></div>
        <div className="card p-4"><div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Relances effectuées</div><div className="text-2xl font-extrabold mt-1">0</div><div className="text-xs text-slate-500 mt-1">0 en attente</div></div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-4">
            <div className="flex items-center justify-between"><h3 className="font-bold">Actions nécessitant votre validation</h3><span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">0</span></div>
            <div className="mt-3 text-sm text-slate-500 text-center py-6">Aucune action en attente — tout est à jour !</div>
          </div>

          <div className="card p-4">
            <h3 className="font-bold">Factures</h3>
            <div className="mt-3 overflow-x-auto">
              {totalInvoices===0 ? <div className="text-sm text-slate-500 text-center py-8">Aucune facture — créez votre première facture !</div> :
              <table className="w-full text-sm">
                <thead className="text-xs text-slate-500"><tr><th className="text-left py-2">Numéro</th><th className="text-left">Client</th><th className="text-left">Montant</th><th className="text-left">Échéance</th><th>Statut</th></tr></thead>
                <tbody>{invoices.map((inv:any)=> <tr key={inv.id} className="border-t"><td className="py-2 font-mono">{inv.number}</td><td>{inv.client}</td><td className="font-semibold">{inv.amount}€</td><td>{new Date(inv.dueDate).toLocaleDateString('fr-FR')}</td><td><span className={`text-xs px-2 py-1 rounded-full border ${inv.status==='overdue'?'bg-red-50 text-red-700 border-red-200': inv.status==='paid'?'bg-emerald-50 text-emerald-700 border-emerald-200':'bg-amber-50 text-amber-800 border-amber-200'}`}>{inv.status}</span></td></tr>)}</tbody>
              </table>}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-4">
            <h3 className="font-bold">Automatisations actives</h3>
            <div className="mt-3 space-y-2">{auto.length===0 ? <div className="text-sm text-slate-500 text-center py-4">Aucune automatisation — créez-en une !</div> : auto.slice(0,4).map((a:any)=> <div key={a.id} className="flex items-center justify-between p-3 rounded-xl border bg-white"><div><div className="text-sm font-semibold">{a.name}</div><div className="text-xs text-slate-500">{a.trigger} → {a.action} • N{a.level}</div></div><span className={`w-2 h-2 rounded-full ${a.enabled?'bg-emerald-500':'bg-slate-300'}`}/></div>)}</div>
            <Link href="/dashboard/automations" className="mt-3 block text-center text-sm font-semibold text-indigo-600 hover:underline">Gérer les automatisations →</Link>
          </div>

          <div className="card p-4">
            <h3 className="font-bold">Intégrations</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                {name:'Gmail', url:'/api/auth/callback/google?scope=https://www.googleapis.com/auth/gmail.readonly'},
                {name:'Outlook', url:'/api/auth/callback/google'},
                {name:'Google Calendar', url:'/api/auth/callback/google'},
                {name:'Google Drive', url:'/api/auth/callback/google'},
                {name:'Stripe', url:'/api/auth/callback/google'},
                {name:'OneDrive', url:'/api/auth/callback/google'},
              ].map(s=> <a key={s.name} href={s.url} className="border rounded-xl p-3 flex items-center justify-between bg-white hover:bg-indigo-50 transition"><span>{s.name}</span><span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">Connecter</span></a>)}
            </div>
            <p className="text-xs text-slate-500 mt-2">OAuth, permissions minimales, déconnexion 1 clic.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
}
