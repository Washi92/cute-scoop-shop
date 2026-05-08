import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "./components/ScrollToTop";
import BestSellerPopup from "./components/BestSellerPopup";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Policies from "./pages/Policies";
import { Suspense, lazy } from "react";

const Checkout = lazy(() => import("./pages/Checkout"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));

function Routes() {
  // Determine base path - empty for dev, /cute-scoop-shop for production
  const base = import.meta.env.PROD ? "/cute-scoop-shop" : "";

  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path={`${base}/`} component={Home} />
        <Route path={`${base}/catalog`} component={Catalog} />
        <Route path={`${base}/product/:id`} component={ProductDetail} />
        <Route path={`${base}/faq`} component={FAQ} />
        <Route path={`${base}/contact`} component={Contact} />
        <Route path={`${base}/policies/:type`} component={Policies} />
        <Route path={`${base}/checkout`} component={Checkout} />
        <Route path={`${base}/order-confirmation`} component={OrderConfirmation} />
        <Route path={`${base}/404`} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <ScrollToTop />
            <BestSellerPopup />
            <Routes />
          </TooltipProvider>
        </CartProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
