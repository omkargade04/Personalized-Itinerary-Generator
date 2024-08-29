"use client";

import api, { baseURL } from "@/api/api";
import HotelInfo from "@/components/view-trip/HotelInfo";
import InfoSection from "@/components/view-trip/InfoSection";
import Places from "@/components/view-trip/Places";
import { useAuth } from "@/context/Auth";
import { Itinerary } from "@/types";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ViewTrip = () => {
  const id = useParams();

  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const { authState: token } = useAuth();
  const authToken = token.token;

  const router = useRouter();

  const getItineraryData = async () => {
    try {
      const response = await api.get(`${baseURL}/api/itinerary/v2/${id.tripId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const setData = response.data.data;
      setItinerary(setData);
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    getItineraryData();
  }, [id.tripId]);

  if(!authToken) {
    router.push("/login");
  }

  return (
    <div className="p-6 md:px-20 lg:px-44 ">
      {/* Info section */}
      {itinerary && <InfoSection itinerary={itinerary} />}

      {/* Hotels */}
      {itinerary && <HotelInfo itinerary={itinerary} />}

      {/* Place  */}
      {itinerary && <Places itinerary={itinerary} />}
    </div>
  );
};

export default ViewTrip;
