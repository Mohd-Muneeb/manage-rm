"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const ClientBreadCrumbs = () => {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <div className="px-[2.5vw]">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          {pathname.split("/").map((path, idx) => {
            if (path === "") return null;

            return (
              <BreadcrumbItem key={idx}>
                <BreadcrumbSeparator />
                <BreadcrumbLink
                  className="capitalize"
                  href={pathname
                    .split("/")
                    .slice(0, idx + 1)
                    .join("/")}
                >
                  {path.split("-").join(" ")}
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default ClientBreadCrumbs;
