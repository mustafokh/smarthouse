# smart.house777 — Smart uy katalogi

Professional multi-page product catalog for **smart.house777** (Uzbek smart home / IoT / security).

Built with **Next.js 16**, TypeScript, Tailwind CSS v4. Product data from *Pricelist 4.pdf* (24 products). UX aligned with the Telegram bot design PDF (catalog → product → cart → checkout, brand colors `#0C1F44` / `#2FB6D9`).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

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
