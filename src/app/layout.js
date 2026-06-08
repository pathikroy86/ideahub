const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Menubar from "./components/Menubar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "IdeaHub",
  description: "Best startup idea sharing platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-100">
        <Toaster />
        <Menubar></Menubar>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
