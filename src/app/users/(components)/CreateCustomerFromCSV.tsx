"use client";

import { User } from "@prisma/client";
import Link from "next/link";
import React, { useRef } from "react";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Typography } from "~/components/ui/typography";

const CreateCustomerFromCSV = ({ user }: { user: User | null }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  console.log(user?.id, user?.domain, user?.email?.split("@")[1]);
  const handleOnClick = () => {
    if (!inputRef?.current) return null;

    const fileInput: HTMLInputElement | null = inputRef.current; // Replace with your HTML element ID
    const file = fileInput?.files?.[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("organisationId", user?.organisationId ?? "");
    formData.append("userId", user?.id ?? "");
    formData.append("domain", `${user?.email?.split("@")[1]}`);

    fetch("/api/customer/add-via-csv", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex flex-col py-8">
      <Typography>
        Upload a CSV having{" "}
        <Typography variant="code">less than 200 entries</Typography> in the
        <Link className="pl-1 underline" href={"/"}>
          format
        </Link>
      </Typography>

      <div className="mt-4 flex w-full justify-between gap-8">
        <Input type="file" accept=".csv" ref={inputRef} id="fileInput" />
        <Button onClick={handleOnClick}>Upload</Button>
      </div>
    </div>
  );
};

export default CreateCustomerFromCSV;
