import Link from "next/link";
import Image from "next/image";

import ckLogo from "../../public/ck-logo-x-color.png";

export function CkLogo() {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 p-2 hidden md:flex">
        <Image
          src={ckLogo}
          alt="SwanMon Logo"
          height={160}
          width={160}
          priority
        />
      </div>
    </Link>
  );
}
