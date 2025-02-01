import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from 'next/head';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SK Publishing - Terbitkan Buku & Nikmati Ribuan Bacaan",
  description: "Solusi mudah bagi penulis dan pembaca: Terbitkan karya Anda atau baca ribuan buku kapan saja, di mana saja.",
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    title: "SK Publishing - Terbitkan Buku & Nikmati Ribuan Bacaan",
    description: "Solusi mudah bagi penulis dan pembaca: Terbitkan karya Anda atau baca ribuan buku kapan saja, di mana saja.",
    url: "https://kodeku.web.app",
    images: [
      {
        url: "/api/placeholder/800/400",
        width: 800,
        height: 400,
        alt: "SK Publishing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
