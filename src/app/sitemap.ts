import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hemophilia.org.np";

  const routes = [
    "",
    "/about",
    "/hemophilia",
    "/emergency",
    "/treatment-centres",
    "/factor-availability",
    "/services",
    "/services/get-support",
    "/membership",
    "/healthcare-professionals",
    "/advocacy",
    "/data-research",
    "/resources",
    "/elearning",
    "/news",
    "/events",
    "/donate",
    "/transparency",
    "/contact",
    "/privacy",
    "/terms",
    "/accessibility-statement",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/factor-availability" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/emergency" || route === "/factor-availability" ? 0.9 : 0.8,
  }));
}
