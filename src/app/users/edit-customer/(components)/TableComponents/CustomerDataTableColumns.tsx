"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { EditIcon, ViewIcon } from "lucide-react";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Typography } from "~/components/ui/typography";
import EditUserModal from "../EditUserModal";

const customerTableDataType = z.object({
  firstName: z.string(),
  id: z.string(),
  lastName: z.string(),
  email: z.string(),
  mobile: z.string(),
  location: z.string().optional(),
  emailRecieved: z.number(),
  smsRecieved: z.number(),
  countryCode: z.string(),
  phoneRecieved: z.number(),
  isEmailSubscribed: z.boolean(),
});

const columns: ColumnDef<z.infer<typeof customerTableDataType>>[] = [
  {
    accessorFn: (row) => {
      return `${row.firstName} ${row.lastName}`;
    },
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorFn: (row) => {
      return `${row.mobile}`;
    },
    header: "Mobile",
  },
  {
    accessorFn: (row) => row,
    header: "Email Subscribed",
    cell(props) {
      return <div>{props.getValue().isEmailSubscribed ? "Yes" : "No"}</div>;
    },
  },
  {
    accessorFn: (row) => row,
    header: "SMS Subscribed",
    cell(props) {
      return <div>{props.getValue().isEmailSubscribed ? "Yes" : "No"}</div>;
    },
  },
  {
    accessorFn: (row) => row,
    header: "",
    id: "user-modifier-col",
    cell(props) {
      return (
        <div>
          <EditUserModal customer={props.getValue()} user={null} />
        </div>
      );
    },
  },
];

export default columns;
