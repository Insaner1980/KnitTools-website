import { routes } from "./routes";

export const dutchToolRoutes = {
  index: routes.toolsIndex.nl,
  castOnCalculator: routes.tool.castOnCalculator.nl,
  yarnEstimator: routes.tool.yarnEstimator.nl,
  needleSizeChart: routes.tool.needleSizeChart.nl,
  yarnWeightChart: routes.tool.yarnWeightChart.nl,
  knittingAbbreviations: routes.tool.knittingAbbreviations.nl,
  knittingSizeCharts: routes.tool.knittingSizeCharts.nl,
} as const;
