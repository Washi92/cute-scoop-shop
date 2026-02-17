import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Duplicate product data for server-side validation
// In a real app, this would be in a shared database or package
const products = [
  {
    id: "mystery-scoop-classic",
    name: "Mystery Scoops",
    price: 37.00,
    variants: [
      { name: "Single Scoop", price: 37.00 },
      { name: "Double Scoop", price: 65.00 },
      { name: "Triple Scoop", price: 89.00 },
    ],
  },
  {
    id: "pastel-scoop",
    name: "Pastel Scoop",
    price: 42.00,
    variants: [
      { name: "Single Scoop", price: 42.00 },
      { name: "Double Scoop", price: 75.00 },
    ],
  },
  {
    id: "pink-surprise-scoop",
    name: "Pink Surprise Scoop",
    price: 45.00,
    variants: [
      { name: "Single Scoop", price: 45.00 },
      { name: "Double Scoop", price: 80.00 },
    ],
  },
  {
    id: "kawaii-character-scoop",
    name: "Kawaii Character Scoop",
    price: 49.00,
    variants: [
      { name: "Single Scoop", price: 49.00 },
    ],
  },
  {
    id: "mini-scoop",
    name: "Mini Scoop",
    price: 19.00,
    variants: [
      { name: "Mini Scoop", price: 19.00 },
    ],
  },
  {
    id: "premium-scoop",
    name: "Premium Scoop",
    price: 75.00,
    variants: [
      { name: "Premium Scoop", price: 75.00 },
    ],
  },
];

const packingVideoProduct = {
  id: "packing-video",
  name: "Order Packing Video",
  price: 7.00,
};

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));
  app.use(express.json());

  // Initialize Stripe
  if (!process.env.STRIPE_SECRET_KEY) {
    console.warn("Warning: STRIPE_SECRET_KEY not set. Payment implementation will fail if used.");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
    apiVersion: "2026-01-28.clover",
  });

  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { items } = req.body;

      if (!items || !Array.isArray(items)) {
        res.status(400).json({ error: "Invalid items" });
        return;
      }

      // Calculate total price on server
      let total = 0;

      for (const item of items) {
        const product = products.find(p => p.id === item.productId);
        if (product) {
          const variant = product.variants?.find(v => v.name === item.variant);
          const price = variant ? variant.price : product.price;

          let itemTotal = price * item.quantity;

          if (item.addPackingVideo) {
            itemTotal += packingVideoProduct.price * item.quantity;
          }

          total += itemTotal;
        }
      }

      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(total * 100), // Stripe expects amount in cents
        currency: "eur",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error: any) {
      console.error("Error creating payment intent:", error);
      res.status(500).send({ error: error.message });
    }
  });

  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 5000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
