import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from "fumadocs-ui/layouts/docs/page"
import { createRelativeLink } from "fumadocs-ui/mdx"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getMDXComponents } from "@/components/mdx"
import { getPageMarkdownUrl } from "@/lib/docs-routes"
import { links } from "@/lib/links"
import { openGraphDefaults } from "@/lib/site-metadata"
import { source } from "@/lib/source"

export default async function Page({ params }: PageProps<"/docs/[[...slug]]">) {
  const { slug } = await params
  const page = source.getPage(slug)
  if (!page) notFound()

  const MDX = page.data.body
  const { url: markdownUrl } = getPageMarkdownUrl(page)

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="flex flex-row items-center gap-2 border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`${links.github}/blob/main/website/content/docs/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDX components={getMDXComponents({ a: createRelativeLink(source, page) })} />
      </DocsBody>
    </DocsPage>
  )
}

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata({
  params,
}: PageProps<"/docs/[[...slug]]">): Promise<Metadata> {
  const { slug } = await params
  const page = source.getPage(slug)
  if (!page) notFound()

  const { title, description } = page.data
  const { url: markdownUrl } = getPageMarkdownUrl(page)

  return {
    title,
    description,
    alternates: { canonical: page.url, types: { "text/markdown": markdownUrl } },
    openGraph: { ...openGraphDefaults, type: "article", url: page.url, title, description },
  }
}
