
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/contexts/ThemeContext";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a placeholder key. You should replace it with your actual publishable key.
const stripePromise = loadStripe("pk_test_51HG7sLIsLd0s3rJ7X7X7X7X7X7X7X7X7X7X7X7X7X7X7X7X7X7X7X7X7X7X7X7");

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { clearCart, totalPrice } = useCart();
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
                    setMessage("Payment succeeded!");
                    clearCart();
                    toast.success("Payment successful! Thank you for your order.");
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
    }, [stripe, clearCart]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/checkout`,
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
                    `Pay $${totalPrice.toFixed(2)}`
                )}
            </Button>
            {message && <div id="payment-message" className="text-sm text-red-500 mt-2">{message}</div>}
        </form>
    );
}

export default function Checkout() {
    const [clientSecret, setClientSecret] = useState("");
    const { items, totalPrice } = useCart();
    const [, setLocation] = useLocation();
    const { theme } = useTheme();

    useEffect(() => {
        if (items.length === 0) {
            // If cart is empty, redirect to catalog
            // But maybe user is coming back from payment?
            // Let's check query params for payment_intent_client_secret
            const params = new URLSearchParams(window.location.search);
            if (!params.get("payment_intent_client_secret")) {
                // setLocation("/catalog");
            }
            // If items are 0 but we have payment_intent, we might want to show success message which is handled in CheckoutForm
            // However, items are from context, which might be cleared or persisted.
            // For now, let's just proceed.
        }

        // Create PaymentIntent as soon as the page loads
        // Only if we have items and no clientSecret yet
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
                .catch((error) => console.error("Error:", error));
        }
    }, [items, clientSecret]);

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

    return (
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
                    {/* Order Summary */}
                    <div className="space-y-8">
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
                                                ${((item.product.variants?.find(v => v.name === item.variant)?.price ?? item.product.price) * item.quantity + (item.addPackingVideo ? 7 * item.quantity : 0)).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                    <Separator className="my-4" />
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>${totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Payment Form */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {clientSecret ? (
                                    <Elements options={options as any} stripe={stripePromise}>
                                        <CheckoutForm />
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
    );
}
