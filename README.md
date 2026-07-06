# Village — Landing Page

**It takes a village. Find yours.**

Pre-launch landing page for Village, the community app for single parents (Phase 0 of the build spec). Collects launch notifications by **email or phone** with an optional zip code — the zip data doubles as the metro density map for picking launch neighborhoods.

## Stack

- Next.js 14 (App Router) · React 18
- Tailwind CSS + shadcn/ui-style components (button, input, dialog, tabs, badge, card)
- Supabase (Postgres) for signup storage via REST — no client SDK needed
- Deploys to Vercel

## What's on the page

- Hero with app render — a Discover profile of a verified single mom with her kid
- Launch-notification popup (auto-opens after 6s, or via any CTA): email **or** text, plus optional zip
- Feature sections: Discover, Meetups, Marketplace
- Safety section highlighting: verification + background check **before you can see any profiles**, required profile photos, screenshot & screen-recording ban, kids' privacy by design, background-checked sitters, strict no-dating policy

## Run locally

```bash
npm install
npm run dev
```

Without Supabase env vars, signups are logged to the console so the UI works end-to-end in dev.

## Connect Supabase

1. Create a Supabase project → SQL editor → run `supabase/schema.sql`
2. Copy `.env.example` to `.env.local` and fill in `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (Settings → API)

Signups land in `launch_notifications`; check `signup_density` for zip-level counts.

## Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/village-landing.git
git push -u origin main
```

Then import the repo on [vercel.com/new](https://vercel.com/new), add the two env vars, and deploy.

## Notes

- The mom + kid profile image is an original SVG illustration (`components/mom-kid-illustration.jsx`). Swap in a licensed photo before launch if preferred — never use real member photos without consent.
- The screenshot/recording ban is enforced in the mobile app itself (e.g. `expo-screen-capture`); the landing page advertises the policy.
