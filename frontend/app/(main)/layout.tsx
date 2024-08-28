"use client";

import { Navbar } from "@/components/layout/Navbar";
import { AuthProvider } from "@/context/Auth";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <AuthProvider>
        <Navbar />
        <div className="min-h-screen p-[5rem]">{children}
        </div>
      </AuthProvider>
    </div>
  );
};

export default MainLayout;