// Design: Harajuku Confectionery — Neo-Decora Pop
// All product data, FAQ content, reviews, and site configuration

export const HERO_BANNER = "https://private-us-east-1.manuscdn.com/sessionFile/zNW32IT4w1fhEkcWB8Mq7r/sandbox/sSr2pL0Hcr3emBbtDE76aL-img-1_1770842264000_na1fn_aGVyby1iYW5uZXI.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvek5XMzJJVDR3MWZoRWtjV0I4TXE3ci9zYW5kYm94L3NTcjJwTDBIY3IzZW1CYnRERTc2YUwtaW1nLTFfMTc3MDg0MjI2NDAwMF9uYTFmbl9hR1Z5YnkxaVlXNXVaWEkucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=cnca3~jJ51LK5QPH9NEP7hmhumVs7bW9GgRiktvrn-lovrYad56aLb-F11WpJ2bwdLzKuJjLzk00x-jSVM7rqhxT5IZZnr4jA8AehpByVVidrQJEfrr3N99atLW0b2VgkNb095M-h-159gVj5RkEhBznTwZ7sUsEPUJ0wfTRIxppVOJaDr~Yt48eW1KP03RRhBVapasB9poyev8wCB-TtifqWXGSFYlP~utvtEshF~x0LzH6iSK38E0Ksmd3MyU6GzBhCUrH2QdMGNpV2kWAbyUUKTlAvNjexSR4YgN1Qt~G4AneGYYxDtJHJ1d6LcIq4Z2XqbqkbXhiAIN4jIX9Bw__";

export interface Product {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  image: string;
  badge?: "New" | "Best Seller" | "Limited" | "Popular";
  hook: string;
  description: string;
  theme: "kawaii" | "pastel" | "character";
  color: string;
  inStock: boolean;
  stockCount?: number;
  hasVideoOption: boolean;
  variants?: { name: string; price: number }[];
  whatYouMightGet: string[];
}

