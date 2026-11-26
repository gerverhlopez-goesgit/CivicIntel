
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://civicintel.world"),

  title: {
    default: "CivicIntel | Making Invisible Systems Visible",
    template: "%s | CivicIntel",
  },

  description:
    "CivicIntel explores how public policy, economic incentives, institutions, and networks shape communities through interactive, evidence-based research.",

  openGraph: {
    title: "CivicIntel | Making Invisible Systems Visible",
    description:
      "Explore the invisible connections behind public policy, economics, institutions, and communities through interactive research.",
    url: "https://civicintel.world",
    siteName: "Civic Intelligence Lab",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "CivicIntel | Making Invisible Systems Visible",
    description:
      "Independent research making complex economic, political, and institutional networks visible.",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
