"use client";

import { Button } from "@/src/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetFooter,
} from "@/src/components/ui/sheet";
import { useAuth } from "@/src/context/Auth";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoLogoBuffer } from "react-icons/io";
import { LuLogOut, LuUser2 } from "react-icons/lu";
import { Popover, PopoverTrigger } from "../ui/popover";
import {
  FaAngleDown,
  FaAngleUp,
  FaCaretDown,
  FaCaretUp,
  FaSearch,
} from "react-icons/fa";
import { toast } from "sonner";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";

export const Navbar = () => {
  const { authState: user } = useAuth();
  const pathName = usePathname();
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);

  const handleLogout = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (err: any) {}
  };

  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-lg  bg-white flex items-center">
      <div className="hidden sm:flex lg:flex md:max-w-screen-2xl mx-auto items-center w-full justify-between">
        <div className="flex space-x-4">
          <CompassIcon
            className="h-8 w-8 hover:cursor-pointer"
            onClick={() => router.push("/")}
          />
          <p
            className="text-xl font-bold hover:cursor-pointer pt-1"
            onClick={() => router.push("/")}
          >
            Itinerary Generator
          </p>
        </div>
        <div className="flex md:pr-36 pr-28 space-x-4">
          <div className=" text-black p-2 border border-black rounded-md">
            <Link href="/create-trip">Create Trip + </Link>
          </div>
          {user && (
            <div className=" text-black p-2 border border-black rounded-md">
              <Link href="/my-trips">My Trips </Link>
            </div>
          )}
        </div>
        {user.token ? (
          <>
            <div
              className="flex items-center space-x-2 cursor-pointer bg-black rounded-md p-2"
              onClick={() => setShowProfile(!showProfile)}
            >
              <LuUser2 className="h-6 w-6 text-white" />
              {!showProfile ? (
                <FaCaretDown className="h-4 w-4 text-white" />
              ) : (
                <FaCaretUp className="h-4 w-4 text-white" />
              )}
            </div>
            {showProfile && (
              <div
                className="absolute right-[0.5rem] md:right-[-2rem] p-2 py-1.5 z-10 bg-white mt-20 mr-28 border rounded-lg 
                w-[10rem] h-[7rem] shadow-md flex flex-col justify-center items-center space-y-2 "
              >
                <div
                  className="flex items-center w-full
                hover:bg-zinc-100 rounded-md p-1 hover:cursor-pointer gap-x-4 px-2 text-sm"
                >
                  <LuUser2 className={`h-4 w-4 text-primary`} />
                  <Link href={"/"} className="font-semibold">
                    {user.data.name}
                  </Link>
                </div>
                <div
                  className="flex items-center w-full
                hover:bg-zinc-100 rounded-md p-1 hover:cursor-pointer gap-x-4 px-2 text-sm"
                >
                  <FiLogOut className="h-4 w-4 items-start text-red-500 " />
                  <span
                    onClick={handleLogout}
                    className="text-red-500 font-semibold"
                  >
                    Logout
                  </span>
                </div>
              </div>
            )}
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
              <IoLogoBuffer className="h-10 w-10 p-2" />
              <p className="font-semibold pt-2">Itineary Generator</p>
            </div>

            <nav className="grid gap-2 py-6 space-y-6 text-xl ">
              <div
                className={pathName === "/" ? "font-semibold" : "font-medium"}
              >
                <Link href="/">Create Trip</Link>
              </div>
              {user && (
                <div
                  className={pathName === "/" ? "font-semibold" : "font-medium"}
                >
                  <Link href="/my-trips">My Trips</Link>
                </div>
              )}
            </nav>
          </div>
          <SheetFooter className="w-full">
            <div className="h-[5rem] w-full rounded-lg border border-slate-400 flex flex-col justify-center items-center">
              <div className="text-xl font-semibold ">{user.data.name}</div>
              <div className="flex text-xl text-red-500 space-x-2 hover:cursor-pointer">
                Logout
                <LuLogOut className="text-red-500 pt-1 h-6 w-6" />
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
