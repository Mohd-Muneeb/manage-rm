"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { EditIcon, ViewIcon } from "lucide-react";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Typography } from "~/components/ui/typography";
import ManagerEditModal from "./ManagerEditModal";
// import EditUserModal from "../EditUserModal";

const customerTableDataType = z.object({
  name: z.string(),
  email: z.string(),
  domain: z.string(),
  location: z.array(z.string()),
});

const columns: ColumnDef<z.infer<typeof customerTableDataType>>[] = [
  {
    accessorKey: "name",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorFn: (row) => row.createdAt.split("T")[0],
    header: "Created At",
  },
  {
    accessorFn: (row) => row,
    header: "",
    id: "user-modifier-col",
    cell(props) {
      return (
        <div>
          {/* <EditUserModal customer={props.getValue()} user={null} /> */}
          <ManagerEditModal customer={props.getValue()} user={null} />
        </div>
      );
    },
  },
];

export default columns;
