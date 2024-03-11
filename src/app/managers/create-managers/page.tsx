import { ArrowRightIcon } from "lucide-react";
import React from "react";
import Breadcrumb from "~/components/custom/breadcrumbs";
import { Typography } from "~/components/ui/typography";
import CreateManagerForm from "./(components)/CreateManagerForm";

const CreateManagersPage = () => {
  return (
    <div className="px-[2.5vw]">
      <Breadcrumb
        homeElement={"home"}
        separator={<ArrowRightIcon size={12} />}
        containerClasses="flex items-center gap-1"
      />
      <div className="mt-4">
        <CreateManagerForm />
      </div>
    </div>
  );
};

export default CreateManagersPage;
