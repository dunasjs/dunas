import { links } from "@/lib/links"
import { siteName } from "@/lib/site-metadata"

export type StructuredDataProps = {
  description: string
}

export function StructuredData({ description }: StructuredDataProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", name: siteName, url: links.site, inLanguage: "pt-BR" },
      {
        "@type": "SoftwareSourceCode",
        name: siteName,
        description,
        url: links.site,
        codeRepository: links.github,
        programmingLanguage: "TypeScript",
        runtimePlatform: "Node.js",
        license: "https://opensource.org/licenses/MIT",
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD has to be inlined as text
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  )
}
