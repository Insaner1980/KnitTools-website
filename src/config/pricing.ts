export type PricePhase = 'launch' | 'permanent';

export const PRICING_TIERS = {
  US: { launch: '$9.99', permanent: '$12.99' },
  EU: { launch: '€8.99', permanent: '€11.99' },
  UK: { launch: '£7.99', permanent: '£10.99' },
  default: { launch: '$9.99', permanent: '$12.99' },
} as const;

export type PricingTier = keyof typeof PRICING_TIERS;

export const COUNTRY_TO_TIER: Record<string, PricingTier> = {
  US: 'US',

  AT: 'EU',
  BE: 'EU',
  HR: 'EU',
  CY: 'EU',
  EE: 'EU',
  FI: 'EU',
  FR: 'EU',
  DE: 'EU',
  GR: 'EU',
  IE: 'EU',
  IT: 'EU',
  LV: 'EU',
  LT: 'EU',
  LU: 'EU',
  MT: 'EU',
  NL: 'EU',
  PT: 'EU',
  SK: 'EU',
  SI: 'EU',
  ES: 'EU',

  GB: 'UK',
} as const;

export const DEFAULT_PRICING_TIER: PricingTier = 'US';
export const FALLBACK_PRICING_TIER: PricingTier = 'default';
export const LOCAL_CURRENCY_NOTE = 'Pricing on Google Play in your local currency.';

export const PRICING = {
  trialDays: 14,
  permanentPriceStartsAfterMonths: 2,
  launchMonthLabel: 'May 2026',
} as const;

export function getPricingTier(countryCode?: string): PricingTier {
  if (!countryCode) return DEFAULT_PRICING_TIER;
  return COUNTRY_TO_TIER[countryCode.toUpperCase()] ?? FALLBACK_PRICING_TIER;
}

export function getPrice(phase: PricePhase, tier: PricingTier = DEFAULT_PRICING_TIER): string {
  return PRICING_TIERS[tier][phase];
}

export function getStructuredPrice(phase: PricePhase = 'launch') {
  return {
    price: PRICING_TIERS.US[phase].replace('$', ''),
    priceCurrency: 'USD',
  };
}
