import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import "./globals.css";

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
  title: "MoodFlix - Mood-Based Movie Recommendations",
  description: "Discover movies that match your mood with MoodFlix, your personalized movie recommendation app.",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "MoodFlix - Mood-Based Movie Recommendations",
    description: "Discover movies that match your mood with MoodFlix, your personalized movie recommendation app.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MoodFlix Logo",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground min-h-screen`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen pt-[60px]">
            <main className="flex-grow">
              {children}
            </main>
            <footer className="py-4 text-center text-sm text-muted-foreground">
              © 2024 MoodFlix. All rights reserved.
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
