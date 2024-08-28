import { Poppins } from "next/font/google";
import { Toaster } from "sonner";

const inter = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={2000}
          pauseWhenPageIsHidden
          visibleToasts={1}
        />
        {children}
      </body>
    </html>
  );
}