import Link from 'next/link';
import { LoginForm } from '@/components/AuthForms';
export default function Page(){
  return <div className="w-full max-w-md card p-6 sm:p-8">
    <Link href="/" className="font-extrabold">← AutoAdmin</Link>
    <h1 className="text-2xl font-extrabold mt-2">Connexion</h1>
    <p className="text-sm text-slate-600 mt-1">Accédez à votre espace AutoAdmin.</p>
    <div className="mt-6"><LoginForm/></div>
  </div>
}
