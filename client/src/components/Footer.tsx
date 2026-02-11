// Design: Harajuku Confectionery — warm kawaii footer
import { Link } from "wouter";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for subscribing! 💗");
      setEmail("");
    }
  };

  return (
    <footer className="bg-primary/5 border-t border-kawaii-pink/20">
      {/* Newsletter Section */}
      <div className="bg-kawaii-blush py-12">
        <div className="container text-center">
          <h3 className="text-2xl font-bold text-primary mb-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            Join the Scoop Squad! 💌
          </h3>
          <p className="text-sm text-foreground/70 mb-6 max-w-md mx-auto">
            Get exclusive deals, early access to new scoops, and cute surprises delivered to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-full border border-kawaii-pink/30 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
              required
            />
            <button type="submit" className="btn-kawaii bg-primary text-primary-foreground text-sm px-6">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Links */}
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-bold text-primary mb-3" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Cute Scoop Shop
            </h4>
            <p className="text-sm text-foreground/60 leading-relaxed">
              Curating kawaii surprises packed with love. Every scoop is a little box of happiness!
            </p>
          </div>

          {/* Shop */}
          <div>
            <h5 className="font-bold text-sm uppercase tracking-wider text-foreground/80 mb-3" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Shop
            </h5>
            <ul className="space-y-2">
              <li><Link href="/catalog" className="text-sm text-foreground/60 hover:text-primary transition-colors">All Scoops</Link></li>
              <li><Link href="/product/mystery-scoop-classic" className="text-sm text-foreground/60 hover:text-primary transition-colors">Mystery Scoops</Link></li>
              <li><Link href="/product/packing-video" className="text-sm text-foreground/60 hover:text-primary transition-colors">Packing Video</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h5 className="font-bold text-sm uppercase tracking-wider text-foreground/80 mb-3" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Help
            </h5>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-sm text-foreground/60 hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-sm text-foreground/60 hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/policies/shipping" className="text-sm text-foreground/60 hover:text-primary transition-colors">Shipping Policy</Link></li>
              <li><Link href="/policies/returns" className="text-sm text-foreground/60 hover:text-primary transition-colors">Return Policy</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="font-bold text-sm uppercase tracking-wider text-foreground/80 mb-3" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Legal
            </h5>
            <ul className="space-y-2">
              <li><Link href="/policies/privacy" className="text-sm text-foreground/60 hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/policies/terms" className="text-sm text-foreground/60 hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a href="#" className="text-foreground/40 hover:text-primary transition-colors" aria-label="TikTok" onClick={(e) => { e.preventDefault(); toast("TikTok link coming soon!"); }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.1a8.16 8.16 0 0 0 3.76.92V5.57a4.83 4.83 0 0 1-1-.12z"/></svg>
              </a>
              <a href="#" className="text-foreground/40 hover:text-primary transition-colors" aria-label="Instagram" onClick={(e) => { e.preventDefault(); toast("Instagram link coming soon!"); }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-kawaii-pink/10 py-4">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-foreground/40">
          <p>&copy; 2025 Cute Scoop Shop. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={12} className="text-primary fill-primary" /> and lots of kawaii
          </p>
        </div>
      </div>
    </footer>
  );
}
