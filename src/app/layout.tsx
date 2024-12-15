import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/providers/StoreProvider";
import AuthProvider from "@/providers/AuthProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <StoreProvider>
          <AuthProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
            <ToastContainer />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
