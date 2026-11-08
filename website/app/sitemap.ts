import type { MetadataRoute } from "next"
import { links } from "@/lib/links"
import { source } from "@/lib/source"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: links.site },
    ...source.getPages().map((page) => ({ url: `${links.site}${page.url}` })),
  ]
}
