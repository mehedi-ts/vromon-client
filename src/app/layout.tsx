import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatProvider } from "@/components/chat/ChatContext";
import { ChatWidget } from "@/components/chat/ChatWidget";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vromon AI | AI-Powered Travel Discovery",
  description: "AI-powered travel discovery and trip-planning platform for Bangladesh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${sora.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <ChatProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <ChatWidget />
          </ChatProvider>
        </Providers>
      </body>
    </html>
  );
}
