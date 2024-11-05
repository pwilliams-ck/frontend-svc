import { AlertPopup } from "@/components/alert-popup";
import { LoginLanding } from "@/components/login-landing";
import { LucideConstruction } from "lucide-react";

export default function Home() {
  return (
    <main className="h-full pb-48 flex items-center justify-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#393939_1px,transparent_1px)] [background-size:16px_16px] sm:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
      <div className="flex flex-col items-center">
        <LoginLanding />
        <AlertPopup
          title="Heads up!"
          description="Cloudkey Tools is currently in beta and is actively being worked on!"
          icon={<LucideConstruction className="h-6 w-6" />}
        />
      </div>
    </main>
  );
}
