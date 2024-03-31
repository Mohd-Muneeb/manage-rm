/* eslint-disable @typescript-eslint/prefer-for-of */
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "~/server/db";

const csvToJSONConverterType = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  mobile: z.string(),
  location: z.string().optional(),
});

function csvJson(csv: string): z.infer<typeof csvToJSONConverterType>[] {
  const lines = csv.split("\n");
  const result: z.infer<typeof csvToJSONConverterType>[] = [];

  let headers: string[] | undefined;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]?.trim();
    if (line) {
      if (!headers) {
        headers = line.split(",");
      } else {
        const currentLine = line.split(",");
        const obj: Record<string, string> = {}; // Define obj as a key-value object with string values
        for (let j = 0; j < headers.length; j++) {
          if (typeof headers[j] === "string") {
            const idx: string = headers[j] ?? "";
            obj[idx] = currentLine?.[j] ?? ""; // Set default value to empty string if the value is undefined
          }
        }
        result.push(csvToJSONConverterType.parse(obj)); // Validate and convert obj to the expected type
      }
    }
  }
  return result;
}

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();

  const file = formData.get("file") as File;
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const json_data = csvJson(buffer.toString());

  const organisationId: string =
    formData.get("organisationId")?.toString() ?? "";
  const userId: string = formData.get("userId")?.toString() ?? "";

  const data = await db.customer
    .createMany({
      data: json_data.map((elem) => {
        return {
          ...elem,
          location: elem.location ?? "500007",
          organisationId: organisationId,
          userId: userId,
        };
      }),
    })
    .then((data) => {
      return NextResponse.json({
        Message: "Success",
        status: 201,
        data: data,
      });
    })
    .catch((err) => {
      return NextResponse.json({
        Message: "Error",
        status: 500,
        data: JSON.stringify(err),
      });
    });

  return data;
};