export const products: Product[] = [
  {
    id: "mystery-scoop-classic",
    name: "Mystery Scoops",
    price: 37.00,
    image: "https://private-us-east-1.manuscdn.com/sessionFile/zNW32IT4w1fhEkcWB8Mq7r/sandbox/sSr2pL0Hcr3emBbtDE76aL-img-2_1770842258000_na1fn_cHJvZHVjdC1teXN0ZXJ5LXNjb29w.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvek5XMzJJVDR3MWZoRWtjV0I4TXE3ci9zYW5kYm94L3NTcjJwTDBIY3IzZW1CYnRERTc2YUwtaW1nLTJfMTc3MDg0MjI1ODAwMF9uYTFmbl9jSEp2WkhWamRDMXRlWE4wWlhKNUxYTmpiMjl3LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=rHzmtw5F9E2pHdL9YoC3MoBMK~f~ww3X4ysnrWyQYBaLKOpebUFpU~M4OK5vHV2iAHGKW5St~gZJmTqfI4kzS-vNWp2YRaDHshEUksIZxNCX0AorDTGrCgvxCe4RyNeLUh92i8bd~3xmeqWovY34G~DSGUaCX9n2rv4n3Ez7QmteKtvj7PVrNFjM6k-I8Cu6MdMteu2zjJXgxlkcajlaahCxEyv3F-tpfFL26Dw3zhvZgy4CIiuzk2U6Rhk5rOFPp9Ni4W0~7Rixp6pZ7N7h4sHjw6CvjIss1EXhyPrm-erHMbvROZtYoQsD~JyY7~cZ8V87LCknWgVps5dNys9cuw__",
    badge: "Best Seller",
    hook: "A surprise scoop of kawaii goodies packed with love!",
    description: "Our signature mystery scoop is packed with 8-12 adorable kawaii stationery items, cute trinkets, and surprise goodies. Each scoop is uniquely curated — no two are the same!",
    theme: "kawaii",
    color: "pink",
    inStock: true,
    stockCount: 24,
    hasVideoOption: true,
    variants: [
      { name: "Single Scoop", price: 37.00 },
      { name: "Double Scoop", price: 65.00 },
      { name: "Triple Scoop", price: 89.00 },
    ],
    whatYouMightGet: [
      "Kawaii gel pens with character toppers",
      "Cute animal-shaped erasers",
      "Mini notebooks with adorable prints",
      "Sparkly sticker sheets",
      "Washi tape rolls",
      "Plush keychains",
      "Hair clips & accessories",
      "Candy-shaped trinkets",
    ],
  },
  {
    id: "pastel-scoop",
    name: "Pastel Scoop",
    price: 42.00,
    image: "https://private-us-east-1.manuscdn.com/sessionFile/zNW32IT4w1fhEkcWB8Mq7r/sandbox/sSr2pL0Hcr3emBbtDE76aL-img-3_1770842256000_na1fn_cHJvZHVjdC1wYXN0ZWwtc2Nvb3A.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvek5XMzJJVDR3MWZoRWtjV0I4TXE3ci9zYW5kYm94L3NTcjJwTDBIY3IzZW1CYnRERTc2YUwtaW1nLTNfMTc3MDg0MjI1NjAwMF9uYTFmbl9jSEp2WkhWamRDMXdZWE4wWld3dGMyTnZiM0EucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=nrTZfvcXWIZQnMwAslL5odwJZ1DeHXwgKgD0pD~v7v1G6-1iWUrokXCOR68YF-GIcZX8C9LFJX6RzUkWLPG-v3BwOsGxm5x7SYM-OEsquggMPiDZDgiOVoytfbvH2-adH5-giy2pDjK8sP373aFh-gpgO7twHTBg0VJb4AWG6XcDVmBL9-nLyNVGTFKRkCU~OyuRDwgt32HMHTKdyeItmOIxiaMNTyv75IwWVzLG57NTA8Is9DA-SCHNRpODnv2pjxHqb8YFQ2NPUbuiE~-zgQp36zAbKiAnEJaitQVZfL7EdMH1Payj6-MNRY9j-lE7palzF4D0m9o4ArC3m99biA__",
    badge: "New",
    hook: "Dreamy pastels for the soft aesthetic lover",
    description: "A curated collection of pastel-themed stationery and accessories. Everything in soft lavender, mint, and cream tones for the ultimate dreamy aesthetic.",
    theme: "pastel",
    color: "lavender",
    inStock: true,
    stockCount: 18,
    hasVideoOption: true,
    variants: [
      { name: "Single Scoop", price: 42.00 },
      { name: "Double Scoop", price: 75.00 },
    ],
    whatYouMightGet: [
      "Pastel-colored gel pens",
      "Floral washi tape collection",
      "Mini plush charms",
      "Sticker sheets with stars & hearts",
      "Cute memo pads",
      "Decorative paper clips",
    ],
  },
  {
    id: "pink-surprise-scoop",
    name: "Pink Surprise Scoop",
    price: 45.00,
    image: "https://private-us-east-1.manuscdn.com/sessionFile/zNW32IT4w1fhEkcWB8Mq7r/sandbox/sSr2pL0Hcr3emBbtDE76aL-img-4_1770842264000_na1fn_cHJvZHVjdC1waW5rLXN1cnByaXNl.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvek5XMzJJVDR3MWZoRWtjV0I4TXE3ci9zYW5kYm94L3NTcjJwTDBIY3IzZW1CYnRERTc2YUwtaW1nLTRfMTc3MDg0MjI2NDAwMF9uYTFmbl9jSEp2WkhWamRDMXdhVzVyTFhOMWNuQnlhWE5sLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=bqgwTDcxkDswlWb8hntvTjnsfMGTC2WOcDHkgp5PpK1jNcJXRKRM0k7rj~59E9ljq0BdeTLsfNpuNFVmQkvvylqbKxEAJrrIYDLuIw62LG9JAyd9XuSEGKOKLRrteXCPj2k5vvGOW2cfam2NFW6EkW1HkWzlkNVDJMCMg78ochCQixZnqbiOjFsuWokrL2DqjMO6M8HxBAcQyw5ZLrSPGaWMw42wTBQXZgNkw0r2vl-nQGPWohDI8ssa~B0oeCXTJQSRTKOEAds8VSXliuNxIRpkeT1seD4rZhVZ~tgDv-rjcJniCulJ6egSaN9AOyhrknZd7H~kd2UQX~TnMk3JoQ__",
    badge: "Popular",
    hook: "All pink everything — the ultimate pink lover's dream!",
    description: "For the pink obsessed! Every item in this scoop is curated in shades of pink. From hot pink to blush, it's a pink paradise.",
    theme: "character",
    color: "pink",
    inStock: true,
    stockCount: 12,
    hasVideoOption: true,
    variants: [
      { name: "Single Scoop", price: 45.00 },
      { name: "Double Scoop", price: 80.00 },
    ],
    whatYouMightGet: [
      "Pink glitter gel pens",
      "Character-shaped sticky notes",
      "Mini diary with heart lock",
      "Cute character keychains",
      "Candy-colored hair clips",
      "Sparkly sticker collection",
    ],
  },
  {
    id: "kawaii-character-scoop",
    name: "Kawaii Character Scoop",
    price: 49.00,
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&h=600&fit=crop",
    badge: "Limited",
    hook: "Original character art meets cute stationery",
    description: "Featuring original kawaii character designs (no trademarked assets). Each item showcases adorable original art — from bear-shaped pens to bunny memo pads.",
    theme: "character",
    color: "mixed",
    inStock: true,
    stockCount: 8,
    hasVideoOption: true,
    variants: [
      { name: "Single Scoop", price: 49.00 },
    ],
    whatYouMightGet: [
      "Original character art stickers",
      "Bear-shaped pen holders",
      "Bunny memo pads",
      "Character washi tape",
      "Mini character figurines",
      "Themed pencil cases",
    ],
  },
  {
    id: "mini-scoop",
    name: "Mini Scoop",
    price: 19.00,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop&q=80",
    hook: "A little taste of kawaii — perfect starter scoop!",
    description: "New to mystery scoops? Try our mini size! 4-6 carefully selected kawaii items to brighten your day without breaking the bank.",
    theme: "kawaii",
    color: "mixed",
    inStock: true,
    stockCount: 35,
    hasVideoOption: true,
    variants: [
      { name: "Mini Scoop", price: 19.00 },
    ],
    whatYouMightGet: [
      "Cute gel pen",
      "Sticker sheet",
      "Mini eraser set",
      "Washi tape sample",
    ],
  },
  {
    id: "premium-scoop",
    name: "Premium Scoop",
    price: 75.00,
    comparePrice: 95.00,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=600&fit=crop",
    badge: "Best Seller",
    hook: "Our most luxurious scoop — 15+ premium items!",
    description: "The ultimate kawaii experience. 15+ premium items including exclusive accessories, high-quality stationery, and special surprise gifts you won't find in our regular scoops.",
    theme: "kawaii",
    color: "pink",
    inStock: true,
    stockCount: 6,
    hasVideoOption: true,
    variants: [
      { name: "Premium Scoop", price: 75.00 },
    ],
    whatYouMightGet: [
      "Premium character plushie",
      "High-quality pen set",
      "Exclusive sticker collection",
      "Decorative storage box",
      "Kawaii desk accessories",
      "Surprise bonus items",
    ],
  },
];

