import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/profile/", "/payment/", "/auth/"],
    },
    sitemap: "https://linkedhire.io/sitemap.xml",
  };
}
