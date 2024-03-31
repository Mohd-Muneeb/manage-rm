import React from "react";
import { env } from "~/env";
import { type Customer } from "@prisma/client";
import ClientContainer from "./(components)/ClientContainer";
import { getServerAuthSession } from "~/server/auth";

const SendEmailPage = async ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const session = await getServerAuthSession();

  const pageNo = searchParams.pageNo
    ? `page=${JSON.stringify(searchParams.pageNo)}`
    : "";
  const location = searchParams.location
    ? `&location=${JSON.stringify(searchParams.location)}`
    : "";
  const mobile = searchParams.mobile
    ? `&email=${JSON.stringify(searchParams.mobile)}`
    : "";

  const customerData = await fetch(
    `${env.NEXT_PUBLIC_BASE_URL}/api/customer?${pageNo}${location}${mobile}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        manager: `${session?.user.id}`,
      },
    },
  )
    .then(async (data) => {
      const output = await data.json();
      return output as {
        message: string;
        status: number;
        data: Customer[];
      };
    })
    .then((data) => {
      return data?.data;
    })
    .then((data: Customer[]) => data);

  return (
    <div className="space-y-6 px-[2.5vw] py-6">
      <ClientContainer user={session?.user} customerData={customerData} />
    </div>
  );
};

export default SendEmailPage;
