import { type NextRequest, NextResponse } from "next/server";
import { Vonage } from "@vonage/server-sdk";
import { env } from "~/env";

export const POST = async (req: NextRequest) => {
  const vonage = new Vonage({
    apiKey: env.VONAGE_SMS_API_PUBLIC,
    apiSecret: env.VONAGE_SMS_API_SECRET,
  });

  const { to, from, text } = await req.json();

  console.log(to[0]?.slice(1), from, text);

  try {
    for (let i = 0; i < to?.length; i++) {
      const toUser = to?.[i]?.slice(1);

      await vonage.sms
        .send({ to: toUser, from, text })
        .then((resp) => {
          console.log("Message sent successfully");
          console.log(resp);
        })
        .catch((err) => {
          throw new Error("Parameter is not a number!");
        });
    }
    return NextResponse.json({
      message: "Success",
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({
      message: "Failed",
      status: 500,
    });
  }
};
