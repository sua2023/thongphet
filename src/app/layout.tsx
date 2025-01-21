import { Inter } from "next/font/google";
import React from "react";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { ReduxProvider } from "./storeProvider";
import { AutoRefreshProvider } from "@/context/autoRefreshProvider";
import { AuthProvider } from "./context/authContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <AuthProvider>
            <AutoRefreshProvider>
              {children}
              <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
              />
            </AutoRefreshProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
