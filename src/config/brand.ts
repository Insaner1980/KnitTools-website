import { SITE_URL } from "../i18n/config";

export { SITE_URL };
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const SOFTWARE_APPLICATION_ID = `${SITE_URL}/#softwareapplication`;
export const FINNVEK_URL = "https://finnvek.com";
export const CONTACT_EMAIL = "contact@finnvek.com";
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;

export const SOCIAL_PROFILES = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/finnvekapps/",
    icon: "/brand/instagram.webp",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@finnvekapps",
    icon: "/brand/tiktok.webp",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@Finnvekapps",
    icon: "/brand/youtube.webp",
  },
  {
    label: "X",
    href: "https://x.com/finnvek",
    icon: "/brand/x.webp",
  },
] as const;

export const SOCIAL_PROFILE_URLS = SOCIAL_PROFILES.map(
  (profile) => profile.href,
);
