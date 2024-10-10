import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AuthProvider } from "@/src/context/Auth";
import "./globals.css";
import { Navbar } from "../components/layout/Navbar";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "GlobeGuide",
  description: "This is a Personalised Travel Itinerary Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="">
          <AuthProvider>
            <Navbar/>
            {children}
            <Toaster
              position="top-right"
              richColors
              closeButton
              duration={2000}
              pauseWhenPageIsHidden
              visibleToasts={1}
            />
            
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
