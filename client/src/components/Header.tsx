// Design: Harajuku Confectionery — scrolling announcement bar, kawaii nav
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import CartDrawer from "./CartDrawer";
import { withBasePath } from "@/lib/basePath";

export default function Header() {
  const [location] = useLocation();
  const { totalItems, isCartOpen, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { href: withBasePath("/"), label: "Home" },
    { href: withBasePath("/catalog"), label: "Catalog" },
    { href: withBasePath("/faq"), label: "FAQ" },
    { href: withBasePath("/contact"), label: "Contact" },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground overflow-hidden whitespace-nowrap py-2 text-sm font-medium">
        <div className="inline-flex" style={{ animation: "marquee 25s linear infinite" }}>
          <span className="px-8">
            💗 Orders placed after January 28th will start shipping on February 7th. Thank you for your patience 💗
          </span>
          <span className="px-8">
            💗 Free shipping on orders over $50! 💗
          </span>
          <span className="px-8">
            💗 Orders placed after January 28th will start shipping on February 7th. Thank you for your patience 💗
          </span>
          <span className="px-8">
            💗 Free shipping on orders over $50! 💗
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-kawaii-pink/20 shadow-sm">
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link href={withBasePath("/")} className="flex items-center gap-2 group">
            <span className="text-xl md:text-2xl font-bold text-primary" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Cute Mashula
            </span>
            <span className="text-xs md:text-sm font-semibold text-kawaii-coral uppercase tracking-wider" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Shop
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold uppercase tracking-wide transition-colors hover:text-primary ${location === link.href ? "text-primary" : "text-foreground/70"
                  }`}
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-foreground/70 hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-foreground/70 hover:text-primary transition-colors"
              aria-label={`Cart with ${totalItems} items`}
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-kawaii-pink/20 bg-white py-4 px-4 space-y-3">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-base font-semibold uppercase tracking-wide py-2 transition-colors ${location === link.href ? "text-primary" : "text-foreground/70"
                  }`}
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Search Bar */}
        {searchOpen && (
          <div className="border-t border-kawaii-pink/20 bg-white py-3 px-4">
            <div className="container">
              <input
                type="search"
                placeholder="Search for mystery scoops..."
                className="w-full px-4 py-2 rounded-full border border-kawaii-pink/30 bg-kawaii-blush/50 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                style={{ fontFamily: "'Nunito', sans-serif" }}
                autoFocus
              />
            </div>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
