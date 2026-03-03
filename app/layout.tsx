import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SideNav } from "@/components/layout/SideNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://svk.ua"),
  title: {
    default: "СВК — Науково-виробнича фірма | Хімічні рішення з 1993 року",
    template: "%s | СВК",
  },
  description:
    "Виробництво промислової та побутової хімії, косметики, Private Label. 30+ років досвіду, 2000+ успішних проєктів, 5 мільйонів упаковок на місяць.",
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <SideNav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