export const packingVideoProduct = {
  id: "packing-video",
  name: "Order Packing Video",
  price: 7.00,
  image: "https://private-us-east-1.manuscdn.com/sessionFile/zNW32IT4w1fhEkcWB8Mq7r/sandbox/sSr2pL0Hcr3emBbtDE76aL-img-5_1770842258000_na1fn_cHJvZHVjdC1wYWNraW5nLXZpZGVv.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvek5XMzJJVDR3MWZoRWtjV0I4TXE3ci9zYW5kYm94L3NTcjJwTDBIY3IzZW1CYnRERTc2YUwtaW1nLTVfMTc3MDg0MjI1ODAwMF9uYTFmbl9jSEp2WkhWamRDMXdZV05yYVc1bkxYWnBaR1Z2LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=v8SFjBlLEaIdqHeFt~B~03EODJ6QyW5cm6so2RP03CyXff6bXD1Fb1J-7LyuG-3OfE4Ez8ojmvPZuQ7GY9or8CFQF8t2I0UZ7eMla7iGStxACQ~-qHPKWxmP2J1TJp-Qpgi6aaASbP7UA4YWIMqjRAlTEaGuTrKStJyqTXUT~8iwzVQvz8nApFhkBxWp94FuvsH05ok5VB~QoTqVTrlzRfuR2JFwyugZ0cZ4VUoEE4CuInlHc4Zs05Qtns~TbysTeBJK-l~pRWEmeNOakk8yKqZjE8MhEmQtr0tHZd-2HTZDgPgPAeiM9v6~lLo5wXz86DkvlC0yyN6oQpS8dQwdUQ__",
  description: "Watch us pack your mystery scoop with love! We'll create a short, satisfying packing video of your order and post it on our TikTok.",
  details: [
    "Short packing video (30-60 seconds)",
    "Posted on our TikTok within 1 week",
    "Videos are posted in order received",
    "You'll be tagged if you provide your handle",
  ],
  limitations: [
    "Video is posted publicly on TikTok",
    "Exact posting date cannot be guaranteed",
    "Video cannot be customized or re-shot",
    "Non-refundable once order is placed",
  ],
};

