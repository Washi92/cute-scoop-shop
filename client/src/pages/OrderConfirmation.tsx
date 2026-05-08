import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useCart, type CompletedOrder } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Package, Mail, MapPin, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function OrderConfirmation() {
  const { getLastOrder } = useCart();
  const [order, setOrder] = useState<CompletedOrder | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const lastOrder = getLastOrder();
    if (lastOrder) {
      setOrder(lastOrder);
    }
  }, [getLastOrder]);

  if (!order) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
          <Card className="max-w-md w-full text-center">
            <CardContent className="pt-8 pb-8">
              <span className="text-5xl block mb-4">🍨</span>
              <h2
                className="text-xl font-bold mb-2"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                No order found
              </h2>
              <p className="text-muted-foreground mb-6">
                It looks like you haven't placed an order yet.
              </p>
              <Button onClick={() => setLocation("/catalog")}>
                <ShoppingBag className="mr-2 h-4 w-4" />
                Browse Products
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </>
    );
  }

  const formattedDate = new Date(order.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Banner */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h1
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              Thank you for your order! 🎉
            </h1>
            <p className="text-lg text-muted-foreground">
              Your scoops are being prepared with love!
            </p>
          </div>

          {/* Order ID & Date */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p
                    className="text-lg font-bold text-primary"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    {order.orderId}
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {formattedDate}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => {
                    const variantData = item.product.variants?.find(
                      (v) => v.name === item.variant
                    );
                    const unitPrice = variantData?.price ?? item.product.price;
                    const lineTotal =
                      (unitPrice + (item.addPackingVideo ? 7 : 0)) * item.quantity;

                    return (
                      <div
                        key={`${item.product.id}-${item.variant}-${index}`}
                        className="flex justify-between items-start gap-4"
                      >
                        <div className="flex gap-3">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-14 w-14 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                              {item.product.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {item.variant} × {item.quantity}
                            </p>
                            {item.addPackingVideo && (
                              <p className="text-xs text-pink-500">
                                + Packing Video
                              </p>
                            )}
                          </div>
                        </div>
                        <p className="font-medium text-sm whitespace-nowrap">
                          €{lineTotal.toFixed(2)}
                        </p>
                      </div>
                    );
                  })}
                  <Separator className="my-4" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Paid</span>
                    <span className="text-primary">
                      €{order.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Delivery Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {order.customerInfo.fullName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Mail className="h-3 w-3" /> Email
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {order.customerInfo.email}
                  </p>
                </div>
                {order.customerInfo.phone && (
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {order.customerInfo.phone}
                    </p>
                  </div>
                )}
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Shipping Address
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {order.customerInfo.address}
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {order.customerInfo.postalCode} {order.customerInfo.city}
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {order.customerInfo.country}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Confirmation email notice */}
          <div className="mt-8 text-center p-6 bg-kawaii-blush/30 dark:bg-gray-800 rounded-2xl">
            <p className="text-sm text-muted-foreground mb-1">
              📧 A confirmation email will be sent to{" "}
              <strong className="text-gray-900 dark:text-gray-100">
                {order.customerInfo.email}
              </strong>
            </p>
            <p className="text-xs text-muted-foreground">
              If you have any questions, contact us at{" "}
              <a
                href="mailto:hello@cutescoopshop.com"
                className="text-primary hover:underline"
              >
                hello@cutescoopshop.com
              </a>
            </p>
          </div>

          {/* Continue Shopping */}
          <div className="mt-8 text-center">
            <Button
              size="lg"
              onClick={() => setLocation("/catalog")}
              className="px-8"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
