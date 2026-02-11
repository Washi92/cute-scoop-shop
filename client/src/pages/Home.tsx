// Design: Harajuku Confectionery — Neo-Decora Pop
// Home page with hero, how it works, featured products, social proof, FAQ preview, video gallery
import { Link } from "wouter";
import { ArrowRight, Star, Package, Truck } from "lucide-react";
import { products, howItWorks, faqs, reviews, HERO_BANNER, packingVideoProduct } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import FAQAccordion from "@/components/FAQAccordion";
import ReviewStars from "@/components/ReviewStars";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BestSellerPopup from "@/components/BestSellerPopup";
import { useEffect, useRef, useState } from "react";

function SparkleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main>
        {/* ===== HERO SECTION ===== */}
        <section className="relative overflow-hidden bg-gradient-to-br from-kawaii-blush via-white to-kawaii-lavender/20">
          <SparkleField />
          <div className="container py-12 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Text Side */}
              <div className="relative z-10 text-center lg:text-left">
                <div className="inline-block bg-primary/10 text-primary text-xs font-bold px-4 py-1.5 rounded-full mb-4" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                  ✨ Mystery boxes packed with love
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                  Cute things in
                  <span className="text-primary block">every scoop!</span>
                </h1>
                <p className="text-base md:text-lg text-foreground/70 max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed">
                  Discover adorable mystery scoops packed with kawaii stationery, cute trinkets, and surprise goodies. Each scoop is a delightful surprise!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Link href="/catalog" className="btn-kawaii bg-primary text-primary-foreground text-base px-8 py-3 shadow-lg shadow-primary/25">
                    Shop Mystery Scoops
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                  <a href="#how-it-works" className="btn-kawaii bg-white text-primary border-2 border-primary/20 text-base px-8 py-3 hover:border-primary/40">
                    How It Works
                  </a>
                </div>
                {/* Trust badges */}
                <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start text-xs text-foreground/50">
                  <span className="flex items-center gap-1"><Truck size={14} /> Free shipping $50+</span>
                  <span className="flex items-center gap-1"><Package size={14} /> Ships in 3-5 days</span>
                  <span className="flex items-center gap-1"><Star size={14} className="fill-yellow-400 text-yellow-400" /> 4.9/5 rating</span>
                </div>
              </div>

              {/* Image Side */}
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border-4 border-white">
                  <img
                    src={HERO_BANNER}
                    alt="Kawaii stationery flat lay with cute pens, notebooks, stickers, and plush keychains"
                    className="w-full h-auto object-cover"
                    loading="eager"
                  />
                </div>
                {/* Floating decorative elements */}
                <div className="absolute -top-4 -right-4 text-4xl" style={{ animation: "float 3s ease-in-out infinite" }} aria-hidden="true">🎀</div>
                <div className="absolute -bottom-3 -left-3 text-3xl" style={{ animation: "float 3s ease-in-out infinite 0.5s" }} aria-hidden="true">⭐</div>
              </div>
            </div>
          </div>

          {/* Washi tape divider */}
          <div className="h-3 bg-gradient-to-r from-kawaii-pink/30 via-kawaii-lavender/30 to-kawaii-mint/30" aria-hidden="true" />
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section id="how-it-works" className="py-16 md:py-24 bg-white">
          <div className="container">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                How It Works
              </h2>
              <p className="text-foreground/60 max-w-md mx-auto">
                Getting your kawaii mystery scoop is as easy as 1-2-3!
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {howItWorks.map((step, i) => (
                <AnimatedSection key={step.step} delay={i * 0.15}>
                  <div className="text-center group">
                    <div className="w-20 h-20 mx-auto mb-4 bg-kawaii-blush rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      {step.icon}
                    </div>
                    <div className="text-xs font-bold text-primary/50 uppercase tracking-widest mb-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                      Step {step.step}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FEATURED PRODUCTS ===== */}
        <section className="py-16 md:py-24 bg-kawaii-blush/30">
          <div className="container">
            <AnimatedSection className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                  Our Mystery Scoops
                </h2>
                <p className="text-foreground/60 mt-2">Each one is a surprise packed with love!</p>
              </div>
              <Link href="/catalog" className="hidden md:flex items-center gap-1 text-sm font-semibold text-primary hover:text-kawaii-hot transition-colors">
                View All <ArrowRight size={16} />
              </Link>
            </AnimatedSection>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.slice(0, 6).map((product, i) => (
                <AnimatedSection key={product.id} delay={i * 0.08}>
                  <ProductCard product={product} />
                </AnimatedSection>
              ))}
            </div>

            <div className="text-center mt-8 md:hidden">
              <Link href="/catalog" className="btn-kawaii bg-primary text-primary-foreground text-sm">
                View All Scoops <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* ===== SOCIAL PROOF ===== */}
        <section className="py-12 bg-white border-y border-kawaii-pink/10">
          <div className="container">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-center">
              <div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  {[1,2,3,4,5].map(s => <Star key={s} size={18} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-sm font-semibold text-foreground/70">4.9/5 Average Rating</p>
              </div>
              <div className="h-8 w-px bg-kawaii-pink/20 hidden md:block" />
              <div>
                <p className="text-2xl font-bold text-primary" style={{ fontFamily: "'Quicksand', sans-serif" }}>2,500+</p>
                <p className="text-sm text-foreground/70">Happy Customers</p>
              </div>
              <div className="h-8 w-px bg-kawaii-pink/20 hidden md:block" />
              <div>
                <p className="text-2xl font-bold text-primary" style={{ fontFamily: "'Quicksand', sans-serif" }}>5,000+</p>
                <p className="text-sm text-foreground/70">Scoops Shipped</p>
              </div>
              <div className="h-8 w-px bg-kawaii-pink/20 hidden md:block" />
              <div>
                <p className="text-2xl font-bold text-primary" style={{ fontFamily: "'Quicksand', sans-serif" }}>100%</p>
                <p className="text-sm text-foreground/70">Packed with Love</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== REVIEWS ===== */}
        <section className="py-16 md:py-24 bg-kawaii-cream">
          <div className="container">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                What Our Scoopers Say
              </h2>
              <p className="text-foreground/60">Real reviews from real kawaii lovers!</p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {reviews.slice(0, 3).map((review, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-kawaii-pink/10 hover:shadow-md transition-shadow">
                    <ReviewStars rating={review.rating} size={14} />
                    <p className="text-sm text-foreground/70 mt-3 leading-relaxed italic">
                      "{review.text}"
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-kawaii-lavender/50 flex items-center justify-center text-xs font-bold text-purple-700">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{review.name}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ===== VIDEO GALLERY / PACKING VIDEO PROMO ===== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <AnimatedSection>
                <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                  <img
                    src={packingVideoProduct.image}
                    alt="Order packing video preview showing hands packing kawaii items"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="ml-1">
                        <path d="M8 5.14v14.72a1 1 0 001.5.86l11.14-7.36a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z" fill="oklch(0.65 0.22 10)" />
                      </svg>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <div className="inline-block bg-kawaii-coral/10 text-kawaii-coral text-xs font-bold px-4 py-1.5 rounded-full mb-4" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                  🎥 Add-on
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                  A little peek inside your scoop! 💗
                </h2>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  Add a TikTok packing video to your order and watch us carefully pack your mystery scoop with love! We'll film the entire process and post it on our TikTok for you to enjoy and share.
                </p>
                <ul className="space-y-2 mb-6">
                  {packingVideoProduct.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                      <span className="text-kawaii-mint mt-0.5">✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-primary" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                    ${packingVideoProduct.price.toFixed(2)}
                  </span>
                  <Link href="/product/packing-video" className="btn-kawaii bg-primary text-primary-foreground text-sm">
                    Learn More
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ===== FAQ PREVIEW ===== */}
        <section className="py-16 md:py-24 bg-kawaii-blush/20">
          <div className="container max-w-3xl">
            <AnimatedSection className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                Frequently Asked Questions
              </h2>
              <p className="text-foreground/60">Got questions? We've got answers!</p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <FAQAccordion items={faqs.slice(0, 5)} />
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="text-center mt-8">
              <Link href="/faq" className="btn-kawaii bg-white text-primary border-2 border-primary/20 text-sm hover:border-primary/40">
                View All FAQs <ArrowRight size={16} className="ml-1" />
              </Link>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
      <BestSellerPopup />
    </div>
  );
}
