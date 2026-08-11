// FIX VERCEL 2 - 11/08/2026
import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';

const DB_PATH = path.join('/tmp', 'data', 'db.json');

export type User = { id:string; email:string; passwordHash:string; name:string; company?:string; verified:boolean; createdAt:string; plan:'FREE'|'PRO'|'BUSINESS'; stripeCustomerId?:string; subscriptionStatus?:string; onboardingDone?:boolean }
export type Invoice = { id:string; userId:string; number:string; client:string; amount:number; status:'paid'|'pending'|'overdue'; dueDate:string; createdAt:string }
export type Automation = { id:string; userId:string; name:string; trigger:string; action:string; level:1|2|3; enabled:boolean; runs:number; lastRun?:string; simulation:boolean }
export type Audit = { id:string; userId:string; action:string; detail:string; at:string }

type DB = { users:User[]; invoices:Invoice[]; automations:Automation[]; audits:Audit[]; sessions:Record<string,string> }

let memoryDB: DB | null = null;

function ensureDB():DB{
  if (memoryDB) return memoryDB;
  try {
    if(!fs.existsSync(path.dirname(DB_PATH))) fs.mkdirSync(path.dirname(DB_PATH),{recursive:true});
    if(!fs.existsSync(DB_PATH)){
      const init:DB={users:[],invoices:[],automations:[],audits:[],sessions:{}};
      fs.writeFileSync(DB_PATH,JSON.stringify(init,null,2));
      memoryDB = init;
      return init;
    }
    const data = JSON.parse(fs.readFileSync(DB_PATH,'utf-8'));
    memoryDB = data;
    return data;
  } catch(e) {
    console.error("DB ERROR:", e);
    if (!memoryDB) memoryDB = {users:[],invoices:[],automations:[],audits:[],sessions:{}};
    return memoryDB;
  }
}
export function readDB():DB{ return ensureDB(); }
export function writeDB(db:DB){ 
  memoryDB = db;
  try { fs.writeFileSync(DB_PATH,JSON.stringify(db,null,2)); } catch(e){ console.error("WRITE ERROR", e); }
}

export function addAudit(userId:string, action:string, detail:string){
  try { const db=readDB(); db.audits.unshift({id:uuid(),userId,action,detail,at:new Date().toISOString()}); if(db.audits.length>500) db.audits.length=500; writeDB(db);} catch(e){console.error(e)}
}
