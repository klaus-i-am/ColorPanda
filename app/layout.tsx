import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Nunito } from "next/font/google";
import { Providers } from "./Providers";

import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-semibold`}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            storageKey="palette-theme"
            >
              {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}