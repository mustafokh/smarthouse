# smart.house777 — Smart uy katalogi

Professional multi-page product catalog for **smart.house777** (Uzbek smart home / IoT / security).

Built with **Next.js 16**, TypeScript, Tailwind CSS v4. Product data from *Pricelist 4.pdf* (24 products). UX aligned with the Telegram bot design PDF (catalog → product → cart → checkout, brand colors `#0C1F44` / `#2FB6D9`).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Telegram buyurtmalar (Vercel)

Checkout paytida buyurtma Telegramga yuboriladi. Bot orqali sotuv nazorati:

- `/statistika` — umumiy sotuv
- `/oylik` — oylik hisobot (`/oylik 2026-09`)
- `/buyurtmalar` — so‘nggi buyurtmalar
- `/kirim` / `/chiqim 50 izoh` / `/chiqimlar` / `/balans`
- `/mahsulotlar` — eng ko‘p sotilganlar

Lokal / Vercel Environment Variables:

```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
TELEGRAM_SETUP_SECRET=smarthouse777
NEXT_PUBLIC_SITE_URL=https://smarthouse777.uz
```

Deploydan keyin webhookni bir marta ulang:

`https://smarthouse777.uz/api/telegram/setup?secret=smarthouse777`

Ixtiyoriy (Vercelda ma’lumot barqaror saqlansin): Upstash Redis `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`.

API: `POST /api/telegram/order` · `POST /api/telegram/webhook`

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing / hero |
| `/katalog` | Full catalog, search & filters |
| `/kategoriya/[slug]` | Category pages |
| `/mahsulot/[slug]` | Product detail |
| `/savat` | Cart |
| `/buyurtma` | Checkout / order form |
| `/buyurtmalar` | My orders (localStorage) |
| `/sevimlilar` | Wishlist |
| `/haqida` | About |
| `/aloqa` | Consultation form |
| `/qollab-quvvatlash` | Support |
| `/savol-javob` | FAQ |
| `/yetkazib-berish` | Delivery & payment |

## Data

- `src/data/products.ts` — all 24 pricelist products + categories
- Cart, wishlist, orders, inquiries → `localStorage` (local MVP)

## Brand

- Navy `#0C1F44`, cyan `#2FB6D9`
- Fonts: Outfit (display) + Manrope (body)
- UI language: Uzbek
