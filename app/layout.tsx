import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { auth } from "@/auth";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "@/components/layout/ThemeToggle/theme-provider";
import { SessionProvider } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Artacho",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider session={session}>
            <Toaster />
            {children}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
