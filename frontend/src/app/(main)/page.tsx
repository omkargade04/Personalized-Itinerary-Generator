"use client";




import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import AnimatedGradientText from "@/src/components/magicui/animated-gradient-text";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Globe from "@/src/components/magicui/globe";
import { useAuth } from "@/src/context/Auth";
import api, { baseURL } from "@/src/api/api";
import { AuroraBackground } from "@/src/components/ui/aurora-background";

function LandingPage() {
  const router = useRouter();
  const { authState: token } = useAuth();
  const authToken = token.token;
  const hasFetched = useRef(false);
  const [keyGenerated, setKeyGenerated] = useState(false);

  const fetchKeyData = async () => {
    try {
      const cachedKey = await api.get(`${baseURL}/api/key/v2`);
      console.log(cachedKey);
      if (cachedKey.status) {
        setKeyGenerated(true);
        return;
      }

      const response = await api.post(`${baseURL}/api/key/v2/`);
      if (response.status) {
        setKeyGenerated(true);
      }
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  return (
    <div className=" flex flex-col h-screen fixed">
      <main className="relative z-30">
        <AuroraBackground>
          <div className="z-20 ">
            <motion.div
              initial={{ opacity: 0.0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="relative flex flex-col gap-4 items-center justify-center px-4"
            >
              <div className="max-w-md w-full space-y-8 text-center relative z-10 pt-6 ">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div>
                    <AnimatedGradientText className="">
                      <span
                        className={cn(
                          `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] text-4xl font-semibold bg-clip-text text-transparent`
                        )}
                      >
                        Trip Planner
                      </span>
                    </AnimatedGradientText>
                  </div>
                  <h1 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-3xl md:text-5xl bg">
                    Explore the World Your Way
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl  rounded-full">
                    This AI powered personalized travel itinerary is tailored
                    just for you! Our customized journey will ensure every
                    detail aligns with your preferences and dreams.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {authToken ? (
                    <div className="flex justify-center items-center gap-2 w-full pb-4 md:pb-0">
                      <Button onClick={() => router.push("/create-trip")}>
                        Get Started
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full md:pb-0">
                      <Button onClick={() => router.push("/login")}>
                        Login
                      </Button>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
            <section className="md:flex items-center h-[100vh] md:h-[15rem] justify-center ">
              <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg px-40 pb-80 md:pb-60">
                <Globe className="bottom-28" />
              </div>
            </section>
          </div>
        </AuroraBackground>
      </main>
    </div>
  );
}

export default LandingPage;
