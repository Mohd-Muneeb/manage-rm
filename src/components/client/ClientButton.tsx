"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

const ClientButton = ({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();

  return <Button onClick={() => router.push(path)}>{children}</Button>;
};

export default ClientButton;
