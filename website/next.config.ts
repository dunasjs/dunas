import { createMDX } from "fumadocs-mdx/next"
import type { NextConfig } from "next"
import { links } from "./lib/links"

const withMDX = createMDX()

const nextConfig: NextConfig = {
  allowedDevOrigins: ["100.123.155.61", "dev", "dev.tail8eb3d.ts.net"],
  images: { unoptimized: true },
  skipTrailingSlashRedirect: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${new URL(links.site).host}` }],
        destination: `${links.site}/:path*`,
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: "/dunes/static/:version/sand.js",
        destination: "https://us-assets.i.posthog.com/static/:version/posthog-recorder.js",
      },
      {
        source: "/dunes/static/sand.js",
        destination: "https://us-assets.i.posthog.com/static/posthog-recorder.js",
      },
      {
        source: "/dunes/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/dunes/array/:path*",
        destination: "https://us-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/dunes/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ]
  },
}

export default withMDX(nextConfig)
