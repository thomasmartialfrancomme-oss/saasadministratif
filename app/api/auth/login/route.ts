import { NextRequest, NextResponse } from 'next/server';
import { readDB, addAudit } from '@/lib/db';
import { verifyPassword, signToken } from '@/lib/auth';

export async function POST(req:NextRequest){
  const ip=req.headers.get('x-forwarded-for')||'unknown';
  const { email, password } = await req.json();
  const db=readDB();
  const user=db.users.find(u=>u.email===String(email).toLowerCase());
  if(!user) return NextResponse.json({error:'Email ou mot de passe incorrect'}, {status:401});
  const ok=await verifyPassword(String(password), user.passwordHash);
  if(!ok) return NextResponse.json({error:'Email ou mot de passe incorrect'}, {status:401});
  addAudit(user.id,'login',`Connexion depuis ${ip}`);
  const token=signToken({id:user.id, email:user.email, name:user.name, plan:user.plan});
  const res=NextResponse.json({ok:true, plan:user.plan});
  res.cookies.set('autoadmin_token', token, {httpOnly:true, sameSite:'lax', secure:false, path:'/', maxAge:60*60*24*7});
  return res;
}
