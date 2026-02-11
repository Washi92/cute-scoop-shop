// Design: Harajuku Confectionery — Policy pages
import { useParams } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const policies: Record<string, { title: string; content: string }> = {
  privacy: {
    title: "Privacy Policy",
    content: `Last updated: February 2025

At Cute Scoop Shop, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or make a purchase.

**Information We Collect**
We collect information you provide directly to us, such as your name, email address, shipping address, and payment information when you make a purchase. We also automatically collect certain information about your device and browsing activity.

**How We Use Your Information**
We use the information we collect to process your orders, communicate with you about your purchases, send promotional emails (with your consent), and improve our website and services.

**Information Sharing**
We do not sell, trade, or otherwise transfer your personal information to third parties except as necessary to fulfill your order (e.g., shipping carriers, payment processors).

**Data Security**
We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

**Your Rights**
You have the right to access, correct, or delete your personal information. Contact us at hello@cutescoopshop.com to exercise these rights.

**Cookies**
We use cookies to enhance your browsing experience. You can disable cookies in your browser settings, though this may affect website functionality.

**Contact Us**
If you have questions about this Privacy Policy, please contact us at hello@cutescoopshop.com.`,
  },
  terms: {
    title: "Terms of Service",
    content: `Last updated: February 2025

Welcome to Cute Scoop Shop! By accessing or using our website, you agree to be bound by these Terms of Service.

**Products**
Our mystery scoops contain randomly selected kawaii stationery and accessories. Specific items cannot be guaranteed. Product images are for illustration purposes and may not represent exact items received.

**Orders & Payment**
All prices are listed in USD. Payment is processed securely through our payment provider. Orders are confirmed via email after successful payment.

**Shipping**
We currently ship within the U.S. and its territories. Orders are typically processed within 3-5 business days. Delivery takes 4-7 business days after shipping.

**Returns & Refunds**
Due to the mystery nature of our products, we do not accept returns, exchanges, or cancellations once an order is placed. If you receive damaged items, please contact us within 48 hours of delivery.

**Intellectual Property**
All content on this website, including text, images, and designs, is owned by Cute Scoop Shop and protected by copyright laws.

**Limitation of Liability**
Cute Scoop Shop is not liable for any indirect, incidental, or consequential damages arising from your use of our website or products.

**Changes to Terms**
We reserve the right to update these terms at any time. Changes will be posted on this page with an updated date.

**Contact**
For questions about these terms, email us at hello@cutescoopshop.com.`,
  },
  returns: {
    title: "Return Policy",
    content: `Last updated: February 2025

**Mystery Box Policy**
As each mystery order is custom-packed and unique, we do not accept returns, exchanges, or cancellations. Every scoop is a surprise, and that's what makes it special!

**Damaged Items**
If you receive items that are damaged during shipping, please contact us within 48 hours of delivery with photos of the damage. We'll work with you to make it right.

**Missing Items**
If your order appears to be missing items, please contact us within 48 hours of delivery. We'll investigate and resolve the issue promptly.

**How to Contact Us**
Email: hello@cutescoopshop.com
Please include your order number and photos if applicable.

**Processing Time**
We aim to respond to all return/damage inquiries within 24-48 business hours.`,
  },
  shipping: {
    title: "Shipping Policy",
    content: `Last updated: February 2025

**Processing Time**
Orders without a packing video are typically packed within 3 business days. Orders with a packing video take approximately 5 business days to prepare.

**Shipping Methods & Delivery**
We ship via USPS within the U.S. and its territories. Standard delivery takes 4-7 business days after your order ships.

**Tracking**
Once your order ships, you'll receive an email with tracking information. You can track your package through the USPS website.

**Shipping Costs**
- Orders under $50: Standard shipping rate applies
- Orders $50 and above: FREE standard shipping!

**International Shipping**
We currently ship only within the U.S. and its territories. We're working on expanding to more regions soon!

**Lost or Delayed Packages**
If your package appears lost or significantly delayed, please contact us and we'll work with the carrier to locate your order.

**Address Changes**
Please ensure your shipping address is correct at checkout. We cannot modify addresses once an order has been placed.

**Contact**
For shipping questions, email us at hello@cutescoopshop.com with your order number.`,
  },
};

export default function Policies() {
  const { type } = useParams<{ type: string }>();
  const policy = policies[type || ""] || policies.privacy;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="bg-gradient-to-r from-kawaii-blush via-white to-kawaii-lavender/20 py-10 md:py-16">
          <div className="container text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              {policy.title}
            </h1>
          </div>
        </div>

        <div className="container max-w-3xl py-12">
          <div className="prose prose-sm max-w-none text-foreground/70 leading-relaxed">
            {policy.content.split("\n\n").map((paragraph, i) => {
              if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                return <h3 key={i} className="text-lg font-bold text-foreground mt-6 mb-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>{paragraph.replace(/\*\*/g, "")}</h3>;
              }
              if (paragraph.startsWith("**")) {
                const parts = paragraph.split("**");
                return (
                  <div key={i} className="mb-4">
                    {parts.map((part, j) =>
                      j % 2 === 1
                        ? <h3 key={j} className="text-base font-bold text-foreground mt-6 mb-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>{part}</h3>
                        : <p key={j} className="text-sm leading-relaxed">{part}</p>
                    )}
                  </div>
                );
              }
              if (paragraph.startsWith("- ")) {
                return (
                  <ul key={i} className="list-disc list-inside space-y-1 mb-4">
                    {paragraph.split("\n").map((line, j) => (
                      <li key={j} className="text-sm">{line.replace("- ", "")}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={i} className="text-sm leading-relaxed mb-4">{paragraph}</p>;
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
