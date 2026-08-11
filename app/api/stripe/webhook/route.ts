import { NextRequest, NextResponse } from 'next/server';
import { readDB, writeDB, addAudit } from '@/lib/db';
export async function POST(req:NextRequest){
  const sig=req.headers.get('stripe-signature')||'';
  const raw=await req.text();
  let event:any=null;
  const secret=process.env.STRIPE_WEBHOOK_SECRET;
  if(secret){
    try{
      const Stripe=(await import('stripe')).default;
      const stripe=new Stripe(process.env.STRIPE_SECRET_KEY!);
      event=stripe.webhooks.constructEvent(raw, sig, secret);
    }catch(e:any){ return NextResponse.json({error:'Invalid signature '+e.message}, {status:400}); }
  } else {
    try{ event=JSON.parse(raw);}catch{ event={type:'demo', data:{object:{}}} }
  }
  // Synchronisation abonnement
  const type=event.type;
  const obj=event.data?.object||{};
  const email=obj.customer_email||obj.customer_details?.email;
  if(email){
    const db=readDB(); const u=db.users.find(x=>x.email===String(email).toLowerCase());
    if(u){
      if(type==='checkout.session.completed') u.subscriptionStatus='active';
      if(type==='customer.subscription.updated') u.subscriptionStatus=obj.status||u.subscriptionStatus;
      if(type==='customer.subscription.deleted') { u.plan='FREE'; u.subscriptionStatus='canceled'; }
      if(type==='invoice.paid') u.subscriptionStatus='active';
      if(type==='invoice.payment_failed') u.subscriptionStatus='past_due';
      writeDB(db); addAudit(u.id,'stripe_webhook',`Event ${type}`);
    }
  }
  return NextResponse.json({received:true, type});
}
