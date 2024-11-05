import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ReactNode } from "react";

type AlertPopupProps = {
  title: string;
  description: string;
  icon: ReactNode;
};

export const AlertPopup = ({ title, description, icon }: AlertPopupProps) => {
  return (
    <Alert className="my-12 w-42 bg-white/45 dark:bg-black/45 shadow-md">
      {icon}
      <AlertTitle className="ml-2">{title}</AlertTitle>
      <AlertDescription className="ml-2">{description}</AlertDescription>
    </Alert>
  );
};
