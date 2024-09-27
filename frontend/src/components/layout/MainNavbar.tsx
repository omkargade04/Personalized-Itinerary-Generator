import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useAuth } from "@/src/context/Auth";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import path from "path";

export const MainNavbar = () => {
  const { authState: user } = useAuth();
  const router = useRouter();
  const pathName = usePathname();

  const handleLogout = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (err: any) {}
  };

  if (pathName === "/create-trip" || pathName === "my-trips" || pathName === "/view-trip") {
    return null;
  }

  return (
    <div className="absolute bg-transparent flex top-3 left-3 z-30">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center text-sm hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <span className="sr-only">Open user menu</span>
            <Avatar className="h-12 w-12">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt={user.data.name}
              />
              <AvatarFallback>{user.data.name}</AvatarFallback>
            </Avatar>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56">
          <div className="flex flex-col space-y-4">
            <p className="text-sm font-medium text-gray-900">
              {user.data.name}
            </p>
            <p className="text-sm text-gray-500">{user.data.email}</p>
            <Button
              variant="destructive"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
