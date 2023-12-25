"use client";

import type { StripeError } from "@stripe/stripe-js";
import * as React from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";
import { updateFreeStoriesRemaining } from "@/server/actions";

import { formatAmountForDisplay } from "@/utils/stripeHelpers";
import * as config from "@/config";
import getStripe from "@/utils/getStripe";
import { createCheckoutSession, createPaymentIntent } from "@/server/actions";
import { ChildContext } from "@/contexts/childContext";
import { useSession } from "next-auth/react";

function CheckoutForm(): JSX.Element {
  const { name, age, gender, story } = React.useContext(ChildContext);
  const [paymentType, setPaymentType] = React.useState<string>("");
  const [payment, setPayment] = React.useState<{
    status: "initial" | "processing" | "error" | "succeeded";
  }>({ status: "initial" });
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const [input, setInput] = React.useState<{
    cardholderName: string;
    purchasePrice: number;
  }>({
    cardholderName: "",
    purchasePrice: 1,
  });
  const { data: session } = useSession();
  const userId = session?.user.id;

  const stripe = useStripe();
  const elements = useElements();

  const PaymentStatus = ({ status }: { status: string }) => {
    switch (status) {
      case "processing":
      case "requires_payment_method":
      case "requires_confirmation":
        return <h2>Processing...</h2>;

      case "requires_action":
        return <h2>Authenticating...</h2>;

      case "succeeded":
        return <h2>Payment Succeeded 🥳</h2>;

      case "error":
        return (
          <>
            <h2>Error 😭</h2>
            <p className="error-message">{errorMessage}</p>
          </>
        );

      default:
        return null;
    }
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });

    elements?.update({ amount: input.purchasePrice * 100 });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();
      // Abort if form isn't valid
      if (!e.currentTarget.reportValidity()) return;
      if (!elements || !stripe) return;

      setPayment({ status: "processing" });

      const { error: submitError } = await elements.submit();

      if (submitError) {
        setPayment({ status: "error" });
        setErrorMessage(submitError.message ?? "An unknown error occurred");

        return;
      }

      // Create a PaymentIntent with the specified amount.
      const { client_secret: clientSecret } = await createPaymentIntent(
        new FormData(e.target as HTMLFormElement),
      );

      // Use your card Element with other Stripe.js APIs
      const { error: confirmError } = await stripe!.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/story`, // The URL to redirect to on successful confirmation
          payment_method_data: {
            billing_details: {
              name: input.cardholderName,
            },
          },
        },
      });
      updateFreeStoriesRemaining("inc", userId);

      if (confirmError) {
        setPayment({ status: "error" });
        setErrorMessage(confirmError.message ?? "An unknown error occurred");
      }
    } catch (err) {
      const { message } = err as StripeError;

      setPayment({ status: "error" });
      setErrorMessage(message ?? "An unknown error occurred");
    }
  };

  return (
    <>
      <form action={createCheckoutSession} onSubmit={handleSubmit}>
        <input name="purchasePrice" type="hidden" value={1} />
        <fieldset className="elements-style">
          <legend>Your Payment Details:</legend>
          {paymentType === "card" ? (
            <input
              placeholder="Cardholder Name"
              className="elements-style"
              type="Text"
              name="cardholderName"
              onChange={handleInputChange}
              required
            />
          ) : null}
          <div className="FormRow elements-style">
            <PaymentElement
              onChange={(e) => {
                setPaymentType(e.value.type);
              }}
            />
          </div>
        </fieldset>
        <button
          className="elements-style-background"
          type="submit"
          disabled={
            !["initial", "succeeded", "error"].includes(payment.status) ||
            !stripe
          }>
          {payment.status === "processing"
            ? `Purchasing fairy tale...`
            : `Purchase for ${formatAmountForDisplay(1, config.CURRENCY)}`}
        </button>
      </form>
    </>
  );
}

export default function ElementsForm(): JSX.Element {
  return (
    <Elements
      stripe={getStripe()}
      options={{
        appearance: {
          variables: {
            colorIcon: "#6772e5",
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
          },
        },
        currency: config.CURRENCY,
        mode: "payment",
        amount: 100,
      }}>
      <CheckoutForm />
    </Elements>
  );
}
