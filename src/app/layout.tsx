import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, Archivo, Space_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeBootScript } from "@/components/providers/ThemeProvider";
import { SmoothScroll } from "@/components/chrome/SmoothScroll";
import { GrainOverlay } from "@/components/chrome/GrainOverlay";
import { CustomCursor } from "@/components/chrome/CustomCursor";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "REEL — A Cinematic Booking Programme",
  description:
    "REEL is an editorial cinema booking experience: pick a film, choose your showtime, claim your seats, and print a perforated e-ticket. A 1970s programme, rebuilt for the web.",
  keywords: ["cinema", "movie booking", "editorial", "tickets", "REEL"],
  authors: [{ name: "REEL" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${archivo.variable} ${spaceMono.variable} font-sans antialiased`}
      >
        {/* Applies the saved/system theme before paint to avoid a flash. The
            script body is a static constant — no untrusted input. */}
        <Script id="reel-theme-boot" strategy="beforeInteractive">
          {themeBootScript}
        </Script>

        <ThemeProvider>
          <SmoothScroll>
            <GrainOverlay />
            <CustomCursor />
            <div className="relative z-10 flex min-h-dvh flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
