import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

import swanMonLogo from "../../public/swanmon-logo-color.png";

export function SwanMonLogo() {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image
          src={swanMonLogo}
          alt="SwanMon Logo"
          height={70}
          width={70}
          priority
        />
        <p className={cn("text-xl text-primary")}>SwanMon</p>
      </div>
    </Link>
  );
}
