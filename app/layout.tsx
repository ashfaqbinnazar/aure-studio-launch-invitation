import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/siteConfig";

export const viewport: Viewport = {
  themeColor: siteConfig.brand.colors.deepTaupe,
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.siteUrl),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: [...siteConfig.seo.keywords],
  applicationName: siteConfig.brand.name,
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    siteName: siteConfig.brand.name,
    type: "website",
    images: [
      {
        url: siteConfig.assets.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.brand.name} launch invitation`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.assets.ogImage]
  },
  icons: {
    icon: siteConfig.assets.mark
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
