import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AutoAdmin — Votre administratif. Automatisé.',
  description: 'Connectez vos outils professionnels et laissez AutoAdmin gérer les tâches répétitives. Factures, relances, emails, documents, rendez-vous.',
  openGraph: { title: 'AutoAdmin', description: 'Automatisez votre administratif et récupérez votre temps.', type: 'website' },
  icons: { icon: '/favicon.ico' }
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="fr"><body className="text-slate-900 antialiased bg-slate-50">{children}</body></html>
}
