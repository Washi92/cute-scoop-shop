// Design: Harajuku Confectionery — Contact page with form
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQAccordion from "@/components/FAQAccordion";
import { faqs } from "@/lib/data";
import { toast } from "sonner";
import { Mail, Clock, MessageCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon 💗");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-kawaii-blush via-white to-kawaii-lavender/20 py-10 md:py-16">
          <div className="container text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Contact
            </h1>
            <p className="text-foreground/60 mt-2 max-w-md mx-auto">
              We'd love to hear from you! Drop us a message below.
            </p>
          </div>
        </div>

        <div className="container max-w-4xl py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-kawaii-blush/50 rounded-2xl p-5">
                <Mail size={20} className="text-primary mb-2" />
                <h3 className="font-bold text-sm" style={{ fontFamily: "'Quicksand', sans-serif" }}>Email</h3>
                <p className="text-sm text-foreground/60 mt-1">hello@cutescoopshop.com</p>
              </div>
              <div className="bg-kawaii-blush/50 rounded-2xl p-5">
                <Clock size={20} className="text-primary mb-2" />
                <h3 className="font-bold text-sm" style={{ fontFamily: "'Quicksand', sans-serif" }}>Business Hours</h3>
                <p className="text-sm text-foreground/60 mt-1">Mon-Fri: 9am - 5pm PST</p>
              </div>
              <div className="bg-kawaii-blush/50 rounded-2xl p-5">
                <MessageCircle size={20} className="text-primary mb-2" />
                <h3 className="font-bold text-sm" style={{ fontFamily: "'Quicksand', sans-serif" }}>Response Time</h3>
                <p className="text-sm text-foreground/60 mt-1">Usually within 24-48 hours</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-sm font-semibold text-foreground/80 block mb-1" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl border border-kawaii-pink/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-semibold text-foreground/80 block mb-1" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-kawaii-pink/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="text-sm font-semibold text-foreground/80 block mb-1" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                    Phone (optional)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-3 rounded-xl border border-kawaii-pink/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-semibold text-foreground/80 block mb-1" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    placeholder="How can we help you?"
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-kawaii-pink/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm resize-none"
                    required
                  />
                </div>
                <button type="submit" className="btn-kawaii bg-primary text-primary-foreground text-base px-8 py-3">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="py-16 bg-kawaii-blush/20">
          <div className="container max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Frequently Asked Questions
            </h2>
            <FAQAccordion items={faqs.slice(0, 5)} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
