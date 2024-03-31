import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Typography } from "~/components/ui/typography";
import { getServerAuthSession } from "~/server/auth";

export default async function HomePage() {
  const session = await getServerAuthSession()
    .then((data) => data)
    .catch((err) => console.error(err));

  return (
    <div className="flex h-[90vh] items-center justify-center px-[2.5vw]">
      <div className="flex w-full flex-col items-center justify-center space-y-4">
        <div className="w-[70%]">
          <Typography variant="h1">ManageRM</Typography>
          <br />
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            quis facilis sapiente reprehenderit eius assumenda cum dolore odit
            beatae animi est facere, placeat nemo expedita porro veniam ipsam
            doloribus temporibus!
          </Typography>
          <br />
          {!!session?.user ? (
            <Button asChild variant={"outline"}>
              <Link className="" href={"/dashboard"}>
                Dashboard
              </Link>
            </Button>
          ) : (
            <Button asChild>
              <Link className="" href={"/api/auth/signin"}>
                Sign In
              </Link>
            </Button>
          )}
        </div>
      </div>
      <div className="relative h-[400px] w-full">
        <Image src={"Communication.svg"} fill alt="Home page image" />
      </div>
    </div>
  );
}
