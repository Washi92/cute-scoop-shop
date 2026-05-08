import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCart, type CustomerInfo } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Loader2, User, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/contexts/ThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.
// Initialize Stripe lazily
let stripePromise: Promise<import("@stripe/stripe-js").Stripe | null>;
const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "");
    }
    return stripePromise;
};


function CheckoutForm({ customerInfo }: { customerInfo: CustomerInfo }) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { clearCart, totalPrice, saveLastOrder } = useCart();
    const [, setLocation] = useLocation();

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case "succeeded":
                    // Order was already saved in handleSubmit before the Stripe redirect.
                    // Do NOT call saveLastOrder here — customerInfo state is empty on redirect return.
                    clearCart();
                    toast.success("Payment successful! Thank you for your order.");
                    setLocation("/order-confirmation");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe, clearCart, setLocation]);

    const validateCustomerInfo = (): boolean => {
        if (!customerInfo.fullName.trim()) {
            toast.error("Please enter your full name.");
            return false;
        }
        if (!customerInfo.email.trim() || !customerInfo.email.includes("@")) {
            toast.error("Please enter a valid email address.");
            return false;
        }
        if (!customerInfo.address.trim()) {
            toast.error("Please enter your shipping address.");
            return false;
        }
        if (!customerInfo.city.trim()) {
            toast.error("Please enter your city.");
            return false;
        }
        if (!customerInfo.postalCode.trim()) {
            toast.error("Please enter your postal code.");
            return false;
        }
        if (!customerInfo.country.trim()) {
            toast.error("Please select your country.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        if (!validateCustomerInfo()) {
            return;
        }

        setIsLoading(true);

        // Save the order before confirming payment (in case redirect clears state)
        saveLastOrder(customerInfo);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/checkout`,
                payment_method_data: {
                    billing_details: {
                        name: customerInfo.fullName,
                        email: customerInfo.email,
                        phone: customerInfo.phone || undefined,
                        address: {
                            line1: customerInfo.address,
                            city: customerInfo.city,
                            postal_code: customerInfo.postalCode,
                            country: getCountryCode(customerInfo.country),
                        },
                    },
                },
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message ?? "An unexpected error occurred.");
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
            <Button disabled={isLoading || !stripe || !elements} className="w-full" size="lg">
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                    </>
                ) : (
                    `Pay €${totalPrice.toFixed(2)}`
                )}
            </Button>
            {message && <div id="payment-message" className="text-sm text-red-500 mt-2">{message}</div>}
        </form>
    );
}

// Helper to convert country name to ISO 2-letter code for Stripe
function getCountryCode(country: string): string {
    const map: Record<string, string> = {
        "France": "FR", "Germany": "DE", "Belgium": "BE", "Netherlands": "NL",
        "Spain": "ES", "Italy": "IT", "Portugal": "PT", "Austria": "AT",
        "Switzerland": "CH", "United Kingdom": "GB", "Ireland": "IE",
        "Luxembourg": "LU", "Denmark": "DK", "Sweden": "SE", "Norway": "NO",
        "Finland": "FI", "Poland": "PL", "Czech Republic": "CZ",
        "United States": "US", "Canada": "CA", "Japan": "JP",
    };
    return map[country] || country.substring(0, 2).toUpperCase();
}

const COUNTRIES = [
    "France", "Germany", "Belgium", "Netherlands", "Spain", "Italy",
    "Portugal", "Austria", "Switzerland", "United Kingdom", "Ireland",
    "Luxembourg", "Denmark", "Sweden", "Norway", "Finland", "Poland",
    "Czech Republic", "United States", "Canada", "Japan",
];

export default function Checkout() {
    const [clientSecret, setClientSecret] = useState("");
    const { items, totalPrice, clearCart } = useCart();
    const [, setLocation] = useLocation();
    const { theme } = useTheme();

    // Detect if returning from Stripe redirect — show processing screen immediately
    const isPaymentReturn = new URLSearchParams(window.location.search).has("payment_intent_client_secret");

    // Customer info state (Priority 4)
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        country: "France",
    });

    const updateField = (field: keyof CustomerInfo, value: string) => {
        setCustomerInfo(prev => ({ ...prev, [field]: value }));
    };

    // Handle Stripe payment return: verify payment and redirect to confirmation
    const [paymentReturnHandled, setPaymentReturnHandled] = useState(false);
    useEffect(() => {
        if (!isPaymentReturn || paymentReturnHandled) return;

        const params = new URLSearchParams(window.location.search);
        const clientSecretParam = params.get("payment_intent_client_secret");
        const redirectStatus = params.get("redirect_status");

        // Fast path: Stripe tells us the status in the URL
        if (redirectStatus === "succeeded") {
            clearCart();
            toast.success("Payment successful! Thank you for your order.");
            setLocation("/order-confirmation");
            setPaymentReturnHandled(true);
            return;
        }

        // Fallback: verify with Stripe SDK directly
        if (clientSecretParam) {
            getStripe().then(stripe => {
                if (!stripe) return;
                stripe.retrievePaymentIntent(clientSecretParam).then(({ paymentIntent }) => {
                    switch (paymentIntent?.status) {
                        case "succeeded":
                            clearCart();
                            toast.success("Payment successful! Thank you for your order.");
                            setLocation("/order-confirmation");
                            break;
                        case "processing":
                            toast.info("Your payment is processing. We'll update you when it completes.");
                            setLocation("/order-confirmation");
                            break;
                        case "requires_payment_method":
                            toast.error("Payment failed. Please try again.");
                            // Redirect back to checkout without the URL params
                            window.location.href = "/checkout";
                            break;
                        default:
                            toast.error("Something went wrong.");
                            window.location.href = "/checkout";
                            break;
                    }
                    setPaymentReturnHandled(true);
                });
            });
        }
    }, [isPaymentReturn, paymentReturnHandled, clearCart, setLocation]);

    // Create payment intent (skip on redirect returns)
    useEffect(() => {
        if (isPaymentReturn) return;
        if (items.length > 0 && !clientSecret) {
            fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: items.map(item => ({
                        productId: item.product.id,
                        variant: item.variant,
                        quantity: item.quantity,
                        addPackingVideo: item.addPackingVideo
                    }))
                }),
            })
                .then((res) => {
                    if (!res.ok) throw new Error("Network response was not ok");
                    return res.json();
                })
                .then((data) => setClientSecret(data.clientSecret))
                .catch((error) => {
                    console.error("Error creating payment intent:", error);
                    toast.error("Failed to initialize payment. Please make sure the server is running.");
                });
        }
    }, [items, clientSecret, isPaymentReturn]);

    // Show processing screen while handling Stripe return redirect
    if (isPaymentReturn || paymentReturnHandled) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                    <div className="text-center">
                        <Loader2 className="h-12 w-12 animate-spin text-pink-500 mx-auto mb-4" />
                        <h2
                            className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2"
                            style={{ fontFamily: "'Quicksand', sans-serif" }}
                        >
                            Processing your payment...
                        </h2>
                        <p className="text-muted-foreground">Please wait while we confirm your order.</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const appearance = {
        theme: theme === 'dark' ? 'night' : 'stripe',
        variables: {
            colorPrimary: '#ec4899', // pink-500
            colorBackground: theme === 'dark' ? '#1f2937' : '#ffffff',
            colorText: theme === 'dark' ? '#f3f4f6' : '#1f2937',
        },
    };
    const options = {
        clientSecret,
        appearance,
    };

    const inputClasses = "w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-shadow text-sm";
    const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5";

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <Button
                        variant="ghost"
                        className="mb-8"
                        onClick={() => setLocation("/catalog")}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Catalog
                    </Button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Column: Customer Info + Order Summary */}
                        <div className="space-y-8">
                            {/* Customer Information (Priority 4) */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-5 w-5" />
                                        Contact Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label htmlFor="fullName" className={labelClasses}>
                                            Full Name *
                                        </label>
                                        <input
                                            id="fullName"
                                            type="text"
                                            value={customerInfo.fullName}
                                            onChange={(e) => updateField("fullName", e.target.value)}
                                            placeholder="Jane Doe"
                                            className={inputClasses}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="email" className={labelClasses}>
                                                <Mail className="inline h-3 w-3 mr-1" />
                                                Email *
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                value={customerInfo.email}
                                                onChange={(e) => updateField("email", e.target.value)}
                                                placeholder="jane@example.com"
                                                className={inputClasses}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className={labelClasses}>
                                                <Phone className="inline h-3 w-3 mr-1" />
                                                Phone (optional)
                                            </label>
                                            <input
                                                id="phone"
                                                type="tel"
                                                value={customerInfo.phone}
                                                onChange={(e) => updateField("phone", e.target.value)}
                                                placeholder="+33 6 12 34 56 78"
                                                className={inputClasses}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Shipping Address */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5" />
                                        Shipping Address
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label htmlFor="address" className={labelClasses}>
                                            Street Address *
                                        </label>
                                        <input
                                            id="address"
                                            type="text"
                                            value={customerInfo.address}
                                            onChange={(e) => updateField("address", e.target.value)}
                                            placeholder="123 Rue de la Paix"
                                            className={inputClasses}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="city" className={labelClasses}>
                                                City *
                                            </label>
                                            <input
                                                id="city"
                                                type="text"
                                                value={customerInfo.city}
                                                onChange={(e) => updateField("city", e.target.value)}
                                                placeholder="Paris"
                                                className={inputClasses}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="postalCode" className={labelClasses}>
                                                Postal Code *
                                            </label>
                                            <input
                                                id="postalCode"
                                                type="text"
                                                value={customerInfo.postalCode}
                                                onChange={(e) => updateField("postalCode", e.target.value)}
                                                placeholder="75001"
                                                className={inputClasses}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="country" className={labelClasses}>
                                            Country *
                                        </label>
                                        <select
                                            id="country"
                                            value={customerInfo.country}
                                            onChange={(e) => updateField("country", e.target.value)}
                                            className={inputClasses}
                                            required
                                        >
                                            {COUNTRIES.map((c) => (
                                                <option key={c} value={c}>
                                                    {c}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Order Summary */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {items.map((item, index) => (
                                            <div key={`${item.product.id}-${item.variant}-${index}`} className="flex justify-between items-start">
                                                <div className="flex gap-4">
                                                    <img
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        className="h-16 w-16 object-cover rounded-md"
                                                    />
                                                    <div>
                                                        <h3 className="font-medium text-gray-900 dark:text-gray-100">{item.product.name}</h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Variant: {item.variant}</p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                                                        {item.addPackingVideo && (
                                                            <p className="text-xs text-pink-500">+ Packing Video</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="font-medium">
                                                    €{((item.product.variants?.find(v => v.name === item.variant)?.price ?? item.product.price) * item.quantity + (item.addPackingVideo ? 7 * item.quantity : 0)).toFixed(2)}
                                                </p>
                                            </div>
                                        ))}
                                        <Separator className="my-4" />
                                        <div className="flex justify-between font-bold text-lg">
                                            <span>Total</span>
                                            <span>€{totalPrice.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column: Payment Form */}
                        <div>
                            <div className="lg:sticky lg:top-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Payment Details</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {clientSecret ? (
                                            <Elements options={options as any} stripe={getStripe()}>
                                                <CheckoutForm customerInfo={customerInfo} />
                                            </Elements>
                                        ) : (
                                            items.length > 0 ? (
                                                <div className="flex justify-center p-8">
                                                    <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
                                                </div>
                                            ) : (
                                                <div className="text-center py-8">
                                                    <p className="text-gray-500 mb-4">Your cart is empty.</p>
                                                    <Button onClick={() => setLocation("/catalog")}>Go to Catalog</Button>
                                                </div>
                                            )
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
