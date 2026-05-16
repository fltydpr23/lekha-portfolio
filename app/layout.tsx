import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/ui/Nav";
import CustomCursor from "@/components/ui/CustomCursor";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lekharathnam.com"),
  title: {
    default: "Lekha Rathnam — Editorial & Fine Art Photography",
    template: "%s · Lekha Rathnam",
  },
  description: "Editorial and fine art photographer based in India.",
  keywords: ["Lekha Rathnam", "editorial photography", "fine art photography"],
  authors: [{ name: "Lekha Rathnam", url: "https://lekharathnam.com" }],
  creator: "Lekha Rathnam",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-white text-black antialiased" suppressHydrationWarning>
        <CustomCursor />
        <Nav />
        {children}
      </body>
    </html>
  );
}
