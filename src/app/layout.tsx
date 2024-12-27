import ReactQueryProvider from "@/providers/ReactQueryProvider";
import StoreProvider from "@/providers/StoreProvider";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import NuqsProvider from "@/providers/NuqsProvider";

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
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthProvider>
            <NuqsProvider>
              <StoreProvider>
                <ReactQueryProvider>{children}</ReactQueryProvider>
                <ToastContainer />
              </StoreProvider>
            </NuqsProvider>
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
