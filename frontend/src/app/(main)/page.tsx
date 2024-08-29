"use client";

import Link from "next/link";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import TravelImage from "@/public/travel.jpg";
import TravelImage2 from "@/public/travelling.jpg";
import { useAuth } from "@/src/context/Auth";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import api, { baseURL } from "@/src/api/api";
import { headers } from "next/headers";

const Page = () => {
  const { authState: token } = useAuth();
  const authToken = token.token;
  const router = useRouter();
  const hasFetched = useRef(false);
  const [keyGenerated, setKeyGenerated] = useState(false);

  const fetchKeyData = async () => {
    try {
      const cachedKey = await api.get(`${baseURL}/api/key/v2`);
      console.log(cachedKey)
      if (cachedKey.status) {
        setKeyGenerated(true);
        return;
      }

      const response = await api.post(`${baseURL}/api/key/v2/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.status) {
        setKeyGenerated(true);
      }
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  // useEffect(() => {
  //   if (!hasFetched.current) {
  //     hasFetched.current = true;
  //     fetchKeyData();
  //   }
  // }, []);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Discover Your Perfect Trip
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our Personalized Itinerary Generator helps you plan your
                    dream vacation. Customize your trip, get personalized
                    recommendations, and share your itinerary with friends.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/create-trip"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <Image
                src={TravelImage}
                alt="Hero"
                className="mx-auto h-[350px] aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                width={1000}
                height={250}
                quality={100}
                layout="fixed"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Personalized Recommendations
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Tailored to Your Preferences
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our algorithm analyzes your travel preferences and creates a
                  personalized itinerary just for you. Discover hidden gems and
                  must-see attractions based on your interests.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                src={TravelImage2}
                alt="Personalized Recommendations"
                className="mx-auto h-[350px] aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                width={1000}
                height={250}
                quality={100}
                layout="fixed"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Customize Your Trip</h3>
                      <p className="text-muted-foreground">
                        Tailor your itinerary by selecting your interests,
                        budget, and travel dates.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Personalized Recommendations
                      </h3>
                      <p className="text-muted-foreground">
                        Get personalized suggestions for activities, dining, and
                        accommodations based on your preferences.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Share Your Itinerary
                      </h3>
                      <p className="text-muted-foreground">
                        Easily share your personalized itinerary with friends
                        and family.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Discover Your Perfect Trip
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our Personalized Itinerary Generator helps you plan your dream
                vacation. Customize your trip, get personalized recommendations,
                and share your itinerary with friends.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <Link
                href="/create-trip"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Plan Your Dream Vacation
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our Personalized Itinerary Generator makes it easy to plan your
                perfect trip. Get started today and discover your dream
                destination.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2 flex flex-col justify-center items-center">
              {authToken ? (
                <div className="flex gap-2">
                  <Button onClick={() => router.push("/create-trip")}>
                    Get Started
                  </Button>
                </div>
              ) : (
                <div className="">
                  <Button onClick={() => router.push("/login")}>Login</Button>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Sign up to start planning your dream vacation.{" "}
                <Link
                  href="#"
                  className="underline underline-offset-2"
                  prefetch={false}
                >
                  Terms &amp; Conditions
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Itinerary Generator. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default Page;
