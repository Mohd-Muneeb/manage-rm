import { type NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

export const GET = async () => {
  const dataBasedOnLocation = await db.customer.findMany({
    where: {
      location: {
        equals: ["500007"],
      },
    },
  });

  return NextResponse.json({
    Message: "Success",
    status: 200,
    data: dataBasedOnLocation,
  });
};

export const PATCH = async (req: NextRequest) => {
  const { id, ...data } = await req.json();

  try {
    await prisma.customer.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });

    return NextResponse.json({
      Message: "Success",
      status: 201,
    });
  } catch (err) {
    return NextResponse.json({
      Message: "Failed",
      status: 400,
    });
  }
};
