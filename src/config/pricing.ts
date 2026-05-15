export type PricePhase = "launch" | "permanent";

export const PRICING_TIERS = {
  US: { launch: "$9.99", permanent: "$12.99" },
  EU: { launch: "€8.99", permanent: "€11.99" },
  UK: { launch: "£7.99", permanent: "£10.99" },
  NO: { launch: "NOK 99", permanent: "NOK 129" },
  SE: { launch: "SEK 99", permanent: "SEK 129" },
  DK: { launch: "DKK 69", permanent: "DKK 89" },
  IS: { launch: "ISK 1290", permanent: "ISK 1690" },
  CH: { launch: "CHF 9.90", permanent: "CHF 12.90" },
  CA: { launch: "CAD 13.99", permanent: "CAD 17.99" },
  AU: { launch: "AUD 14.99", permanent: "AUD 18.99" },
  NZ: { launch: "NZD 16.99", permanent: "NZD 21.99" },
  JP: { launch: "JPY 1500", permanent: "JPY 1980" },
  BR: { launch: "BRL 24.90", permanent: "BRL 32.90" },
  IN: { launch: "INR 299", permanent: "INR 399" },
  MX: { launch: "MXN 99", permanent: "MXN 139" },
  ZA: { launch: "ZAR 99", permanent: "ZAR 139" },
  default: { launch: "$9.99", permanent: "$12.99" },
} as const;

export type PricingTier = keyof typeof PRICING_TIERS;

export const COUNTRY_TO_TIER: Record<string, PricingTier> = {
  US: "US",
  CA: "CA",
  AU: "AU",
  NZ: "NZ",

  AT: "EU",
  BE: "EU",
  HR: "EU",
  CY: "EU",
  EE: "EU",
  FI: "EU",
  FR: "EU",
  DE: "EU",
  GR: "EU",
  IE: "EU",
  IT: "EU",
  LV: "EU",
  LT: "EU",
  LU: "EU",
  MT: "EU",
  NL: "EU",
  PT: "EU",
  SK: "EU",
  SI: "EU",
  ES: "EU",

  GB: "UK",

  NO: "NO",
  SE: "SE",
  DK: "DK",
  IS: "IS",
  CH: "CH",
  JP: "JP",

  BR: "BR",
  IN: "IN",
  MX: "MX",
  ZA: "ZA",
} as const;

export const DEFAULT_PRICING_TIER: PricingTier = "US";
export const FALLBACK_PRICING_TIER: PricingTier = "default";
export const LOCAL_CURRENCY_NOTE =
  "Pricing on Google Play in your local currency.";

export const PRICING = {
  trialDays: 14,
  permanentPriceStartsAfterMonths: 2,
  launchMonthLabel: "May 2026",
} as const;

export function getPricingTier(countryCode?: string): PricingTier {
  if (!countryCode) return DEFAULT_PRICING_TIER;
  return COUNTRY_TO_TIER[countryCode.toUpperCase()] ?? FALLBACK_PRICING_TIER;
}

export function getPrice(
  phase: PricePhase,
  tier: PricingTier = DEFAULT_PRICING_TIER,
): string {
  return PRICING_TIERS[tier][phase];
}

export function getStructuredPrice(phase: PricePhase = "launch") {
  return {
    price: PRICING_TIERS.US[phase].replace("$", ""),
    priceCurrency: "USD",
  };
}
