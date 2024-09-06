import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/providers/convex-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mood2Palette",
  description: "Generate Custom Palette from your mood",
  icons: {
    icon: [
      {
        url: "/logo.png",
        href: "/logo.png",
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            storageKey="palette-theme"
          >
            {children}
          </ThemeProvider>
      </ConvexClientProvider>
      </body>
    </html>
  );
}
