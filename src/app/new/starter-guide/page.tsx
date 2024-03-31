import * as React from "react";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
const res = await import("~/app/api/organisation/route");
import CreateOrganisationForm from "./(components)/CreateOrganisationForm";

const getOrganisationExists = async (domain: string) => {
  const data = await (
    await res.GET({
      body: {
        domain: domain,
      },
    })
  ).json();

  return data.isAvailable;
};

const StarterPage = async () => {
  const user = await getServerAuthSession();

  if (!user) return null;

  if (await getOrganisationExists(user.user.domain)) {
    redirect("/dashboard");
  } else {
    return (
      <div>
        <CreateOrganisationForm user={user.user} />
      </div>
    );
  }
};

export default StarterPage;
