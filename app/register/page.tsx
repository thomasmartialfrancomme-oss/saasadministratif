import Link from 'next/link';
import { RegisterForm } from '@/components/AuthForms';
export default function Page(){
  return <div className="w-full max-w-md card p-6 sm:p-8">
    <Link href="/" className="font-extrabold">← AutoAdmin</Link>
    <h1 className="text-2xl font-extrabold mt-2">Créer votre compte</h1>
    <p className="text-sm text-slate-600 mt-1">Gratuit, sans carte bancaire. 2 minutes.</p>
    <div className="mt-6"><RegisterForm/></div>
    <div className="mt-4 text-center text-sm"><Link href="/login" className="text-indigo-600 hover:underline">Déjà un compte ? Se connecter</Link></div>
    <div className="mt-4 p-3 rounded-xl bg-slate-50 border text-xs text-slate-500">Auth Google : à activer en configurant GOOGLE_CLIENT_ID/SECRET dans l'environnement (voir .env.example). Le bouton apparaîtra automatiquement.</div>
  </div>
}
