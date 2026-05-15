import type { Lang } from "./config";
import { pathFor, routes } from "./routes";

export function getToolsIndexPath(lang: Lang): string {
  return pathFor(routes.toolsIndex, lang);
}
