"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function RegisterForm(){
  const r = useRouter(); const [loading,setLoading]=useState(false); const [err,setErr]=useState('');
  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault(); setErr(''); setLoading(true);
    const fd=new FormData(e.currentTarget);
    const res=await fetch('/api/auth/register',{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email:fd.get('email'), password:fd.get('password'), name:fd.get('name')})});
    const j=await res.json(); setLoading(false);
    if(!res.ok) setErr(j.error||'Erreur'); else r.push('/onboarding');
  }
  return <form onSubmit={submit} className="space-y-3">
    <input name="name" placeholder="Nom complet" required className="w-full border border-slate-200 rounded-xl px-4 py-3"/>
    <input name="email" type="email" placeholder="Email professionnel" required className="w-full border border-slate-200 rounded-xl px-4 py-3"/>
    <input name="password" type="password" placeholder="Mot de passe (8+ caractères)" required minLength={8} className="w-full border border-slate-200 rounded-xl px-4 py-3"/>
    {err && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">{err}</div>}
    <button disabled={loading} className="w-full btn-primary">{loading?'Création...':'Créer mon compte →'}</button>
    <p className="text-xs text-slate-500 text-center">En créant un compte vous acceptez les <a href="/legal/cgu" className="underline">CGU</a> et la <a href="/legal/confidentialite" className="underline">politique de confidentialité</a>.</p>
  </form>
}
export function LoginForm(){
  const r=useRouter(); const [loading,setLoading]=useState(false); const [err,setErr]=useState('');
  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault(); setErr(''); setLoading(true);
    const fd=new FormData(e.currentTarget);
    const res=await fetch('/api/auth/login',{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email:fd.get('email'), password:fd.get('password')})});
    const j=await res.json(); setLoading(false);
    if(!res.ok) setErr(j.error||'Erreur'); else r.push('/dashboard');
  }
  return <form onSubmit={submit} className="space-y-3">
    <input name="email" type="email" placeholder="Email" required className="w-full border border-slate-200 rounded-xl px-4 py-3"/>
    <input name="password" type="password" placeholder="Mot de passe" required className="w-full border border-slate-200 rounded-xl px-4 py-3"/>
    {err && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">{err}</div>}
    <button disabled={loading} className="w-full btn-primary">{loading?'Connexion...':'Se connecter'}</button>
    <div className="flex justify-between text-sm"><a href="/forgot" className="text-indigo-600 hover:underline">Mot de passe oublié ?</a><a href="/register" className="text-slate-600 hover:underline">Créer un compte</a></div>
  </form>
}
