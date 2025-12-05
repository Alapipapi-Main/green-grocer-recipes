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
        <link rel="icon" href="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3e%3ccircle cx='50' cy='50' r='50' fill='hsl(120 73% 75%)'/%3e%3cpath fill='hsl(224 71.4% 4.1%)' d='M68.75,75.625 C68.75,74.288 67.637,73.125 66.25,73.125 L33.75,73.125 C32.362,73.125 31.25,74.288 31.25,75.625 L31.25,81.25 L68.75,81.25 L68.75,75.625 Z M33.75,70.625 L33.75,34.375 C33.75,27.081 39.706,20.625 46.875,20.625 L50,20.625 C57.294,20.625 63.75,27.081 63.75,34.375 L63.75,70.625 M50,15 L50,23.125' stroke='hsl(224 71.4% 4.1%)' stroke-width='5' stroke-linecap='round'/%3e%3c/svg%3e" type="image/svg+xml" />
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
