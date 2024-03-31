import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "~/server/db";

const customerAdditionPOSTReqType = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  mobile: z.string(),
  location: z.string(),
  organisationId: z.string(),
  domain: z.string(),
  userId: z.string(),
});

export const POST = async (request: NextRequest) => {
  const body: z.infer<typeof customerAdditionPOSTReqType> = await request
    .json()
    .then((data: z.infer<typeof customerAdditionPOSTReqType>) => data);

  if (!body) {
    return new NextResponse(
      JSON.stringify({ message: "Please provide something to search for" }),
      { status: 400 },
    );
  }

  await db.customer.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      location: body.location,
      email: body.email,
      organisation: {
        connect: { id: body.organisationId },
      },
      mobile: body.mobile,
      User: {
        connect: { id: body.userId },
      },
    },
  });

  return new NextResponse(JSON.stringify({ message: "success" }), {
    status: 200,
  });
};

export const GET = async () => {
  return new NextResponse(JSON.stringify({ answer: "John Doe" }), {
    status: 200,
  });
};
