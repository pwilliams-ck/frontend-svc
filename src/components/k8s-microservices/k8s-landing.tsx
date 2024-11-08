import { CardWrapper } from "@/components/card-wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const K8sLanding = () => {
  return (
    <CardWrapper
      heading="k8s Testing"
      headerLabel="A simple web interface for testing k8s microservices."
      backButtonLabel="About Cloudkey"
      backButtonHref="https://cloudkey.io"
    >
      <div className="flex justify-between my-4">
        <p className="pr-2">
          Check out our VCD tools while we build our kubernetes cluster 🚧🚧
        </p>
        <Link href="/vcd-tools">
          <Button className="mt-1 ml-auto" size="lg">
            Tools
          </Button>
        </Link>
      </div>
    </CardWrapper>
  );
};
