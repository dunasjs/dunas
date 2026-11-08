import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CopyEditor } from "@/components/copy-editor/copy-editor"
import { fontVariables } from "@/lib/fonts"
import { links } from "@/lib/links"
import { openGraphDefaults } from "@/lib/site-metadata"
import { description, title } from "./site-copy"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(links.site),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { ...openGraphDefaults, type: "website", url: "/", title, description },
  twitter: { card: "summary_large_image" },
}

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={fontVariables}>
      <body>
        {children}
        {process.env.NODE_ENV === "development" && <CopyEditor />}
      </body>
    </html>
  )
}
