"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { EditIcon, ViewIcon } from "lucide-react";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Typography } from "~/components/ui/typography";

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

const columnsForEmail: ColumnDef<z.infer<typeof customerTableDataType>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row?.getIsSelected()}
        onCheckedChange={(value) => row?.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
];

export default columnsForEmail;
