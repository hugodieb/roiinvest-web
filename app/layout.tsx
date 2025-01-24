import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/styles/globals.css";
import QueryProvider from "./QueryProvider";
import { Navbar } from "./_components/commons";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Full Auth",
  description: "Full Auth Aplication that Provides JWT Authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <div>
            <Navbar />
            <Toaster />
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}