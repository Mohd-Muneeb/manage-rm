import { ArrowRightIcon } from "lucide-react";
import React from "react";
import Breadcrumb from "~/components/custom/breadcrumbs";
import { Typography } from "~/components/ui/typography";

const CreateManagersPage = () => {
  return (
    <div>
      <Breadcrumb
        homeElement={"home"}
        separator={<ArrowRightIcon size={12} />}
        containerClasses="flex items-center gap-1"
      />
    </div>
  );
};

export default CreateManagersPage;
