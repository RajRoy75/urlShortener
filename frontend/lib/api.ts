import { LinkData } from "./types";
import { BACKEND_API } from "./constants";

export const fetchLinks = async (): Promise<LinkData[]> => {
  const res = await fetch(BACKEND_API);
  if (!res.ok) throw new Error("Failed to fetch links");
  return res.json();
};

export const createLink = async (targetUrl: string): Promise<LinkData> => {
  const res = await fetch(BACKEND_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ target_url: targetUrl }),
  });
  if (!res.ok) throw new Error("Failed to create link");
  return res.json();
};

export const fetchLinkDetails = async (code: string): Promise<LinkData> => {
  // Assuming your backend supports fetching a single link by code
  // If not, you might need to fetch all and find the one matching the code
  const res = await fetch(`${BACKEND_API}/${code}`);
  if (!res.ok) throw new Error("Failed to fetch link details");
  return res.json();
};


export const deleteLink = async (code: string): Promise<void> => {
  const res = await fetch(`${BACKEND_API}/${code}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete link");
};
