import type { Metadata, Viewport } from "next";
import { Manrope, Outfit } from "next/font/google";
import { StoreProvider } from "@/lib/store";
import { I18nProvider } from "@/lib/i18n";
import { Header, Footer } from "@/components/SiteChrome";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3b82f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1e293b" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "smart.house777 — Smart uy katalogi",
    template: "%s · smart.house777",
  },
  description:
    "Smart karnizlar, Zigbee shlyuzlar, sensorlar, rele va sensorni viklyuchatellar. O‘zbekiston uchun professional smart uy katalogi. Toshkent bo‘ylab yetkazib berish bepul.",
  keywords: [
    "smart house",
    "zigbee",
    "wifi",
    "karniz",
    "sensor",
    "viklyuchatel",
    "O‘zbekiston",
  ],
  applicationName: "smart.house777",
  appleWebApp: {
    title: "smart.house777",
    capable: true,
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${outfit.variable} ${manrope.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <StoreProvider>
          <I18nProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </I18nProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
