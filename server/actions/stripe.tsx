import type { Stripe } from "stripe";

import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { CURRENCY } from "@/config";
import { formatAmountForStripe } from "@/utils/stripeHelpers";
import { stripe } from "@/lib/stripe";

export async function createCheckoutSession(data: FormData): Promise<void> {
  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "pay",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            product: "prod_PEM2SNH0bAhDbf",
            product_data: {
              name: "fairy tale",
            },
            unit_amount: formatAmountForStripe(
              Number(data.get("purchasePrice") as string),
              CURRENCY,
            ),
          },
        },
      ],
      success_url: `${headers().get("origin")}/`,
      cancel_url: `${headers().get("origin")}/`,
    });

  redirect(checkoutSession.url as string);
}

export async function createPaymentIntent(
  data: FormData,
): Promise<{ client_secret: string }> {

  const paymentIntent: Stripe.PaymentIntent =
    await stripe.paymentIntents.create({
      amount: formatAmountForStripe(
        Number(data.get("purchasePrice") as string),
        CURRENCY,
      ),
      automatic_payment_methods: { enabled: true },
      currency: CURRENCY,
    });

  return { client_secret: paymentIntent.client_secret as string };
}
