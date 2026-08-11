"use client";
import Link from 'next/link';
export default function Page(){
  return <div className="min-h-screen grid place-items-center bg-slate-50 p-4">
    <div className="w-full max-w-md card p-6">
      <Link href="/login" className="font-bold">← Retour</Link>
      <h1 className="text-xl font-extrabold mt-2">Mot de passe oublié</h1>
      <p className="text-sm text-slate-600 mt-1">Recevez un lien de réinitialisation (transactionnel).</p>
      <form onSubmit={(e)=>{e.preventDefault(); alert('Email de réinitialisation envoyé (démo) — configure EMAIL_API_KEY pour les vrais envois.')}} className="mt-4 space-y-3">
        <input type="email" placeholder="Votre email" required className="w-full border rounded-xl px-4 py-3"/>
        <button className="w-full btn-primary">Envoyer le lien</button>
      </form>
    </div>
  </div>
}
