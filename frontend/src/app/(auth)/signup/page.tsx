"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/src/context/Auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import api, { baseURL } from "@/src/api/api";
import { LoginForm, RegisterForm } from "@/types";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Component() {
  const router = useRouter();
  const { setUserAuthInfo } = useAuth();
  const [user, setUser] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [shownPassword, setShownPassword] = useState(false);

  const userPassword = user.password;

  const toggleShownPassword = () => {
    setShownPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loadingToast = toast.loading("Registering...");
    setLoading(true);
    const name = user.name;
    const email = user.email;
    const password = user.password;


    if (!email || !password) {
      toast.error("All fields required");
      setLoading(false);
      return;
    }
    try {
      const result = await api.post(`${baseURL}/api/user/signup`, {
        name: name,
        email: email,
        password: password,
      });
      setUserAuthInfo(result.data);
      toast.dismiss(loadingToast);
      toast.success("User signed up successful");
      router.push("/");
    } catch (error: any) {
      toast.dismiss(loadingToast);
      console.error("Signup error:", error.message);
      toast.error("Error signing up");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[100dvh] px-4 md:px-6 bg-slate-200 ">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center w-full"
      >
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-col justify-center items-center">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your details below to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="text"
                placeholder="Enter your Email"
                value={user.email}
                name="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="space-y-2 flex relative">
              <Input
                type={shownPassword ? "text" : "password"}
                placeholder="Password"
                value={userPassword}
                name="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <span
                className="absolute right-5 pt-7 transform -translate-y-1/2 cursor-pointer"
                onClick={toggleShownPassword}
              >
                {shownPassword ? (
                  <FaEye className="text-[#060f17]" />
                ) : (
                  <FaEyeSlash className="text-[#03070b]" />
                )}
              </span>
            </div>
            <div className="flex justify-between text-xs pb-2">
              <p>Already have an account?</p>
              <Link href="/login" className="font-semibold underline">
                Login
              </Link>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
