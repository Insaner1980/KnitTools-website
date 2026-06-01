import { SITE_URL } from "../i18n/config";

export { SITE_URL };
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const SOFTWARE_APPLICATION_ID = `${SITE_URL}/#softwareapplication`;
export const FINNVEK_URL = "https://finnvek.com";
export const CONTACT_EMAIL = "contact@finnvek.com";
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;

export const SOCIAL_PROFILE_URLS = [
  "https://www.instagram.com/finnvekapps/",
  "https://www.tiktok.com/@finnvekapps",
  "https://www.youtube.com/@Finnvekapps",
  "https://x.com/finnvek",
] as const;
