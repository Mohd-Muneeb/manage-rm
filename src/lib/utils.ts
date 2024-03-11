import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import locationData from "@/constants/zipcodes.in.json";
import { ZIPCODE_LOCATION_URL } from "~/constants/apiBaseUrls";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PostOffice {
  Name: string;
  Description: string;
  BranchType: string;
  DeliveryStatus: string;
  Taluk: string;
  Circle: string;
  District: string;
  Division: string;
  Region: string;
  State: string;
  Country: string;
}

interface PostOfficeResponse {
  Message: string;
  Status: string;
  PostOffice: PostOffice[];
}

export async function getLocationName(
  zipcode: string | undefined,
): Promise<string> {
  if (typeof zipcode !== "string") {
    return "Invalid location";
  }

  const locationData: PostOfficeResponse = await fetch(
    `${ZIPCODE_LOCATION_URL}/${zipcode}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    },
  )
    .then((data) => data.json())
    .then((data: PostOfficeResponse) => data);

  console.log();

  return locationData.PostOffice?.[0]?.Name ?? "Unavailable";
}
