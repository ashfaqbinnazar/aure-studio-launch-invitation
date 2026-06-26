import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/lib/siteConfig";

const helvetica = localFont({
  src: [
    { path: "./fonts/HelveticaNeueThin.otf", weight: "100", style: "normal" },
    { path: "./fonts/HelveticaNeueThinItalic.otf", weight: "100", style: "italic" },
    { path: "./fonts/HelveticaNeueUltraLight.otf", weight: "200", style: "normal" },
    { path: "./fonts/HelveticaNeueUltraLightItalic.otf", weight: "200", style: "italic" },
    { path: "./fonts/HelveticaNeueLight.otf", weight: "300", style: "normal" },
    { path: "./fonts/HelveticaNeueLightItalic.otf", weight: "300", style: "italic" },
    { path: "./fonts/HelveticaNeueRoman.otf", weight: "400", style: "normal" },
    { path: "./fonts/HelveticaNeueItalic.ttf", weight: "400", style: "italic" },
    { path: "./fonts/HelveticaNeueMedium.otf", weight: "500", style: "normal" },
    { path: "./fonts/HelveticaNeueMediumItalic.otf", weight: "500", style: "italic" },
    { path: "./fonts/HelveticaNeueBold.otf", weight: "700", style: "normal" },
    { path: "./fonts/HelveticaNeueBoldItalic.otf", weight: "700", style: "italic" },
    { path: "./fonts/HelveticaNeueHeavy.otf", weight: "800", style: "normal" },
    { path: "./fonts/HelveticaNeueHeavyItalic.otf", weight: "800", style: "italic" },
    { path: "./fonts/HelveticaNeueBlack.otf", weight: "900", style: "normal" },
    { path: "./fonts/HelveticaNeueBlackItalic.otf", weight: "900", style: "italic" },
  ],
  variable: "--font-helvetica",
  display: "swap"
});

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
    <html lang="en" className={`${helvetica.variable}`}>
      <body>{children}</body>
    </html>
  );
}
