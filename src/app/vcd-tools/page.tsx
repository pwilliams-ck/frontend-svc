import { AlertPopup } from "@/components/alert-popup";
import { LucideConstruction } from "lucide-react";
import { OrganizationOverview } from "@/components/vcd-tools/org-overview";
import { getOrganizations } from "@/app/actions/get-orgs";
import { OrgForm } from "@/components/vcd-tools/org-form";
import { DeleteOrgForm } from "@/components/vcd-tools/delete-org-form";
import { OrgAreaChart } from "@/components/vcd-tools/area-chart";

const { values } = await getOrganizations();

export default function VCDToolsPage() {
  return (
    <div className="lg:flex lg:flex-col items-center justify-center pr-16">
      <AlertPopup
        title="Heads up!"
        description="CloudKey Platorm microservices and tools are currently in beta and actively being worked on!"
        icon={<LucideConstruction className="h-6 w-6" />}
      />
      <div className="lg:flex grid gap-4">
        <div className="lg:grid flex gap-4 space-y-4">
          <OrgForm />
          <DeleteOrgForm />
        </div>
        <div className="grid mx-auto">
          <OrganizationOverview organizations={values} />
          <OrgAreaChart />
        </div>
      </div>
    </div>
  );
}
