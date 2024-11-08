"use server";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

export interface VCloudSession {
  token: string;
  vcdHost: string;
}

export interface ProviderSession {
  id: string;
  user: {
    name: string;
    id: string;
  };
  org: {
    name: string;
    id: string;
  };
  locationId: string;
  roles: string[];
  rightsCategories: string[];
  token: string;
}

export interface ApiError extends Error {
  status?: number;
  response?: Response;
}

const vcdUser = process.env.VCD_USER;
const vcdPW = process.env.VCD_PW;
const vcdHost = process.env.VCD_HOST;
const vcdApiVersion = process.env.VCD_VERSION;

export async function createProviderSession(): Promise<string> {
  if (!vcdUser || !vcdPW || !vcdHost || !vcdApiVersion) {
    throw new Error("Missing required environment variables");
  }

  const authString = Buffer.from(`${vcdUser}@system:${vcdPW}`).toString(
    "base64",
  );

  const response = await fetch(`${vcdHost}/cloudapi/1.0.0/sessions/provider`, {
    method: "POST",
    headers: {
      Accept: `application/json;version=${vcdApiVersion}`,
      "Content-Type": "application/json",
      Authorization: `Basic ${authString}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const token = response.headers.get("X-VMWARE-VCLOUD-ACCESS-TOKEN");
  if (!token) {
    throw new Error("No access token received");
  }

  return token;
}
