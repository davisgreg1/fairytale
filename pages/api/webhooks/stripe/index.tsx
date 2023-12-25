import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  const userID = process.env.USERID!;
  if (req.method === "POST") {
    const stripeSignature = req.headers["stripe-signature"] as string;

    let event: Stripe.Event;

    try {
      const body = await buffer(req);
      event = stripe.webhooks.constructEvent(
        body,
        stripeSignature,
        webhookSecret,
      );
    } catch (err) {
      // On error, log and return the error message
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.log(`❌ Error message: ${errorMessage}`);
      res.status(400).send(`Webhook Error: ${errorMessage}`);
      return;
    }

    // Successfully constructed event
    console.log("✅ Success:", event.id);

    // Cast event data to Stripe object
    if (event.type === "payment_intent.succeeded") {
      const stripeObject: Stripe.PaymentIntent = event.data
        .object as Stripe.PaymentIntent;
      console.log(`💰 PaymentIntent status: ${stripeObject.status}`);
    } else if (event.type === "charge.succeeded") {
      const charge = event.data.object as Stripe.Charge;
      await db
        .update(users)
        .set({
          freeStoriesRemaining: sql`${users.freeStoriesRemaining} + 1`,
        })
        .where(eq(users.id, userID));
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.status(200).send({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const buffer = (req: NextApiRequest) => {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];

    req.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    req.on("error", reject);
  });
};

export default handler;
