export const SITE_NAME = "Fly with Cal";
export const SITE_DESCRIPTION =
  // TODO: Replace description below with a short bio. This is used as the meta description and in search results, so lead with who you are and what you do.
  "A short bio, one to three sentences. This is used as the meta description and in search results, so lead with who you are and what you do.";
export const SITE_DOMAIN = "FlyWithCal";
export const SITE_URL = `https://${SITE_DOMAIN}.com`;

// Used in the home page's structured data; leave undefined to omit.
export const JOB_TITLE: string | undefined = "Certified Flight Instructor";
export const EMPLOYER: string | undefined = undefined;

export const LOCATION = {
  label: "Carlsbad, CA",
  locality: "Carlsbad",
  region: "CA",
  country: "US",
};

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/your-handle/",
  linkedin: "https://www.linkedin.com/in/your-handle/",
};

// Profiles that identify the same person, for structured data.
export const PROFILE_LINKS = Object.values(SOCIAL_LINKS);

export type RouteName = keyof typeof ROUTES;

export const ROUTES = {
  home: "/",
  about: "/about",
  contact: "/contact",
};

// Text shown for each route in the nav.
export const ROUTE_LABELS: Record<RouteName, string> = {
  home: "Fly with Cal",
  about: "About",
  contact: "Contact",
};

export function getRouteURL(routeName: RouteName) {
  return `${SITE_URL}${ROUTES[routeName]}`;
}
