import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";

const quickSand = localFont({
  src: [
    {
      path: "./fonts/quicksand-light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/quicksand-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/quicksand-medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/quicksand-semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/quicksand-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-quick-sand",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://runevault.smoggyowo.tech"),
  title: {
    default: "RuneVault - Your Next-Gen Blockchain Wallet",
    template: "%s | RuneVault",
  },
  description:
    "Secure, seamless, and multi-chain wallet management. Create a crypto wallet effortlessly with Google Sign-In or connect existing wallets. Unlock the future of digital asset management with RuneVault.",
  keywords: [
    "RuneVault",
    "blockchain wallet",
    "multi-chain wallet",
    "cryptocurrency manager",
    "digital assets",
    "secure wallet",
    "next-gen wallet",
    "Google Sign-In wallet",
    "Solana wallet",
    "Ethereum wallet",
    "crypto transfer",
    "Web3 wallet",
    "cross-chain wallet",
    "cryptocurrency management",
    "decentralized wallet",
    "blockchain technology",
    "crypto security",
    "wallet integration",
    "Aditya Singh",
    "SmoggyOwO",
  ],
  authors: [{ name: "Aditya Singh", url: "https://github.com/SmoggyOwO" }],
  creator: "Aditya Singh",
  publisher: "RuneVault",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://runevault.smoggyowo.tech",
  },
  openGraph: {
    title: "RuneVault - Your Next-Gen Blockchain Wallet",
    description:
      "Experience seamless management of digital assets across all blockchains. Create wallets with Google Sign-In or connect existing ones. RuneVault brings security, innovation, and simplicity to your fingertips.",
    url: "https://runevault.smoggyowo.tech",
    siteName: "RuneVault",
    images: [
      {
        url: "https://runevault.smoggyowo.tech/assets/runevault.webp",
        width: 1200,
        height: 630,
        alt: "RuneVault - Next-Gen Blockchain Wallet",
      },
    ],
    locale: "en_US",
    type: "website",
    countryName: "Global",
  },
  twitter: {
    card: "summary_large_image",
    title: "RuneVault - Your Next-Gen Blockchain Wallet",
    description:
      "Manage digital assets securely and effortlessly across all blockchains. Create wallets with Google Sign-In. RuneVault is your gateway to the blockchain universe.",
    site: "@RuneVault",
    creator: "@SmoggyOwO",
    images: ["https://runevault.smoggyowo.tech/assets/runevault.webp"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "https://runevault.smoggyowo.tech/assets/runevault.webp", sizes: "32x32", type: "image/webp" },
    ],
    apple: [
      { 
        url: "https://runevault.smoggyowo.tech/assets/runevault.webp", 
        sizes: "180x180", 
        type: "image/webp" 
      }
    ],
  },
  verification: {
    google: "3kOibofcpvI4UcRmcvcDjw0cj0E-XyPTfqyN_NAsQaE", // Keep existing verification
  },
  category: "Finance",
  applicationName: "RuneVault",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  other: {
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml",
  },
  assets: ["https://runevault.smoggyowo.tech/assets"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quickSand.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
