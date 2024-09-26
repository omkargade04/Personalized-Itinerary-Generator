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
import { LoginForm } from "@/types";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const router = useRouter();
  const { setUserAuthInfo } = useAuth();
  const [user, setUser] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [shownPassword, setShownPassword] = useState(false);

  const userPassword = user.password;

  const toggleShownPassword = () => {
    setShownPassword((prev) => !prev);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const loadingToast = toast.loading("Signin in...");
    setLoading(true);

    const email = user.email;
    const password = user.password;

    if (!email || !password) {
      toast.error("All fields required");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/api/user/login`, {
        email: email,
        password: password,
      });
      toast.dismiss(loadingToast);
      // console.log(response.data)
      if(!response.data.success) {
        toast.error(response.data.message);
        setLoading(false);
        return;
      }
      setUserAuthInfo(response.data);
      toast.success(response.data.message);
      setLoading(false);
      router.push("/");
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-200">
      <form onSubmit={handleSubmit}>
        <Card className="w-full max-w-md bg-white border border-input">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your email and password to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
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
              <p>Don&apos;t have an account?</p>
              <Link href="/signup" className="font-semibold underline">
                Signup
              </Link>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={loading}>
              Login
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Login;
