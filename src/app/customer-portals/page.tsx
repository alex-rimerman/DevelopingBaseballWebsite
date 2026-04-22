import type { Metadata } from "next";
import { cookies } from "next/headers";
import PortalHubClient from "./PortalHubClient";
import { buildPortalCards, portalHubSecretConfigured } from "@/lib/customer-portals";

export const metadata: Metadata = {
  title: "My Portals | Developing Baseball",
  description: "Launch your Developing Baseball Shiny dashboards for your organization.",
};

const COOKIE_NAME = "portal_hub";
const COOKIE_VALUE = "1";

export default async function CustomerPortalsPage() {
  const store = await cookies();
  const unlocked = store.get(COOKIE_NAME)?.value === COOKIE_VALUE;
  const requireUnlock = portalHubSecretConfigured();
  const includeUrls = !requireUnlock || unlocked;

  return (
    <PortalHubClient
      portals={buildPortalCards(includeUrls)}
      requireUnlock={requireUnlock}
      initiallyUnlocked={unlocked}
    />
  );
}
