import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

export type User = { id:string; email:string; passwordHash:string; name:string; company?:string; verified:boolean; createdAt:string; plan:'FREE'|'PRO'|'BUSINESS'; stripeCustomerId?:string; subscriptionStatus?:string; onboardingDone?:boolean }
export type Invoice = { id:string; userId:string; number:string; client:string; amount:number; status:'paid'|'pending'|'overdue'; dueDate:string; createdAt:string }
export type Automation = { id:string; userId:string; name:string; trigger:string; action:string; level:1|2|3; enabled:boolean; runs:number; lastRun?:string; simulation:boolean }
export type Audit = { id:string; userId:string; action:string; detail:string; at:string }

type DB = { users:User[]; invoices:Invoice[]; automations:Automation[]; audits:Audit[]; sessions:Record<string,string> }

function ensureDB():DB{
  if(!fs.existsSync(path.dirname(DB_PATH))) fs.mkdirSync(path.dirname(DB_PATH),{recursive:true});
  if(!fs.existsSync(DB_PATH)){
    const init:DB={users:[],invoices:[],automations:[],audits:[],sessions:{}};
    fs.writeFileSync(DB_PATH,JSON.stringify(init,null,2));
    return init;
  }
  return JSON.parse(fs.readFileSync(DB_PATH,'utf-8'));
}
export function readDB():DB{ return ensureDB(); }
export function writeDB(db:DB){ fs.writeFileSync(DB_PATH,JSON.stringify(db,null,2)); }

export function addAudit(userId:string, action:string, detail:string){
  const db=readDB(); db.audits.unshift({id:uuid(),userId,action,detail,at:new Date().toISOString()}); if(db.audits.length>500) db.audits.length=500; writeDB(db);
}
