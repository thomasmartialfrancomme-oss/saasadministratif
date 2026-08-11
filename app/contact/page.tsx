"use client";
import Link from 'next/link';
export default function Page(){
  return <div className="min-h-screen bg-slate-50">
    <header className="bg-white border-b border-slate-200"><div className="max-w-3xl mx-auto px-4 h-[60px] flex items-center justify-between"><Link href="/" className="font-extrabold">← Accueil</Link><span className="font-bold">Contact & Support</span></div></header>
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="card p-6">
        <h1 className="text-xl font-extrabold">Nous contacter</h1>
        <form onSubmit={(e)=>{e.preventDefault(); alert('Ticket créé (démo) — email support@autoadmin.example')}} className="mt-4 space-y-3">
          <input placeholder="Votre email" required className="w-full border rounded-xl px-4 py-3"/>
          <input placeholder="Sujet" required className="w-full border rounded-xl px-4 py-3"/>
          <textarea placeholder="Votre message" rows={4} required className="w-full border rounded-xl px-4 py-3"/>
          <button className="btn-primary">Envoyer</button>
        </form>
        <p className="text-xs text-slate-500 mt-3">Support : support@autoadmin.example (configurable). FAQ : <a href="/#faq" className="underline">voir la FAQ</a></p>
      </div>
    </div>
  </div>
}
