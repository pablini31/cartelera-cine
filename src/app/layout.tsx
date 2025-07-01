import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { AuthModal } from "@/components/AuthModal";
import { Toaster } from "react-hot-toast";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cinelini",
  description: "Descubre las últimas películas en Cinelini. Información completa, trailers y horarios de cine.",
  keywords: ["cine", "películas", "cartelera", "trailers", "entretenimiento"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geist.className} antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            {children}
            <AuthModal />
            <Toaster position="bottom-center" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
