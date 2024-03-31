import React from "react";
import CustomerDataTable from "./(components)/CustomerDataTable";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const EditCustomerPage = async ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  return (
    <div className="px-[2.5vw]">
      <CustomerDataTable searchParams={searchParams} />
    </div>
  );
};

export default EditCustomerPage;
