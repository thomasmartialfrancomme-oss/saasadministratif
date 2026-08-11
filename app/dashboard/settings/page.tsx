"use client";
import Link from 'next/link';
export default function Page(){
  return <div className="min-h-screen bg-slate-50">
    <header className="bg-white border-b border-slate-200"><div className="max-w-6xl mx-auto px-4 h-[60px] flex items-center justify-between"><Link href="/dashboard" className="font-extrabold">← Dashboard</Link><span className="font-bold">Paramètres</span></div></header>
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      <div className="card p-6">
        <h3 className="font-bold">Profil & organisation</h3>
        <div className="mt-3 grid sm:grid-cols-2 gap-3">
          <input placeholder="Nom" className="border rounded-xl px-4 py-3"/>
          <input placeholder="Entreprise" className="border rounded-xl px-4 py-3"/>
          <input placeholder="Email" className="border rounded-xl px-4 py-3 sm:col-span-2"/>
        </div>
        <button onClick={()=>alert('Profil sauvegardé (démo)')} className="mt-3 btn-primary !py-2">Sauvegarder</button>
      </div>
      <div className="card p-6">
        <h3 className="font-bold">Sécurité</h3>
        <ul className="text-sm text-slate-600 mt-2 list-disc ml-5">
          <li>Mot de passe hashé bcrypt, cookies HttpOnly, rate-limit</li>
          <li>Sessions, déconnexion partout, 2FA à venir</li>
        </ul>
        <div className="mt-3 flex gap-2">
          <a href="/forgot" className="text-sm underline">Réinitialiser le mot de passe</a>
          <button onClick={()=>{if(confirm('Supprimer définitivement votre compte ?')) alert('Suppression simulée — RGPD: effacement complet côté serveur.')}} className="text-sm text-red-600 underline">Supprimer mon compte</button>
          <button onClick={()=>alert('Export JSON envoyé par email (démo)')} className="text-sm underline">Exporter mes données</button>
        </div>
      </div>
      <div className="card p-6">
        <h3 className="font-bold">Intégrations & OAuth</h3>
        <p className="text-sm text-slate-600 mt-1">Gmail, Outlook, Drive, Calendar, Stripe — permissions minimales. Déconnexion 1 clic.</p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          {['Gmail','Outlook','Google Drive','Stripe'].map(s=> <div key={s} className="border rounded-xl p-3 flex justify-between bg-white"><span>{s}</span><button onClick={()=>alert(s+' déconnecté (démo)')} className="text-xs border px-2 py-1 rounded-full">Déconnecter</button></div>)}
        </div>
      </div>
      <div className="card p-6">
        <h3 className="font-bold">Journal d'audit</h3>
        <p className="text-xs text-slate-500">Connexions, abonnements, automatisations, intégrations — consultable et exportable.</p>
      </div>
    </div>
  </div>
}
