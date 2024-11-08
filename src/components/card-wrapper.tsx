"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Header } from "@/components/header";
import { BackButton } from "@/components/back-button";

type CardWrapperProps = {
  children: React.ReactNode;
  heading: string;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
};

export const CardWrapper = ({
  children,
  heading,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md bg-white/45 dark:bg-black/45">
      <CardHeader>
        <div className="flex">
          <Header heading={heading} label={headerLabel} />
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && <CardFooter></CardFooter>}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
