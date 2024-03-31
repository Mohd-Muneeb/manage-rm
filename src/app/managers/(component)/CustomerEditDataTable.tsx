import React from "react";
import { DataTable } from "./DataTable";
import { User } from "@prisma/client";
import columns from "./columns";

const CustomerEditDataTable = ({ data }: { data: User[] }) => {
  return (
    <div>
      <DataTable columns={columns} data={data.data} />
    </div>
  );
};

export default CustomerEditDataTable;
