import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ticket App",
  description: "Ticketing app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
