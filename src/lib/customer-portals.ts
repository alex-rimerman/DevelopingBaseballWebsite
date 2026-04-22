export type PortalDefinition = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  /** Path under /public, or null to show `logoInitials` in the card header */
  logo: string | null;
  logoInitials?: string;
  /** Server-only env key; when unset, `defaultUrl` is used */
  envUrlKey: string;
  defaultUrl: string;
  /**
   * Optional Tailwind classes on the logo image wrapper to normalize visual weight
   * (source files vary in canvas padding and intrinsic size).
   */
  logoClassName?: string;
};

export const PORTAL_DEFINITIONS: PortalDefinition[] = [
  {
    id: "umd",
    title: "UMD Portal",
    subtitle: "University of Maryland",
    description: "Team dashboards, reports, and analytics for Maryland.",
    logo: "/maryland_logo.png",
    logoClassName: "scale-[0.78]",
    envUrlKey: "SHINY_PORTAL_UMD_URL",
    defaultUrl: "https://developingbaseball.shinyapps.io/umd_portal/",
  },
  {
    id: "bpc",
    title: "BPC Portal",
    subtitle: "Baseball Performance Center",
    description: "Facility analytics, session reports, Stuff+, and leaderboards.",
    logo: "/Bpclogoclear.png",
    logoClassName: "scale-[1.42]",
    envUrlKey: "SHINY_PORTAL_BPC_URL",
    defaultUrl: "https://developingbaseball.shinyapps.io/bpc_portal/",
  },
  {
    id: "sju",
    title: "SJU Portal",
    subtitle: "Saint Joseph's University",
    description: "College team dashboards, player reports, and Trackman-backed insights.",
    logo: "/sju.png",
    logoClassName: "scale-[1.08]",
    envUrlKey: "SHINY_PORTAL_SJU_URL",
    defaultUrl: "https://developingbaseball.shinyapps.io/sju_portal/",
  },
  {
    id: "sacstate",
    title: "Sac State Portal",
    subtitle: "Sacramento State",
    description: "Hornets team portal and pitching analytics.",
    logo: "/sacstate_logo.png",
    logoClassName: "scale-[1.06]",
    envUrlKey: "SHINY_PORTAL_SACSTATE_URL",
    defaultUrl: "https://developingbaseball.shinyapps.io/sacstate_portal11/",
  },
  {
    id: "tac",
    title: "TAC Portal",
    subtitle: "Total Arm Care",
    description: "Arm care and performance tracking for athletes and programs.",
    logo: "/taclogonew.png",
    logoClassName: "scale-[1.12]",
    envUrlKey: "SHINY_PORTAL_TAC_URL",
    defaultUrl: "https://developingbaseball.shinyapps.io/tac_portal/",
  },
  {
    id: "ascent",
    title: "Ascent Athlete",
    subtitle: "Ascent",
    description: "Athlete-facing analytics and development tools.",
    logo: "/ascent_logo.png",
    logoClassName: "scale-[1.52]",
    envUrlKey: "SHINY_PORTAL_ASCENT_URL",
    defaultUrl: "https://developingbaseball.shinyapps.io/ascent_athlete/",
  },
];

export function resolvePortalUrl(envKey: string, defaultUrl: string): string | null {
  const raw = process.env[envKey]?.trim() || defaultUrl.trim();
  if (!raw) return null;
  try {
    new URL(raw);
    return raw;
  } catch {
    return null;
  }
}

export type PortalCardPayload = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  logo: string | null;
  logoInitials?: string;
  logoClassName?: string;
  url: string | null;
};

export function buildPortalCards(includeUrls: boolean): PortalCardPayload[] {
  return PORTAL_DEFINITIONS.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: p.subtitle,
    description: p.description,
    logo: p.logo,
    logoInitials: p.logoInitials,
    logoClassName: p.logoClassName,
    url: includeUrls ? resolvePortalUrl(p.envUrlKey, p.defaultUrl) : null,
  }));
}

export function portalHubSecretConfigured(): boolean {
  return Boolean(process.env.PORTAL_HUB_SECRET?.trim());
}
