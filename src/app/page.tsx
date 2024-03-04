import Link from "next/link";
import { Typography } from "~/components/ui/typography";
import { db } from "~/server/db";

export default async function HomePage() {
  const posts = await db.post.findFirst();

  console.log(posts?.name);

  return (
    <div>
      <Typography variant="text">testing {posts?.name}</Typography>
    </div>
  );
}
