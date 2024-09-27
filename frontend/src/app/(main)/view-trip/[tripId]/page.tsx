"use client";

import api, { baseURL } from "@/src/api/api";
import { Button } from "@/src/components/ui/button";
import HotelInfo from "@/src/components/view-trip/HotelInfo";
import InfoSection from "@/src/components/view-trip/InfoSection";
import Places from "@/src/components/view-trip/Places";
import { useAuth } from "@/src/context/Auth";
import { PHOTO_REF_URL, PlaceDetails } from "@/src/service/GlobalAPI";
import { Itinerary } from "@/types";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { IoIosSend } from "react-icons/io";
import TravelImage from "../../../../../public/travel.jpg";
import HotelCard from "@/src/components/view-trip/HotelCard";
import PlaceCard from "@/src/components/view-trip/PlaceCard";

const ViewTrip = () => {
  const id = useParams();

  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const { authState: token } = useAuth();
  const authToken = token.token;

  const router = useRouter();

  const getItineraryData = useCallback(async () => {
    try {
      const response = await api.get(
        `${baseURL}/api/itinerary/v2/${id.tripId}`
      );
      setItinerary(response.data.data);
    } catch (err: any) {
      console.log("Error: ", err);
    }
  }, [id.tripId]);

  useEffect(() => {
    getItineraryData();
  }, [getItineraryData]);

  const [photo, setPhoto] = useState("");

  const getPlacePhoto = useCallback(async () => {
    const data = {
      textQuery: itinerary?.location,
    };

    const response = await PlaceDetails(data).then((res) => {
      // console.log("This is places data: ",res.data.places[0].photos[3].name);

      const photoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        res.data.places[0].photos[3].name
      );
      setPhoto(photoUrl);
    });
  }, [itinerary?.location]);

  useEffect(() => {
    itinerary && getPlacePhoto();
  }, [itinerary, getPlacePhoto]);

  return (
    <div className=" p-[4rem] md:px-20 lg:px-44 ">
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
