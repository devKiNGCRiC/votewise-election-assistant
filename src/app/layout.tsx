import type { Metadata, Viewport } from "next";
import { Baloo_2, Hind } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const baloo = Baloo_2({
  subsets: ["latin", "devanagari"],
  weight: ["600", "700", "800"],
  variable: "--font-baloo",
  display: "swap",
});

const hind = Hind({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600"],
  variable: "--font-hind",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#140c3a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "VoteWise India — your first vote, sorted",
    template: "%s · VoteWise India",
  },
  description:
    "Check if you can vote, learn how India votes, practise on a real-feel EVM and VVPAT, and quiz yourself before election day.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "VoteWise",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${baloo.variable} ${hind.variable}`}>
      <body className="antialiased min-h-dvh flex flex-col">
        <div className="gulaal" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <Navbar />
        <main className="grow pt-24 md:pt-28 pb-32 md:pb-12">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
