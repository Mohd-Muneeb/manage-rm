import React from "react";
import { Typography } from "~/components/ui/typography";
import SendEmailDialog from "./(components)/SendEmailDialog";
import { type Customer } from "@prisma/client";
import { env } from "~/env";
import { Button } from "~/components/ui/button";
import Link from "next/link";

const DashboardPage = async ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  return (
    <div className="px-[2.5vw]">
      <Typography>Welcome to dashboard</Typography>

      <div className="mt-4 rounded-lg border px-4 py-4">
        <Typography className="font-semibold underline" variant="h3">
          Start communicating
        </Typography>

        <Typography variant="text">
          Sending mass emails and messages presents a powerful opportunity to
          foster meaningful connections and engage with a wide audience in a
          positive and impactful manner. With the ability to reach numerous
          individuals simultaneously, organizations can efficiently disseminate
          important information, share updates, and promote their products or
          services. Mass communication platforms enable businesses to tailor
          their messages to specific target demographics, ensuring relevance and
          resonance. Moreover, by employing personalized and compelling content,
          such as tailored offers or valuable insights, companies can enhance
          customer relationships and loyalty. Through strategic mass emailing
          and messaging, businesses can amplify their brand presence, nurture
          leads, and ultimately drive growth, all while providing value and
          enriching the recipient&apos;s experience. Thus, embracing mass
          communication channels represents a proactive approach to fostering
          connection, driving engagement, and achieving business objectives in a
          positive and impactful manner.
        </Typography>
        <div className="mt-4 flex w-full gap-4">
          <Button asChild>
            <Link href={"/dashboard/send-email"}>Send Email</Link>
          </Button>
          <Button asChild>
            <Link href={"/dashboard/send-email"}>Send SMS</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
