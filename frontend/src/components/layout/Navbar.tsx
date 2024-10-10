"use client";

import { Button } from "@/src/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetFooter,
} from "@/src/components/ui/sheet";
import { useAuth } from "@/src/context/Auth";
import { LogOut, Menu, MenuIcon, PlaneLanding, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoLogoBuffer } from "react-icons/io";
import { LuLogOut, LuUser2 } from "react-icons/lu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  FaAngleDown,
  FaAngleUp,
  FaCaretDown,
  FaCaretUp,
  FaSearch,
  FaSuitcase,
} from "react-icons/fa";
import { toast } from "sonner";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import ShimmerButton from "../magicui/shimmer-button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const Navbar = () => {
  const { authState: user } = useAuth();
  const pathName = usePathname();
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (err: any) {}
  };

  if (pathName === "/") {
    return null;
  }

  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b bg-white flex items-center z-20">
      <div className="hidden sm:flex lg:flex md:max-w-screen-2xl mx-auto items-center w-full justify-between">
        <div className="flex-shrink-0 flex items-center">
          <Link href="/" className="text-xl font-bold text-primary">
          GlobeGuide
          </Link>
        </div>
        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
          <Link
            href="/create-trip"
            className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            <PlaneLanding className="mr-2 h-4 w-4" />
            Create Trip
          </Link>
          <Link
            href="/my-trips"
            className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            <FaSuitcase className="mr-2 h-4 w-4" />
            My Trips
          </Link>
        </div>
        {user.token ? (
          <>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <span className="sr-only">Open user menu</span>
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt={user.data.name}
                      />
                      <AvatarFallback>
                        {user.data.name}
                      </AvatarFallback>
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
          </>
        ) : (
          <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
            <Button size="sm" variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button className="" size="sm" asChild>
              <Link href="/signup">Signup to Itineary Generator</Link>
            </Button>
          </div>
        )}
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden md:hidden sm:hidden"
          >
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col justify-between items-start"
        >
          <div className="">
            <div className="flex space-x-1 border-b-2 pb-4 ">
              <Link href="/" className="text-xl font-bold text-primary">
                GlobeGuide
              </Link>
            </div>

            <nav className="grid gap-2 py-6 space-y-4 text-xl ">
              <Link
                href="/create-trip"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              >
                Create Trip
              </Link>
              {user && (
                <Link
                  href="/my-trips"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                >
                  My Trips
                </Link>
              )}
            </nav>
          </div>
          <SheetFooter className="w-full">
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex-col md:flex-row items-center px-4">
                <div className="flex-shrink-0 pl-[2rem]">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt={user.data.name}
                    />
                    <AvatarFallback>{user.data.name}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <div className="md:text-md text-sm font-medium text-gray-800">
                    {user.data.name}
                  </div>
                  <div className="text-[11px] md:text-sm font-medium text-gray-500">
                    {user.data.email}
                  </div>
                </div>
              </div>
              <div className="mt-4  space-y-1">
                <Button variant="destructive" className="w-full justify-start">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

function CompassIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}
