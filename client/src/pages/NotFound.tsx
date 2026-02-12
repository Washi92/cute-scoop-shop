// Design: Harajuku Confectionery — Kawaii 404 page
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { withBasePath } from "@/lib/basePath";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="text-center px-4">
          <span className="text-7xl block mb-4" style={{ animation: "float 3s ease-in-out infinite" }}>🍨</span>
          <h1 className="text-6xl font-bold text-primary mb-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            404
          </h1>
          <h2 className="text-xl font-bold text-foreground mb-4" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            Oops! This scoop melted away
          </h2>
          <p className="text-foreground/60 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist. Maybe it was scooped up by someone else!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={withBasePath("/")} className="btn-kawaii bg-primary text-primary-foreground text-sm px-8 py-3">
              Go Home
            </Link>
            <Link href={withBasePath("/catalog")} className="btn-kawaii bg-white text-primary border-2 border-primary/20 text-sm px-8 py-3">
              Browse Scoops
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
