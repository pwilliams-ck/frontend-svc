import { createProviderSession } from "./get-session";

export interface VcdResponse {
  resultTotal: number;
  pageCount: number;
  page: number;
  pageSize: number;
  associations: null;
  values: VCDOrg[];
}

export interface ManagedBy {
  name: string;
  id: string;
}

export interface VCDOrg {
  id: string;
  name: string;
  displayName: string;
  description: string;
  isEnabled: boolean;
  orgVdcCount: number;
  catalogCount: number;
  vappCount: number;
  runningVMCount: number;
  userCount: number;
  diskCount: number;
  managedBy: ManagedBy;
  canManageOrgs: boolean;
  canPublish: boolean;
  maskedEventTaskUsername: string;
  directlyManagedOrgCount: number | null;
}

export async function getOrganizations(): Promise<VcdResponse> {
  try {
    // First get the session
    const token = await createProviderSession();

    // Use the session token to get organizations
    const response = await fetch(
      `${process.env.VCD_HOST}/cloudapi/1.0.0/orgs`,
      {
        method: "GET",
        headers: {
          Accept: "application/json;version=39.0",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch organizations: ${response.statusText}`);
    }

    const data: VcdResponse = await response.json();
    console.log("orgs:", data);
    return data;
  } catch (error) {
    console.error("Error fetching VCloud organizations:", error);
    throw error;
  }
}
