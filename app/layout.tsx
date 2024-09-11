import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Inter } from "next/font/google";
import { Nunito } from "next/font/google";
import { Providers } from "./Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const nunito = Nunito({ 
  weight: ['400','500','600','700','800'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "ColorPanda",
  description: "Generate Custom Palette from your mood",
  icons: {
    icon: [
      {
        url: "/logo3.png",
        href: "/logo3.png",
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
      <body className={`font-semibold ${nunito.className}`}>
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
