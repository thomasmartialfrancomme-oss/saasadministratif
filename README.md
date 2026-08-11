# AutoAdmin — SaaS complet (Next.js 14)

**Promesse:** "Automatisez votre administratif et récupérez votre temps."

## Démarrage local
```bash
npm install
cp .env.example .env.local # remplir les clés
npm run dev # http://localhost:3000
npm run build && npm start
```

## Fonctionnalités livrées
- Site marketing complet (hero, problèmes, fonctionnalités, tarifs FREE/PRO/BUSINESS, FAQ, CGU/confidentialité/cookies/mentions)
- Auth: inscription, connexion, logout, hash bcrypt, JWT HttpOnly, vérification, reset (transactionnel)
- Onboarding 7 étapes
- Dashboard: stats, factures, validations N1/N2/N3, audit
- Automatisations SI→ALORS + niveaux + mode SAFE + anti-boucle
- Intégrations OAuth-ready (Gmail, Outlook, Drive, Calendar, Stripe)
- IA: hook API via AI_API_KEY (jamais exposée frontend)
- Stripe Billing: Checkout + Customer Portal + webhooks (checkout.session.completed, subscription.*, invoice.*) — synchronisation serveur
- Emails transactionnels (hook EMAIL_API_KEY)
- Sécurité: HTTPS, bcrypt, HttpOnly, headers, rate-limit, validation zod
- RGPD: export, suppression, consentement
- Admin, audit logs, sitemap/robots/SEO

## Variables d'environnement — voir .env.example
- AUTH_SECRET (32+ chars), STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_PRO/BUSINESS, AI_API_KEY, EMAIL_API_KEY, GOOGLE_CLIENT_ID/SECRET

## Stripe (TEST d'abord)
1. Créer produits/prix sur dashboard.stripe.com (test mode)
2. Renseigner STRIPE_PRICE_PRO / BUSINESS
3. Webhook endpoint: https://votre-domaine/api/stripe/webhook + copier STRIPE_WEBHOOK_SECRET
4. Tester: paiement réussi/refusé, upgrade/downgrade, annulation — vérifier DB synchronisée

## Informations de versement du compte marchand
> ⚠️ Ne jamais mettre RIB/bancaire dans le code/Git/frontend.
> Renseignez vos coordonnées UNIQUEMENT dans le Dashboard Stripe > Paramètres > Payouts > Compte bancaire / RIB. Stripe demandera vérification d'identité — à faire vous-même.

## Déploiement (Vercel recommandé)
- Importer repo Git → Vercel → ajouter env vars → Deploy → ajouter domaine → HTTPS auto → configurer webhook Stripe avec URL prod
- Alternative: Railway/Fly.io + Postgres (DATABASE_URL)

## Domaine — ACTION REQUISE
Propositions (à vérifier avant achat): autoadmin.fr / autoadmin.io / getautoadmin.com / autoadmin.app — Ne pas acheter sans validation propriétaire.

## Checklist production
Voir rapport final dans cette conversation.

## Base de données
Actuelle: JSON file `data/db.json` pour démo. Schéma Postgres/Prisma fourni dans `prisma/schema.prisma` pour migration prod.

## Tests
- npm run build OK
- Tester manuellement: /register → /onboarding → /dashboard → /dashboard/automations → /dashboard/billing (checkout démo)

## Support
support@autoadmin.example (configurable)
