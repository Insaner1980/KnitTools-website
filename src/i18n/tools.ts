import type { Lang } from "./config";
import { pathFor, routes } from "./routes";

export type ToolKey = keyof typeof routes.tool;

export const TOOL_ORDER: ToolKey[] = [
  "castOnCalculator",
  "yarnEstimator",
  "needleSizeChart",
  "yarnWeightChart",
  "knittingAbbreviations",
  "knittingSizeCharts",
];

const TOOL_LABELS: Record<Lang, Record<ToolKey, string>> = {
  en: {
    castOnCalculator: "Cast On Calculator",
    yarnEstimator: "Yarn Estimator",
    needleSizeChart: "Needle Size Chart",
    yarnWeightChart: "Yarn Weight Chart",
    knittingAbbreviations: "Knitting Abbreviations",
    knittingSizeCharts: "Knitting Size Charts",
  },
  fi: {
    castOnCalculator: "Silmukkalaskuri",
    yarnEstimator: "Lankamuunnin",
    needleSizeChart: "Puikkokoot",
    yarnWeightChart: "Lankavahvuudet",
    knittingAbbreviations: "Neulelyhenteet",
    knittingSizeCharts: "Neulekokotaulukot",
  },
  de: {
    castOnCalculator: "Maschenanschlag-Rechner",
    yarnEstimator: "Garnbedarfsrechner",
    needleSizeChart: "Nadelstärken-Tabelle",
    yarnWeightChart: "Garnstärken-Tabelle",
    knittingAbbreviations: "Strickabkürzungen",
    knittingSizeCharts: "Größentabellen fürs Stricken",
  },
  sv: {
    castOnCalculator: "Uppläggningskalkylator",
    yarnEstimator: "Garnåtgångskalkylator",
    needleSizeChart: "Stickstorlekar",
    yarnWeightChart: "Garntjocklekar",
    knittingAbbreviations: "Stickförkortningar",
    knittingSizeCharts: "Storlekstabeller för stickning",
  },
  no: {
    castOnCalculator: "Oppleggskalkulator",
    yarnEstimator: "Garnberegner",
    needleSizeChart: "Pinnestørrelser",
    yarnWeightChart: "Garntykkelser",
    knittingAbbreviations: "Strikkeforkortelser",
    knittingSizeCharts: "Størrelsestabeller for strikking",
  },
  fr: {
    castOnCalculator: "Calculateur de mailles à monter",
    yarnEstimator: "Estimateur de quantité de laine",
    needleSizeChart: "Tailles d'aiguilles",
    yarnWeightChart: "Épaisseurs de fil",
    knittingAbbreviations: "Abréviations tricot",
    knittingSizeCharts: "Tableaux de tailles tricot",
  },
  nl: {
    castOnCalculator: "Opzetcalculator",
    yarnEstimator: "Garenberekenaar",
    needleSizeChart: "Naalddiktes",
    yarnWeightChart: "Garendiktes",
    knittingAbbreviations: "Breiafkortingen",
    knittingSizeCharts: "Maattabellen voor breien",
  },
  da: {
    castOnCalculator: "Opslagsberegner",
    yarnEstimator: "Garnberegner",
    needleSizeChart: "Pindestørrelser",
    yarnWeightChart: "Garntykkelser",
    knittingAbbreviations: "Strikkeforkortelser",
    knittingSizeCharts: "Størrelsestabeller til strik",
  },
};

export function getToolsIndexPath(lang: Lang): string {
  return pathFor(routes.toolsIndex, lang);
}

export function getToolLinks(lang: Lang) {
  return TOOL_ORDER.map((tool) => ({
    label: TOOL_LABELS[lang][tool],
    href: pathFor(routes.tool[tool], lang),
  }));
}

export function toolRouteToRestSlug(
  toolsIndexPath: string,
  toolPath: string,
): string | undefined {
  const slug = toolPath.slice(toolsIndexPath.length).replace(/\/$/, "");
  return slug === "" ? undefined : slug;
}
