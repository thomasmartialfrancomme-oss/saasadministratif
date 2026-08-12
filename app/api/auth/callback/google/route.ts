import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');
  if (error) return NextResponse.redirect(new URL('/dashboard/settings?auth=error', req.url));
  if (!code) return NextResponse.redirect(new URL('/dashboard/settings?auth=no_code', req.url));
  try {
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: 'https://saasadministratif.vercel.app/api/auth/callback/google',
        grant_type: 'authorization_code',
      }),
    });
    const tokenData = await res.json();
    // Ici tu pourrais stocker access_token / refresh_token dans la DB
    // Pour l'instant on redirige vers le dashboard avec succès
    return NextResponse.redirect(new URL('/dashboard/settings?auth=ok', req.url));
  } catch (e: any) {
    return NextResponse.redirect(new URL('/dashboard/settings?auth=fail', req.url));
  }
}
