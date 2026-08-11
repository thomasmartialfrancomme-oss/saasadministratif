import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
export async function POST(req:NextRequest){
  const p=getUserFromRequest(req as any); if(!p) return NextResponse.json({error:'Non authentifié'}, {status:401});
  const { plan } = await req.json();
  const secret=process.env.STRIPE_SECRET_KEY;
  const priceMap:Record<string,string|undefined>={ PRO: process.env.STRIPE_PRICE_PRO, BUSINESS: process.env.STRIPE_PRICE_BUSINESS };
  if(!secret || !priceMap[plan as string]){
    // Mode démo sans Stripe: on simule localement via changement de plan en DB
    const { readDB, writeDB } = await import('@/lib/db');
    const db=readDB(); const u=db.users.find(x=>x.id===p.id); if(u){ u.plan=(plan as any) || 'FREE'; writeDB(db); }
    return NextResponse.json({ok:true, demo:true, message:'Stripe non configuré — plan changé en local (démo). Configure STRIPE_SECRET_KEY + STRIPE_PRICE_* pour activer le vrai Checkout.'});
  }
  // Vrai Stripe Checkout — nécessite stripe package (optionnel)
  try{
    // @ts-ignore dynamic
    const Stripe = (await import('stripe')).default;
    const stripe=new Stripe(secret);
    const session=await stripe.checkout.sessions.create({
      mode:'subscription',
      customer_email: p.email,
      line_items:[{price: priceMap[plan as string]!, quantity:1}],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL||'http://localhost:3000'}/dashboard/billing?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL||'http://localhost:3000'}/dashboard/billing?canceled=1`,
    });
    return NextResponse.json({url: session.url});
  }catch(e:any){ return NextResponse.json({error:e.message}, {status:500}); }
}
