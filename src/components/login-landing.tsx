import { CardWrapper } from "@/components/card-wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const LoginLanding = () => {
  return (
    <CardWrapper
      heading="Microservice Hub"
      headerLabel="A simple web interface for CloudKey Platform microservices and tools."
      backButtonLabel="About Cloudkey"
      backButtonHref="https://cloudkey.io"
    >
      <div className="flex justify-between my-4">
        <p>
          The CloudKey Platform tools and deployment suite ensures your
          services... serve 🚀
        </p>
        <Link href="/vcd-tools">
          <Button className="mt-1 ml-auto" size="lg">
            Let&apos;s Go
          </Button>
        </Link>
      </div>
    </CardWrapper>
  );
};
