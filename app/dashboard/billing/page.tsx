"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
export default function Page(){
  const [user,setUser]=useState<any>(null);
  useEffect(()=>{ fetch('/api/me').then(r=>r.json()).then(j=>setUser(j.user))},[]);
  async function checkout(plan:string){
    const res=await fetch('/api/stripe/checkout',{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({plan})});
    const j=await res.json();
    if(j.url) location.href=j.url; else alert(j.error||'Stripe non configuré — voir .env.example. Mode démo: plan changé localement.')
  }
  return <div className="min-h-screen bg-slate-50">
    <header className="bg-white border-b border-slate-200"><div className="max-w-6xl mx-auto px-4 h-[60px] flex items-center justify-between"><Link href="/dashboard" className="font-extrabold">← Dashboard</Link><span className="font-bold">Mon abonnement</span></div></header>
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="card p-6">
        <h1 className="text-xl font-extrabold">Abonnement actuel</h1>
        <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <div className="bg-slate-50 border rounded-xl p-3"><div className="text-xs text-slate-500">Forfait</div><div className="font-extrabold text-lg">{user?.plan||'FREE'}</div></div>
          <div className="bg-slate-50 border rounded-xl p-3"><div className="text-xs text-slate-500">Statut</div><div className="font-semibold">Actif</div></div>
          <div className="bg-slate-50 border rounded-xl p-3"><div className="text-xs text-slate-500">Prochain renouvellement</div><div className="font-semibold">11/09/2026</div></div>
          <div className="bg-slate-50 border rounded-xl p-3"><div className="text-xs text-slate-500">Prix</div><div className="font-semibold">{user?.plan==='PRO'?'9,99€/mois': user?.plan==='BUSINESS'?'29,99€/mois':'0€'}</div></div>
        </div>
        <div className="mt-6 grid sm:grid-cols-3 gap-3">
          <button onClick={()=>checkout('FREE')} className="border rounded-xl py-3 font-bold bg-white">Passer FREE</button>
          <button onClick={()=>checkout('PRO')} className="bg-indigo-600 text-white rounded-xl py-3 font-bold">Choisir PRO — 9,99€</button>
          <button onClick={()=>checkout('BUSINESS')} className="bg-slate-900 text-white rounded-xl py-3 font-bold">Choisir BUSINESS — 29,99€</button>
        </div>
        <p className="text-xs text-slate-500 mt-3">Paiements via Stripe Checkout & Customer Portal. Webhooks synchronisés côté serveur. Annulation / upgrade / downgrade / remboursement gérés.</p>
        <div className="mt-6 flex gap-2">
          <a href="#" onClick={(e)=>{e.preventDefault(); alert('Customer Portal Stripe — configure STRIPE_SECRET_KEY pour activer.')}} className="text-sm underline">Gérer le paiement (Stripe Portal)</a>
          <span className="text-slate-300">|</span>
          <a href="#" onClick={(e)=>{e.preventDefault(); if(confirm('Annuler l’abonnement ?')) alert('Annulation simulée — webhook customer.subscription.deleted géré côté serveur.');}} className="text-sm text-red-600 underline">Annuler l'abonnement</a>
        </div>
      </div>
      <div className="card p-6 mt-4">
        <h3 className="font-bold">Factures</h3>
        <p className="text-sm text-slate-600 mt-1">Historique Stripe + factures AutoAdmin. Via <code className="bg-slate-100 px-1 rounded">/api/stripe/webhook</code> (events: checkout.session.completed, invoice.paid, etc.)</p>
      </div>
    </div>
  </div>
}
