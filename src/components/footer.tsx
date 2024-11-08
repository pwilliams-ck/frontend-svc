import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CkLogo } from "@/components/ck-logo";

export function Footer() {
  return (
    <div className="fixed bottom-0 w-full p-4 pb-8 flex">
      <div className="mx-auto flex items-center w-full justify-between">
        <CkLogo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full pr-64">
          <Link href="/">
            <Button>Privacy Policy</Button>
          </Link>
          <Link href="/">
            <Button>Terms of Service</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
