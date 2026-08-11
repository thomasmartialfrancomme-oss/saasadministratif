"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
export default function Page(){
  const [list,setList]=useState<any[]>([]); const [sim,setSim]=useState(true);
  const load=()=> fetch('/api/automations').then(r=>r.json()).then(j=>setList(j.automations||[]));
  useEffect(()=>{load()},[]);
  async function add(){
    const name=prompt('Nom de l’automatisation ?','Nouvelle règle SI → ALORS');
    if(!name) return;
    const trigger=prompt('SI (événement)','Facture en retard')||'Événement';
    const action=prompt('ALORS (action)','Envoyer relance')||'Action';
    await fetch('/api/automations',{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name,trigger,action,level:2, simulation:sim})});
    load();
  }
  return <div className="min-h-screen bg-slate-50">
    <header className="bg-white border-b border-slate-200"><div className="max-w-6xl mx-auto px-4 h-[60px] flex items-center justify-between"><Link href="/dashboard" className="font-extrabold">← Dashboard</Link><span className="text-sm font-semibold">Centre d'automatisations</span></div></header>
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <h1 className="text-xl font-extrabold">Automatisations — SI événement ALORS action</h1>
        <div className="flex items-center gap-2"><label className="text-sm flex items-center gap-2"><input type="checkbox" checked={sim} onChange={e=>setSim(e.target.checked)}/> Mode SAFE (simulation)</label><button onClick={add} className="btn-primary !py-2">+ Nouvelle automatisation</button></div>
      </div>
      <div className="mt-4 p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-sm">Niveau 1: auto sans risque • Niveau 2: validation requise • Niveau 3: toujours manuel. Anti-boucle intégré. Journalisation complète.</div>
      <div className="mt-4 grid md:grid-cols-2 gap-4">
        {list.map(a=> <div key={a.id} className="card p-4">
          <div className="flex items-center justify-between"><span className="font-bold">{a.name}</span><span className={`text-xs px-2 py-1 rounded-full border ${a.level===1?'bg-emerald-50 text-emerald-700 border-emerald-200': a.level===2?'bg-amber-50 text-amber-800 border-amber-200':'bg-red-50 text-red-700 border-red-200'}`}>Niveau {a.level}</span></div>
          <div className="text-sm text-slate-600 mt-1">SI <b>{a.trigger}</b> ALORS <b>{a.action}</b></div>
          <div className="text-xs text-slate-500 mt-2">Exécutions: {a.runs} • {a.simulation?'Simulation':'Actif'} • {a.enabled?'Activé':'Désactivé'}</div>
          <div className="mt-3 flex gap-2"><button className="text-xs bg-white border px-3 py-1 rounded-full">Tester en simulation</button><button className="text-xs bg-slate-900 text-white px-3 py-1 rounded-full">Activer</button></div>
        </div>)}
      </div>
      <div className="mt-6 card p-4">
        <h3 className="font-bold">Modèles prêts à l'emploi</h3>
        <ul className="mt-2 text-sm text-slate-600 list-disc ml-5 space-y-1">
          <li>SI facture arrive à échéance ALORS envoyer rappel (N1)</li>
          <li>SI facture en retard ALORS créer tâche de relance + brouillon (N2)</li>
          <li>SI email demande un document ALORS rechercher dans Drive (N2)</li>
          <li>SI paiement reçu ALORS associer à la facture (N1)</li>
          <li>SI rendez-vous approche ALORS envoyer rappel (N1)</li>
        </ul>
      </div>
    </div>
  </div>
}
