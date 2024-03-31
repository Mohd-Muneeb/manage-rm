import React from "react";
import { DataTable } from "./DataTable";
import columns from "./TableComponents/CustomerDataTableColumns";
import { type Customer } from "@prisma/client";
import { env } from "~/env";
import { getServerAuthSession } from "~/server/auth";

const CustomerDataTable = async ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const pageNo = searchParams.pageNo
    ? `page=${JSON.stringify(searchParams.pageNo)}`
    : "";
  const location = searchParams.location
    ? `&location=${JSON.stringify(searchParams.location)}`
    : "";
  const email = searchParams.email
    ? `&email=${JSON.stringify(searchParams.email)}`
    : "";

  const session = await getServerAuthSession();

  const customerData = await fetch(
    `${env.NEXT_PUBLIC_BASE_URL}/api/customer?${pageNo}${location}${email}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        manager: session?.user.id ?? "",
      },
    },
  )
    .then(async (data) => {
      const output = await data.json();
      return output;
    })
    .then((data) => {
      return data?.data;
    })
    .then((data: Customer[]) => {
      return data;
    })
    .catch((err) => console.error(err));

  return (
    <div className="py-10">
      <DataTable columns={columns} data={customerData} />
    </div>
  );
};

export default CustomerDataTable;