export const faqs = [
  {
    question: "When will I receive my order?",
    answer: "If your order includes a video, it takes 5 days to prepare for shipping. Orders without a video are usually packed within 3 days. Once your order has shipped, you'll receive an email with tracking details. Delivery generally takes 4-7 days within the U.S. and its territories.",
  },
  {
    question: "Do you ship internationally?",
    answer: "We currently ship only within the U.S. and its territories, but we're working on expanding to more regions soon.",
  },
  {
    question: "When will my packing video be posted on TikTok?",
    answer: "If you purchased a packing video, it's usually posted within 1 week after your order is placed. We post one video daily, and they are posted in the same order that the orders were received. We appreciate your patience as we take some time to create and edit.",
  },
  {
    question: "How can I customize or add a note to my order?",
    answer: "If you'd like to add a special note or customization request, please include it in the \"Special Instructions\" section at checkout. You can mention your preferences for characters, colors, or any other specific requests. Please keep in mind that customizations can't be guaranteed; every order is a fun mystery surprise packed with love!",
  },
  {
    question: "Are returns or exchanges accepted?",
    answer: "As each mystery order is custom-packed, we do not accept returns, exchanges, or cancellations.",
  },
  {
    question: "What if I don't like my items?",
    answer: "We understand that mystery boxes come with an element of surprise! While we can't guarantee you'll love every single item, we carefully curate each scoop to ensure high quality and variety. If you have specific preferences, mention them in the Special Instructions at checkout.",
  },
  {
    question: "How does the packing video work?",
    answer: "When you add a packing video to your order, we film ourselves carefully packing your mystery scoop. The video is then edited and posted on our TikTok account. You'll receive a notification when your video goes live!",
  },
];

export const reviews = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "Absolutely adorable! Every item was so cute and well-chosen. My daughter loved everything in her scoop!",
    date: "2 weeks ago",
  },
  {
    name: "Emily K.",
    rating: 5,
    text: "The packing video was such a fun bonus! Loved watching my order being put together. Will definitely order again.",
    date: "1 month ago",
  },
  {
    name: "Jessica L.",
    rating: 4,
    text: "Great value for the price. Got so many cute pens and stickers. The quality exceeded my expectations!",
    date: "3 weeks ago",
  },
  {
    name: "Mia R.",
    rating: 5,
    text: "This is my third order and I'm never disappointed! The pastel scoop was dreamy. Every item was perfectly curated.",
    date: "1 week ago",
  },
  {
    name: "Olivia T.",
    rating: 5,
    text: "Best mystery box I've ever ordered! The packaging was adorable and everything inside was top quality kawaii goodness.",
    date: "2 days ago",
  },
];

export const howItWorks = [
  {
    step: 1,
    title: "Choose Your Scoop",
    description: "Pick from our range of mystery scoops — each one packed with kawaii surprises!",
    icon: "🍨",
  },
  {
    step: 2,
    title: "Add a Packing Video",
    description: "Want to see your order being packed? Add our optional TikTok packing video!",
    icon: "🎥",
  },
  {
    step: 3,
    title: "We Pack & Ship",
    description: "We carefully curate and pack your scoop with love, then ship it right to your door!",
    icon: "📦",
  },
];
