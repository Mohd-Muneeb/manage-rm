import React from "react";
import { z } from "zod";
import { DataTable } from "./DataTable";
import columns from "./TableComponents/CustomerDataTableColumns";
const res = await import("~/app/api/customer/route");

const CustomerDataTable = async () => {
  const dataBasedOnLocation = await (await res.GET()).json();

  console.log("asd", dataBasedOnLocation);

  return (
    <div className="py-10">
      <DataTable columns={columns} data={dataBasedOnLocation.data} />
    </div>
  );
};

export default CustomerDataTable;
