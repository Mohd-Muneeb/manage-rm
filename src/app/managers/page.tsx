import React from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Typography } from "~/components/ui/typography";
import BreadCrumbs from "~/components/custom/breadcrumbs";
import { ArrowRightIcon } from "lucide-react";
import ClientButton from "~/components/client/ClientButton";

const ManagersPage = () => {
  return (
    <div>
      <BreadCrumbs
        containerClasses="flex gap-1 items-center"
        homeElement={"Home"}
        separator={<ArrowRightIcon size={12} />}
      />
      <hr className="my-2" />
      <Typography className="mt-0">Add or view managers here</Typography>
      <div className="mt-4 flex gap-12">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Create Manager</CardTitle>
            <CardDescription>Add new manager</CardDescription>
          </CardHeader>

          <CardContent>
            <ClientButton path="/managers/create-managers">
              {"Create"}
            </ClientButton>
          </CardContent>
        </Card>
        <Card className="w-96">
          <CardHeader>
            <CardTitle>View Managers</CardTitle>
            <CardDescription>
              View managers and edit their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ClientButton path="/managers/view-managers">View</ClientButton>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManagersPage;
