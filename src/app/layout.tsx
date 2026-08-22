import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import { StoreProvider } from "@/lib/store";
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
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png" }],
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
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
