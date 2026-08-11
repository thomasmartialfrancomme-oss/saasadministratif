import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { readDB } from '@/lib/db';
export async function GET(req:NextRequest){
  const p=getUserFromRequest(req as any); if(!p) return NextResponse.json({error:'unauth'}, {status:401});
  const db=readDB(); return NextResponse.json({invoices: db.invoices.filter(i=>i.userId===p.id)});
}
