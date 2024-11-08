"use server";

import { z } from "zod";
import { createProviderSession } from "./get-session";

const orgSchema = z.object({
  name: z.string().min(1),
});

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

const apiEndpoint = process.env.VCD_HOST;

export const getProviderAdminView = async () => {
  const token = createProviderSession();

  const response = await fetch(`${apiEndpoint}/api/admin`, {
    method: "GET",
    headers: {
      Accept: "application/*;version=39.0",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Response status:", response.status);
    console.error("Response headers:", response.headers);
    throw new Error(
      `Failed to get admin view: ${text} (Status: ${response.status})`,
    );
  }
  return response.text();
};

// Modified createOrganization function to use the admin view
async function createOrganization(name: string, token: string) {
  // Create the organization XML
  const orgXML = `<?xml version="1.0" encoding="UTF-8"?>
<AdminOrg
 xmlns="http://www.vmware.com/vcloud/v1.5"
 name="${name}"
 type="application/vnd.vmware.admin.organization+xml">
 <Description>Example Corporation's Finance Organization</Description>
 <FullName>${name}</FullName>
 <Settings>
   <OrgGeneralSettings>
     <CanPublishCatalogs>false</CanPublishCatalogs>
     <CanPublishExternally>true</CanPublishExternally>
     <CanSubscribe>false</CanSubscribe>
     <DeployedVMQuota>0</DeployedVMQuota>
     <StoredVmQuota>0</StoredVmQuota>
     <UseServerBootSequence>false</UseServerBootSequence>
     <DelayAfterPowerOnSeconds>0</DelayAfterPowerOnSeconds>
   </OrgGeneralSettings>
   <OrgLdapSettings>
     <OrgLdapMode>SYSTEM</OrgLdapMode>
     <CustomUsersOu />
   </OrgLdapSettings>
   <OrgEmailSettings>
     <IsDefaultSmtpServer>true</IsDefaultSmtpServer>
     <IsDefaultOrgEmail>true</IsDefaultOrgEmail>
     <FromEmailAddress />
     <DefaultSubjectPrefix />
     <IsAlertEmailToAllAdmins>true</IsAlertEmailToAllAdmins>
   </OrgEmailSettings>
 </Settings>
</AdminOrg>`;

  // Create the organization
  const response = await fetch(`${apiEndpoint}/api/admin/orgs`, {
    method: "POST",
    headers: {
      Accept: "application/*;version=39.0",
      "Content-Type": "application/vnd.vmware.admin.organization+xml",
      Authorization: "Bearer " + token,
    },
    body: orgXML,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to create organization: ${text}`);
  }

  return response.text();
}

// Modified createVCloudOrg function to include error handling
export async function createVCDOrg(formData: z.infer<typeof orgSchema>) {
  try {
    const parsed = orgSchema.parse(formData);

    // First get the admin view
    const token = await createProviderSession();

    // Then create the organization
    const result = await createOrganization(parsed.name, token);

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error creating organization:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
