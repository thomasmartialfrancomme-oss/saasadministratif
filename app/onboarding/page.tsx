"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const steps=[
  {title:'Nom de l’entreprise', key:'company', placeholder:'Ex: Studio Dupont'},
  {title:'Type d’activité', key:'activity', placeholder:'Freelance, agence, commerce...'},
  {title:'Nombre de personnes', key:'size', placeholder:'1, 2-5, 5-10...'},
  {title:'Objectifs principaux', key:'goals', placeholder:'Factures, relances, emails...'},
  {title:'Services à connecter', key:'services', placeholder:'Gmail, Drive, Stripe...'},
  {title:'Choix du forfait', key:'plan', placeholder:'FREE / PRO / BUSINESS'},
]
export default function Page(){
  const [idx,setIdx]=useState(0); const [vals,setVals]=useState<Record<string,string>>({}); const router=useRouter();
  const cur=steps[idx];
  return <div className="min-h-screen grid place-items-center bg-slate-50 p-4">
    <div className="w-full max-w-xl card p-6 sm:p-8">
      <div className="text-xs font-bold tracking-widest text-indigo-600">ONBOARDING — ÉTAPE {idx+1} / {steps.length+1}</div>
      <div className="w-full bg-slate-100 rounded-full h-2 mt-2"><div className="bg-indigo-600 h-2 rounded-full transition-all" style={{width: `${((idx+1)/(steps.length+1))*100}%`}}/></div>
      {idx < steps.length ? <>
        <h1 className="text-2xl font-extrabold mt-4">{cur.title}</h1>
        <input autoFocus value={vals[cur.key]||''} onChange={e=>setVals({...vals,[cur.key]:e.target.value})} placeholder={cur.placeholder} className="mt-4 w-full border border-slate-200 rounded-xl px-4 py-3"/>
        {cur.key==='plan' && <div className="mt-3 grid grid-cols-3 gap-2 text-sm">{['FREE','PRO','BUSINESS'].map(p=> <button key={p} onClick={()=>setVals({...vals,plan:p})} className={`border rounded-xl py-3 font-bold ${vals.plan===p?'bg-indigo-600 text-white border-indigo-600':'bg-white border-slate-200'}`}>{p}</button>)}</div>}
        <div className="mt-6 flex justify-between">
          <button disabled={idx===0} onClick={()=>setIdx(idx-1)} className="px-4 py-2 rounded-xl border border-slate-200 bg-white disabled:opacity-50">Retour</button>
          <button onClick={()=>setIdx(idx+1)} className="btn-primary">Continuer →</button>
        </div>
      </> : <>
        <h1 className="text-2xl font-extrabold mt-4">Votre espace AutoAdmin est prêt. 🎉</h1>
        <p className="text-sm text-slate-600 mt-2">Nous avons configuré votre tableau de bord, vos automatisations de départ et le mode SAFE.</p>
        <div className="mt-4 bg-slate-50 border rounded-xl p-4 text-sm space-y-1">
          {Object.entries(vals).map(([k,v])=> <div key={k} className="flex justify-between"><span className="text-slate-500">{k}</span><span className="font-semibold">{v||'—'}</span></div>)}
        </div>
        <Link href="/dashboard" className="mt-6 block text-center btn-primary">Aller au tableau de bord →</Link>
      </>}
    </div>
  </div>
}
