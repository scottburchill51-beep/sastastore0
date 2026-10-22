# SastaStore private store upgrade

## What was preserved
All original styling, media, product imagery, content and WhatsApp ordering. Added `/login`, `/register`, `/account`, `/admin`, the product API, a Next.js 16 proxy, and Supabase migration.

## Before using
1. Back up the existing repo. Create a new branch and NEVER deploy directly to production.
2. Create a Supabase project; run `supabase/schema.sql` in SQL editor. In Auth URL Configuration, set Site URL to your **preview** URL and set email-confirmation links with your configured app callback URL (`/auth/confirm`). Check the email template's `token_hash` and `type=signup` parameters. The built-in Supabase confirmation defaults may differ; set the template's URL to `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=signup`.
3. Add `.env.local` based on `.env.example` locally; put values into the preview environment in Vercel. Never commit secrets or a service-role key.
4. Run `supabase/seed-products.sql` in the Supabase SQL editor. It contains ALL 35 original products, prices, categories, image paths and SEO fields, ready to import. Review it before applying. Verify that the admin list and storefront contain all 35 products before testing newly added products.
5. Register your own customer account, verify it, find its UUID in Supabase Auth > Users, and insert UUID into `store_admins` using the SQL Editor. DO NOT grant admin through client metadata or email checks.
6. Local: `npm ci`, `npm run dev`; test registration, email verification, login, logout, expiry refresh, customer cannot see `/admin`, admin CRUD, and existing product links.
7. Preview on Vercel from branch, audit SEO implications: Option B makes the store private and pages no longer indexable. Verify all product listings are migrated before merging to main.

## Scope / limitations
The account panel is a secure logged-in landing page, not a full order/subscription system yet. WhatsApp checkout remains unchanged. Product images use existing file paths; uploads and automated payments are not included. Existing page redirects still require manual QA on the preview deployment. The SQL migration is intentionally not executed automatically. No production changes were made.
