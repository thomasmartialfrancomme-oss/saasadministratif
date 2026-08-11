import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { readDB, writeDB } from '@/lib/db';
import { v4 as uuid } from 'uuid';

export async function GET(req:NextRequest){
  const p=getUserFromRequest(req as any); if(!p) return NextResponse.json({error:'unauth'}, {status:401});
  const db=readDB(); return NextResponse.json({automations: db.automations.filter(a=>a.userId===p.id)});
}
export async function POST(req:NextRequest){
  const p=getUserFromRequest(req as any); if(!p) return NextResponse.json({error:'unauth'}, {status:401});
  const body=await req.json();
  const db=readDB();
  const item={ id:uuid(), userId:p.id, name:body.name||'Nouvelle automatisation', trigger:body.trigger||'Événement', action:body.action||'Action', level: (body.level||2) as 1|2|3, enabled:true, runs:0, simulation: !!body.simulation };
  db.automations.unshift(item); writeDB(db);
  return NextResponse.json({ok:true, automation:item});
}
