# Developing Baseball Website

A modern, data-driven website for Developing Baseball, showcasing Stuff+ Analyzer, Team Portal, and player analytics tools.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Hero**: Bold headline with "Develop the Game" campaign
- **Services**: Stuff+ Analyzer, Team Portal, Player Analytics
- **About**: Company mission and values
- **Instagram**: Links to @developingbaseball throughout
- **Contact**: Social-focused contact section

## Design

- **Typography**: Bebas Neue (display) + DM Sans (body)
- **Colors**: Cream (#F5F0E8), Forest (#0D2818), Accent (#0a7ea4), Grass (#1B4D3E)
- **Pattern**: Subtle diamond background inspired by baseball field

## Stripe Setup

1. Create a [Stripe account](https://dashboard.stripe.com) (use test mode for development).

2. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

3. Add your Stripe keys from [Dashboard → API Keys](https://dashboard.stripe.com/apikeys):
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

4. Create products in [Dashboard → Products](https://dashboard.stripe.com/products):
   - Add products (e.g., "Stuff+ Analyzer Pro" with monthly/yearly prices)
   - Copy each **Price ID** (starts with `price_`)

5. Update `src/lib/products.ts` with your Price IDs, or set them in `.env.local`.

6. **Webhook** (for payment events): Create a webhook at [Dashboard → Webhooks](https://dashboard.stripe.com/webhooks):
   - Endpoint URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.*`, `invoice.paid`, `invoice.payment_failed`
   - Copy the **Signing secret** to `STRIPE_WEBHOOK_SECRET`

7. For production, set `NEXT_PUBLIC_BASE_URL` to your live domain.

## Contact Form (Resend)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Add to `.env.local`: `RESEND_API_KEY=re_xxxxx`
4. Contact form submissions are sent to `alex.rimerman@gmail.com`

## Deployment

```bash
npm run build
npm start
```

Deploy to Vercel, Netlify, or any Node.js host. Add your Stripe env vars to the hosting platform.
