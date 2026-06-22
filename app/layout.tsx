import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientEffects from "@/components/ClientEffects";
import DiscountModal from "@/components/DiscountModal";
import "./globals.css";

const body = Barlow({ subsets:["latin"], variable:"--font-body", weight:["400","500","600","700","800"] });
const display = Barlow_Condensed({ subsets:["latin"], variable:"--font-display", weight:["600","700","800","900"] });

export const metadata:Metadata = {
  metadataBase:new URL("https://americanlogoexpert.com"),
  title:{ default:"American Logo Expert | Logo Design & Digital Branding", template:"%s | American Logo Expert" },
  description:"Custom logo design, brand identity, website development, and mobile experiences built to make your business impossible to ignore.",
};

export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {
  return <html lang="en" className={`${body.variable} ${display.variable}`}><body><ClientEffects/><Header/><main>{children}</main><Footer/><DiscountModal/></body></html>;
}
