import { type NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

export const GET = async (req: NextRequest) => {
  try {
    const data = await db.user.findMany({
      skip: 0,
      take: 50,
      where: {
        domain: req.headers.get("domain")?.toString() ?? undefined,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Success",
      data: data,
    });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: "Error occured",
    });
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
  } catch (err) {}
};
