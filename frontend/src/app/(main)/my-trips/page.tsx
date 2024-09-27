"use client";

import { cn } from "@/lib/utils";
import api, { baseURL } from "@/src/api/api";
import DotPattern from "@/src/components/magicui/dot-pattern";
import UserTrip from "@/src/components/my-trips/UserTrip";
import { useAuth } from "@/src/context/Auth";
import { Itinerary } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [itinerary, setItinerary] = useState([]);

  const { authState: token } = useAuth();

  const authToken = token.token;

  const router = useRouter();

  const getUsersItinerary = async () => {
    try {
      const response = await api.get(`${baseURL}/api/itinerary/v2`);
      setItinerary(response.data.data);
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    getUsersItinerary();
  }, [authToken]);

  if (!authToken) {
    router.push("/login");
  }

  return (
    <div className="relative flex flex-col h-full w-full bg-white items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl">
      <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl">My Trips</h2>
      <div className="max-w-6xl w-full mx-auto">
        {itinerary.length > 0 ? (
          <div className="grid grid-cols-1 mt-10 md:grid-cols-2 gap-10">
            {itinerary.map((trip: any, index: any) => (
              <div className="" key={index}>
                <UserTrip trip={trip} />
              </div>
            ))}
          </div>
        ) : (
          <div className="pt-20">No trips generated yet!</div>
        )}

        <DotPattern
          width={15}
          height={15}
          cx={2}
          cy={2}
          cr={1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
          )}
        />
      </div>
    </div>
  );
};

export default Page;
