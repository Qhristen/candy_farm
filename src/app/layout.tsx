import AppKitContextProvider from "@/components/appkit/app-kit-provider";
import { Header } from "@/components/header";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { headers } from "next/headers";
import "./globals.css";
import  { Toaster } from 'react-hot-toast';

export const metadata = {
  title: "candy farm",
  description: "Next-generation DeFi Yield Aggregator",
};

const PPNeueMachina = localFont({
  src: [
    {
      path: "../assets/fonts/PPNeueMachina-InktrapLight.0138eceb.woff",
      style: "normal",
      weight: "100",
    },
    {
      path: "../assets/fonts/PPNeueMachina-InktrapRegular.1971ff81.woff",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-PPNeueMachina",
});

const PPMori = localFont({
  src: [
    {
      path: "../assets/fonts/PPMori-SemiBold.be4d2ab7.woff",
      weight: "300",
      style: "bold",
    },
  ],
  variable: "--font-PPMori",
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${PPNeueMachina.variable} ${PPMori.variable}`}
      >
        <AppKitContextProvider>
          <Toaster />
          <Header />
          {children}
        </AppKitContextProvider>
      </body>
    </html>
  );
}
