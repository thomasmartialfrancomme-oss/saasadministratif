import { NextRequest, NextResponse } from 'next/server';
import { readDB, writeDB, addAudit } from '@/lib/db';
import { hashPassword, signToken } from '@/lib/auth';
import { v4 as uuid } from 'uuid';

export async function POST(req:NextRequest){
  try {
    const { email, password, name } = await req.json();
    if(!email || !password || !name) return NextResponse.json({error:'Champs requis'}, {status:400});
    if(password.length<8) return NextResponse.json({error:'Mot de passe trop court (8+)'}, {status:400});
    const db=readDB();
    if(db.users.find(u=>u.email.toLowerCase()===String(email).toLowerCase())) return NextResponse.json({error:'Email déjà utilisé'}, {status:409});
    const user={ id:uuid(), email:String(email).toLowerCase(), passwordHash: await hashPassword(String(password)), name:String(name), verified:false, createdAt:new Date().toISOString(), plan:'FREE' as const, subscriptionStatus:'active' };
    db.users.push(user);
    writeDB(db);
    addAudit(user.id,'register','Création compte');
    const token=signToken({id:user.id, email:user.email, name:user.name, plan:user.plan});
    const res=NextResponse.json({ok:true});
    res.cookies.set('autoadmin_token', token, {httpOnly:true, sameSite:'lax', secure:false, path:'/', maxAge:60*60*24*7});
    return res;
  } catch(e:any) {
    console.error("REGISTER ERROR:", e);
    return NextResponse.json({error: e.message || String(e), stack: e.stack}, {status:500});
  }
}
