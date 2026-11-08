import type { MetadataRoute } from "next"
import { links } from "@/lib/links"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${links.site}/sitemap.xml`,
  }
}
