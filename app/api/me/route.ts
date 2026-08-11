import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { readDB } from '@/lib/db';
export async function GET(req:NextRequest){
  const payload=getUserFromRequest(req as any);
  if(!payload) return NextResponse.json({user:null}, {status:401});
  const db=readDB();
  const user=db.users.find(u=>u.id===payload.id);
  if(!user) return NextResponse.json({user:null}, {status:401});
  return NextResponse.json({user:{id:user.id, email:user.email, name:user.name, plan:user.plan, company:user.company}});
}
