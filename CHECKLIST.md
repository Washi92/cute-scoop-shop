# Cute Scoop Shop — Replacement Checklist

Use this checklist to customize the site with your own branding and content before launch.

## Images to Replace
- [ ] **Hero banner** — Replace the generated hero image in `client/src/lib/data.ts` (`HERO_BANNER` constant) with your own lifestyle/product photo
- [ ] **Product images** — Replace each product's `image` URL in the `products` array in `data.ts`
- [ ] **Packing video product image** — Replace the `image` URL in `packingVideoProduct` in `data.ts`
- [ ] **Favicon** — Replace or add a favicon in `client/public/`

## Videos
- [ ] **Packing video promo section** — The homepage has a video placeholder area; add your actual TikTok embed or video file URL
- [ ] **TikTok/Instagram gallery** — Add your real social media video embeds

## Copy / Text
- [ ] **Brand name** — Currently "Cute Scoop Shop"; search and replace across all files
- [ ] **Product names & descriptions** — Edit the `products` array in `data.ts`
- [ ] **Product prices** — Update prices in the `products` array
- [ ] **FAQ answers** — Customize the `faqs` array in `data.ts`
- [ ] **Reviews** — Replace dummy reviews in the `reviews` array in `data.ts`
- [ ] **Announcement bar text** — Edit in `Header.tsx`
- [ ] **Contact email** — Currently `hello@cutescoopshop.com`; update in `Contact.tsx`, `Footer.tsx`, and policy pages

## Colors
- [ ] **Primary pink** — Edit `--primary` in `client/src/index.css` (currently hot coral pink)
- [ ] **Background blush** — Edit `--kawaii-blush` and gradient values in `index.css`
- [ ] **Accent colors** — Adjust lavender, mint, and cream tones in the CSS custom properties

## Policies
- [ ] **Privacy Policy** — Update the boilerplate in `client/src/pages/Policies.tsx`
- [ ] **Terms of Service** — Update in `Policies.tsx`
- [ ] **Return Policy** — Update in `Policies.tsx`
- [ ] **Shipping Policy** — Update in `Policies.tsx`

## Social Links
- [ ] **TikTok URL** — Update in `Footer.tsx` (currently `#`)
- [ ] **Instagram URL** — Update in `Footer.tsx` (currently `#`)

## Functional
- [ ] **Payment integration** — Add Stripe or your payment processor (upgrade to full-stack with `webdev_add_feature`)
- [ ] **Contact form submission** — Currently shows a toast; connect to a form service or backend
- [ ] **Newsletter signup** — Currently shows a toast; connect to Mailchimp or similar
- [ ] **Cart checkout** — Currently front-end only; needs payment backend

## SEO
- [ ] **Page titles** — Update the `<title>` tag in `client/index.html`
- [ ] **Meta descriptions** — Add meta description tags
- [ ] **OpenGraph tags** — Add OG image, title, description for social sharing
- [ ] **Structured data** — Add Product schema markup for search engines
