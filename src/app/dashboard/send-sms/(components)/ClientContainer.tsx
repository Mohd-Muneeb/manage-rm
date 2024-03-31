"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "~/components/ui/separator";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { CustomerMessageDataTable } from "../../(components)/CustomerMessageDataTable";
import { Progress } from "~/components/ui/progress";
import { Typography } from "~/components/ui/typography";
import { Customer } from "@prisma/client";
import { Button } from "~/components/ui/button";
import { toast, useToast } from "~/components/ui/use-toast";
import { User } from "next-auth";

function TableDemo({ user }: { user: User | null }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Full Name</TableCell>
          <TableCell>{user?.name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Email</TableCell>
          <TableCell>{user?.email}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Role</TableCell>
          <TableCell>{user?.role}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Domain</TableCell>
          <TableCell>{user?.domain}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

const ClientContainer = ({
  customerData,
  user,
}: {
  customerData: Customer[];
  user: User | null;
}) => {
  const [progress, setProgress] = useState<number>(1);
  const [message, setMessage] = useState<string>("");
  const [selectedEmails, setSelectedEmails] = useState({});
  const [selectedEmailArray, setSelectedEmailArray] = useState([]);

  useEffect(() => {
    const idxArray = Object.keys(selectedEmails).map((elem) => parseInt(elem));

    setSelectedEmailArray(idxArray.map((elem) => customerData[elem]?.mobile));
  }, [selectedEmails]);

  const handlerSubmit = async () => {
    await fetch("/api/services/send-sms", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        to: selectedEmailArray,
        from: "917093724750",
        text: message,
      }),
    })
      .then((data) => toast({ description: "Email Sent" }))
      .catch((err) => toast({ description: "Error occured" }));
  };

  return (
    <>
      <div className="flex w-full items-center justify-center">
        <Progress className={"w-[50%]"} value={progress} />
      </div>
      <Separator />
      <div className="flex h-[40vh] gap-6">
        <div className="flex w-full flex-col justify-between">
          <Typography variant="h2" className="text-center">
            You are logged in as the following
          </Typography>
          <TableDemo user={user} />
        </div>
        <Separator orientation="vertical" />
        <div className="w-full space-y-3 overflow-hidden p-4">
          <Typography className="underline">
            Enter the message to be sent
          </Typography>
          <Label>Message</Label>
          <Textarea
            onChange={(e) => {
              if (e.target.value !== "") {
                setProgress((prev) => prev + 50);
              } else {
                setProgress((prev) => prev - 50);
              }
              setMessage(e.target.value);
            }}
            placeholder="Enter Subject here"
            className="mb-5 h-52"
          />
          <div className="mt-4 flex w-full justify-end"></div>
        </div>
      </div>
      <Separator />
      <div>
        <CustomerMessageDataTable
          rowSelection={selectedEmails}
          setRowSelection={setSelectedEmails}
          data={customerData}
        />
        <Separator />
        <div className="mt-4 flex w-full items-end justify-end">
          <Button onClick={handlerSubmit}>Send SMS plese</Button>
        </div>
      </div>
    </>
  );
};

export default ClientContainer;
