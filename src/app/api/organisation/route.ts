import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { z } from "zod";

const DataSchema = z.object({
  name: z.string(),
  domain: z.string(),
  desc: z.string(),
  id: z.string(),
});

export type Data = z.infer<typeof DataSchema>;

export const GET = async (req: NextRequest) => {
  const parameters = req.body;
  try {
    const data = await db.organisation.findUniqueOrThrow({
      where: {
        domain: parameters.domain,
      },
    });

    return NextResponse.json({
      isAvailable: data?.id ? true : false,
    });
  } catch (err) {
    return NextResponse.json({
      isAvailable: false,
    });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const data: Data = DataSchema.parse(await req.json());

    await db.organisation.create({
      data: {
        name: data.name,
        domain: data.domain,
        desc: data.desc,
        User: {
          connect: {
            id: data.id,
          },
        },
      },
    });

    await db.user.update({
      where: {
        id: data.id,
      },
      data: {
        role: "admin",
      },
    });

    return NextResponse.json({
      message: "success",
    });
  } catch (err) {
    return NextResponse.json({
      message: "failed",
      status: 300,
    });
  }
};
