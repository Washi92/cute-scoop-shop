// Design: Harajuku Confectionery — Full FAQ page
import { faqs } from "@/lib/data";
import FAQAccordion from "@/components/FAQAccordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { Mail } from "lucide-react";

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-kawaii-blush via-white to-kawaii-lavender/20 py-10 md:py-16">
          <div className="container text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Frequently Asked Questions
            </h1>
            <p className="text-foreground/60 mt-2 max-w-md mx-auto">
              Everything you need to know about our mystery scoops!
            </p>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="container max-w-3xl py-12">
          <FAQAccordion items={faqs} />

          {/* Contact CTA */}
          <div className="mt-12 text-center bg-kawaii-blush/50 rounded-3xl p-8">
            <span className="text-4xl block mb-3">💬</span>
            <h2 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Still have questions?
            </h2>
            <p className="text-sm text-foreground/60 mb-6">
              We're here to help! Reach out and we'll get back to you as soon as possible.
            </p>
            <Link href="/contact" className="btn-kawaii bg-primary text-primary-foreground text-sm inline-flex items-center gap-2">
              <Mail size={16} />
              Contact Us
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
