import { type NextRequest, NextResponse } from "next/server";
import { STANDARD_PAGINATION_VALUE } from "~/constants";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export const GET = async (req: NextRequest) => {
  const pageNo = req.nextUrl.searchParams.get("page");
  const location = req.nextUrl.searchParams.get("location");
  const filterEmail = req.nextUrl.searchParams.get("email");
  const filterMobile = req.nextUrl.searchParams.get("mobile");

  // console.log(req.headers.get("manager")?.toString(), "AASdasd");

  const organisationName = await db.user.findUnique({
    where: {
      id: req.headers.get("manager")?.toString(),
    },
    select: {
      organisationId: true,
    },
  });

  const data = await db.customer
    .findMany({
      skip: parseInt(pageNo ?? "0") * STANDARD_PAGINATION_VALUE,
      take: STANDARD_PAGINATION_VALUE,
      where: {
        location: location
          ? {
              equals: location,
            }
          : undefined,
        email: filterEmail
          ? {
              contains: filterEmail,
            }
          : undefined,
        mobile: filterMobile
          ? {
              contains: filterMobile,
            }
          : undefined,
        organisationId: {
          equals: organisationName?.organisationId ?? undefined,
        },
      },
    })
    .then((data) => data)
    .catch((err) => console.error(err));

  return NextResponse.json({
    Message: "Success",
    status: 200,
    data: data,
  });
};

export const PATCH = async (req: NextRequest) => {
  const { id, ...data } = await req.json();

  try {
    await db.customer.update({
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
