"use server";

import { z } from "zod";

import { getProviderAdminView } from "@/app/actions/create-org";
import { createProviderSession } from "./get-session";

const apiEndpoint = process.env.VCD_HOST;

async function findOrgIdByName(orgName: string): Promise<string> {
  const adminViewXml = await getProviderAdminView();

  // Simple string parsing since we know the exact format from the API
  const lines = adminViewXml.split("\n");
  const orgLine = lines.find(
    (line) =>
      line.includes("OrganizationReference") &&
      line.includes(`name="${orgName}"`),
  );

  if (!orgLine) {
    throw new Error(`Organization with name "${orgName}" not found`);
  }

  // Extract the org ID from the href
  // Updated regex to match the ID pattern in the href
  const hrefMatch = orgLine.match(/href="[^"]+\/org\/([^"]+)"/);
  if (!hrefMatch || !hrefMatch[1]) {
    throw new Error("Could not extract organization ID");
  }

  return { hrefMatch }; // Returns just the ID: "5ba88f16-504b-466d-925e-52733d6acbe3"
}

export async function deleteOrganization(orgId: string, token: string) {
  const response = await fetch(`${apiEndpoint}/api/admin/org/${orgId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/*;version=39.0",
      Authorization: "Bearer " + token,
    },
  });

  console.log("orgId: ", orgId);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to delete organization: ${text}`);
  }

  return response.status === 204;
}

const deleteOrgSchema = z.object({
  name: z.string().min(1),
});

export async function deleteVCDOrg(formData: z.infer<typeof deleteOrgSchema>) {
  try {
    const parsed = deleteOrgSchema.parse(formData);
    const token = await createProviderSession();

    // Find the org ID from the name
    const orgId = await findOrgIdByName(parsed.name);

    // Delete the organization
    const result = await deleteOrganization(orgId, token);

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error deleting organization:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
