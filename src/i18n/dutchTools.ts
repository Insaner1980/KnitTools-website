import type { Lang } from "./config";
import { pathFor, routes } from "./routes";

export const dutchToolRoutes = {
  index: routes.toolsIndex.nl,
  castOnCalculator: routes.tool.castOnCalculator.nl,
  yarnEstimator: routes.tool.yarnEstimator.nl,
  needleSizeChart: routes.tool.needleSizeChart.nl,
  yarnWeightChart: routes.tool.yarnWeightChart.nl,
  knittingAbbreviations: routes.tool.knittingAbbreviations.nl,
  knittingSizeCharts: routes.tool.knittingSizeCharts.nl,
} as const;

export const dutchToolLinks = [
  { label: "Opzetcalculator", href: dutchToolRoutes.castOnCalculator },
  { label: "Garenberekenaar", href: dutchToolRoutes.yarnEstimator },
  { label: "Naalddiktes", href: dutchToolRoutes.needleSizeChart },
  { label: "Garendiktes", href: dutchToolRoutes.yarnWeightChart },
  { label: "Breiafkortingen", href: dutchToolRoutes.knittingAbbreviations },
  {
    label: "Maattabellen voor breien",
    href: dutchToolRoutes.knittingSizeCharts,
  },
] as const;

export function getToolsIndexPath(lang: Lang): string {
  return pathFor(routes.toolsIndex, lang);
}
