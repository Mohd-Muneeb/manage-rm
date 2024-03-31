import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price: "10",
          quantity: 1,
        },
      ],
      mode: "payment",
      return_url: `${req.headers.origin}/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
}

export const GET = async (req) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id,
    );

    NextResponse.json({
      status: session.status,
      customer_email: session.customer_details.email,
    });
  } catch (err) {
    NextResponse.json({ err: err.message });
  }
};
