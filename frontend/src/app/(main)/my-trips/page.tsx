"use client";

import api, { baseURL } from "@/src/api/api";
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
      const response = await api.get(`${baseURL}/api/itinerary/v2`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
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
    <div className="md:p-0 md:max-w-[60%] w-full mx-auto mt-10">
      <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl">My Trips</h2>
      {itinerary.length > 0 ? (
        <div className="grid grid-cols mt-10 md:grid-cols-3 gap-5">
          {itinerary.map((trip: any, index: any) => (
            <div className="" key={index}>
              <UserTrip trip={trip} />
            </div>
          ))}
        </div>
      ) : (
        <div className="pt-20">No trips generated yet!</div>
      )}
    </div>
  );
};

export default Page;
