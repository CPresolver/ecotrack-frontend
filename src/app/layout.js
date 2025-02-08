import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ActionProvider } from "@/context/ActionContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EcoTrack",
  description: "Desafio ecotrack do programa code point",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ActionProvider>{children}</ActionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
