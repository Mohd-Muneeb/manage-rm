import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { env } from "~/env";

export const POST = async (req: NextRequest) => {
  const { to, subject, text } = await req.json();

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure your email service provider here
    // Example: For Gmail, you can use SMTP transport
    service: "gmail",
    host: "mail.openjavascript.info",
    port: 465,
    secure: true,
    auth: {
      user: env.SMTP_EMAIL,
      pass: env.SMTP_PASSWORD,
    },
  });

  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: env.SMTP_EMAIL,
      to,
      subject,
      text,
    });

    console.log("Email sent:", info.response);

    return NextResponse.json({
      message: "W",
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({
      message: "L",
      status: 300,
    });
  }
};
