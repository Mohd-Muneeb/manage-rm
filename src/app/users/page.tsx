import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { getLocationName } from "~/lib/utils";
import { UsersIcon } from "lucide-react";
import { Typography } from "~/components/ui/typography";
import CreateCustomer from "./(components)/CreateCustomer";
import ClientButton from "~/components/client/ClientButton";
import { User } from "@prisma/client";
import CreateCustomerFromCSV from "./(components)/CreateCustomerFromCSV";

const UsersPage = async () => {
  const session = await getServerAuthSession()
    .then((data) => data)
    .catch((err) => console.error(err));

  const user = await db.user.findFirst({
    where: {
      id: session?.user.id,
    },
  });

  console.log(user?.organisationId);

  return (
    <div className="px-[2.5vw]">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Users</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <h1 className="mt-4">
        Showing customers for the location{" "}
        {(await getLocationName(user?.location)) ?? ""}
      </h1>
      <br />
      <div className="flex gap-6">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Create Customers</CardTitle>
            <CardDescription>
              Add new customers to your location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateCustomer user={user} />
          </CardContent>
        </Card>

        <Card className="w-96">
          <CardHeader>
            <CardTitle>Manage Customers</CardTitle>
            <CardDescription>
              Manage existing customers in your location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ClientButton path="/users/edit-customer">
              <div className="flex items-center gap-2">
                <UsersIcon size={16} />
                <Typography>{"Manage"}</Typography>
              </div>
            </ClientButton>
          </CardContent>
        </Card>
      </div>{" "}
    </div>
  );
};

export default UsersPage;
