import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const SECRET = process.env.AUTH_SECRET || 'dev-secret-change-me-please-32-chars-long!!';

export async function hashPassword(pw:string){ return bcrypt.hash(pw,10); }
export async function verifyPassword(pw:string, hash:string){ return bcrypt.compare(pw,hash); }
export function signToken(payload:any){ return jwt.sign(payload, SECRET, {expiresIn:'7d'}); }
export function verifyToken(token:string){ try{return jwt.verify(token, SECRET) as any}catch{return null} }
export function getUserFromRequest(req:Request){
  const cookie = (req.headers.get('cookie')||'');
  const m = cookie.match(/autoadmin_token=([^;]+)/);
  if(!m) return null;
  return verifyToken(decodeURIComponent(m[1]));
}
