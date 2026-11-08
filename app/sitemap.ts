import { MetadataRoute } from "next";
import { getRouteURL, RouteName, ROUTES } from "../utils/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.keys(ROUTES) as RouteName[]).map((route) => ({
    url: getRouteURL(route),
  }));
}
