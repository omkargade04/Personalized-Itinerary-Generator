"use client";

import { Navbar } from "@/src/components/layout/Navbar";
import { AuthProvider } from "@/src/context/Auth";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <AuthProvider>
        <Navbar />
        <div className="min-h-screen">{children}</div>
      </AuthProvider>
    </div>
  );
};

export default MainLayout;
