import Link from "next/link";
import { Typography } from "~/components/ui/typography";
import { db } from "~/server/db";

export default async function HomePage() {
  return (
    <div>
      <Typography variant="text">testing</Typography>
    </div>
  );
}
