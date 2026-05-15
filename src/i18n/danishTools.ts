import { routes, type LocalizedPath } from "./routes";

export const danishToolRoutes = {
  index: routes.toolsIndex.da,
  castOnCalculator: routes.tool.castOnCalculator.da,
  yarnEstimator: routes.tool.yarnEstimator.da,
  needleSizeChart: routes.tool.needleSizeChart.da,
  yarnWeightChart: routes.tool.yarnWeightChart.da,
  knittingAbbreviations: routes.tool.knittingAbbreviations.da,
  knittingSizeCharts: routes.tool.knittingSizeCharts.da,
} as const;

export const danishToolLinks = [
  { label: "Opslagsberegner", href: danishToolRoutes.castOnCalculator },
  { label: "Garnberegner", href: danishToolRoutes.yarnEstimator },
  { label: "Pindestørrelser", href: danishToolRoutes.needleSizeChart },
  { label: "Garntykkelser", href: danishToolRoutes.yarnWeightChart },
  {
    label: "Strikkeforkortelser",
    href: danishToolRoutes.knittingAbbreviations,
  },
  {
    label: "Størrelsestabeller til strik",
    href: danishToolRoutes.knittingSizeCharts,
  },
] as const;

export const danishToolAlternates = {
  index: {
    ...routes.toolsIndex,
    da: danishToolRoutes.index,
  },
  tool: {
    castOnCalculator: {
      ...routes.tool.castOnCalculator,
      da: danishToolRoutes.castOnCalculator,
    },
    yarnEstimator: {
      ...routes.tool.yarnEstimator,
      da: danishToolRoutes.yarnEstimator,
    },
    needleSizeChart: {
      ...routes.tool.needleSizeChart,
      da: danishToolRoutes.needleSizeChart,
    },
    yarnWeightChart: {
      ...routes.tool.yarnWeightChart,
      da: danishToolRoutes.yarnWeightChart,
    },
    knittingAbbreviations: {
      ...routes.tool.knittingAbbreviations,
      da: danishToolRoutes.knittingAbbreviations,
    },
    knittingSizeCharts: {
      ...routes.tool.knittingSizeCharts,
      da: danishToolRoutes.knittingSizeCharts,
    },
  },
} as const satisfies {
  index: LocalizedPath;
  tool: Record<Exclude<keyof typeof danishToolRoutes, "index">, LocalizedPath>;
};
