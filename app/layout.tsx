import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import localFont from "next/font/local";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ping Matrix",
  description:
    "Ping Matrix is a tool for monitoring the latency of your servers and services.",
};

const tikTokSans = localFont({
  src: "../public/fonts/TikTokSans.ttf",
  variable: "--font-main",
  display: "swap",
});

const neganSans = localFont({
  src: "../public/fonts/Mottek.ttf",
  variable: "--font-brand",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${tikTokSans.variable} ${neganSans.variable}`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
