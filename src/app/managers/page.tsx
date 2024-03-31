import React from "react";
import { getServerAuthSession } from "~/server/auth";
import CustomerEditDataTable from "./(component)/CustomerEditDataTable";
import { env } from "~/env";
import { type User } from "@prisma/client";

const ManagersPage = async () => {
  const user = await getServerAuthSession();

  const managerData = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/managers`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      managerId: user?.user.domain ?? "",
    },
  })
    .then(async (data) => await data.json())
    .then((data: User[]) => data);

  console.log(managerData);

  return (
    <main className="px-[2.5vw]">
      <div className="mt-4">
        <CustomerEditDataTable data={managerData} />
      </div>
    </main>
  );
};

export default ManagersPage;
