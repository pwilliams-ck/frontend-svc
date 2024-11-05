import { CardWrapper } from "@/components/card-wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const LoginLanding = () => {
  return (
    <CardWrapper
      headerLabel="A simple web interface for Cloudkey microservices"
      backButtonLabel="About Cloudkey"
      backButtonHref="cloudkey.io"
    >
      <div className="flex justify-between my-4">
        <p>Cloudkey power admin microservice tools & testing 🚀</p>
        <Link href="/tools">
          <Button className="mt-1 ml-auto" size="lg">
            Let&apos;s Go
          </Button>
        </Link>
      </div>
    </CardWrapper>
  );
};