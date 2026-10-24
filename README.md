# Calliope Editing

Website for Calliope Editing: Services & Pricing, FAQ, and an inquiry form that saves to Supabase and emails each new inquiry.

Built with Next.js 14, hosted on Vercel.

## Pages

| Page | File |
| --- | --- |
| Services & Pricing (home) | `app/page.js` (prices and descriptions are in the `SERVICES` list at the top) |
| FAQ | `app/faq/page.js` |
| Inquire | `app/inquire/page.js` and the form in `app/inquire/InquiryForm.js` |
| Header and footer | `components/Header.js`, `components/Footer.js` |
| Colors, fonts, layout | `app/globals.css` |

## Setup

### 1. Supabase
1. Create a new Supabase project (or use an existing one).
2. Open **SQL Editor → New query**, paste everything from `supabase/schema.sql`, and click **Run**.
3. Go to **Project Settings → API** and copy the **Project URL** and the **service_role** key.

New inquiries show up in **Table Editor → inquiries**.

### 2. Resend (email notifications)
1. Create an API key in Resend.
2. Until you verify a domain in Resend, emails are sent from `onboarding@resend.dev`, and Resend only delivers those to the email address your Resend account is signed up with. Set `INQUIRY_TO_EMAIL` to that address.
3. Once a domain is verified, add `INQUIRY_FROM_EMAIL` (for example `Calliope Editing <inquiries@yourdomain.com>`) and you can send to any address.

Hitting **Reply** on an inquiry email replies straight to the author.

### 3. Vercel
1. Import this GitHub repo into Vercel.
2. Under **Settings → Environment Variables**, add:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `INQUIRY_TO_EMAIL`
3. Redeploy so the variables take effect.

Keep the service_role key secret: it only goes in Vercel, never in the code.
