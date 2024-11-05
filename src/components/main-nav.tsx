"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "../../public/ck-logo-x-color.png";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const routes = [
    {
      href: `/`,
      label: (
        <Image
          className="sm:block hidden"
          src={logo}
          alt="CloudKey Platform Logo"
          height={0}
          width={160}
        />
      ),
    },
    {
      href: `/tools`,
      label: "Tools",
      active: pathname === `/tools`,
    },
    {
      href: `/testing`,
      label: "Testing",
      active: pathname === `/testing`,
    },
    {
      href: `/microservices`,
      label: "Microservices",
      active: pathname === `/microservices`,
    },
    {
      href: `/contact-us`,
      label: "Contact Us",
      active: pathname === `/contact-us`,
    },
  ];

  return (
    <nav
      className={cn("flex items-center space-x-2 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-black",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground",
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
