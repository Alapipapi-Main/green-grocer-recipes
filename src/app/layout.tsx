import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Green Grocer Recipes",
  description: "Generate delicious recipes from the ingredients you have.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23bbf7d0'/%3E%3Cpath fill='%230a1c57' d='M68.75 81.25V75.625c0-1.337-1.113-2.5-2.5-2.5H33.75c-1.388 0-2.5 1.163-2.5 2.5V81.25zM63.75 70.625V34.375C63.75 27.081 57.294 20.625 50 20.625h-3.125C39.706 20.625 33.75 27.081 33.75 34.375v36.25z'/%3E%3Cpath stroke='%230a1c57' stroke-width='5' stroke-linecap='round' d='M50 23.125V15'/%3E%3C/svg%3E" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
