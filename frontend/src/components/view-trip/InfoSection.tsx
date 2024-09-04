/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Itinerary } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TravelImage from "@/public/travel.jpg";
import { Button } from "../ui/button";
import { IoIosSend } from "react-icons/io";
import { PHOTO_REF_URL, PlaceDetails } from "@/src/service/GlobalAPI";
import { Skeleton } from "../ui/skeleton"; // Assume you have a Skeleton component for loading

const InfoSection = ({ itinerary }: { itinerary: Itinerary }) => {
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(true);

  const getPlacePhoto = async () => {
    try {
      const data = {
        textQuery: itinerary?.location,
      };

      const response = await PlaceDetails(data);
      const photoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        response.data.places[0].photos[3].name
      );
      setPhoto(photoUrl);
    } catch (error) {
      console.error("Failed to fetch the photo:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (itinerary) getPlacePhoto();
  }, [itinerary]);

  return (
    <div className="flex flex-col justify-center items-start">
      {loading ? (
        <Skeleton className="h-[150px] md:h-[340px] w-full rounded-xl shadow-md" />
      ) : (
        <Image
          src={photo ? photo : TravelImage}
          alt="Travel"
          height={100}
          width={1200}
          quality={100}
          layout="fixed"
          className="h-[150px] md:h-[340px] object-cover rounded-xl shadow-md"
          loading="lazy"
        />
      )}
      <div className="flex justify-between w-full">
        <div className="my-5 gap-2">
          <h2 className="font-bold md:text-2xl pb-2 sm:text-xl text-lg">
            {itinerary?.location}
          </h2>
          <div className="flex-col flex md:flex-row lg:flex-row space-y-2 md:space-y-0 lg:space-y-0 gap-x-4">
            <h2 className="p-1 px-3 bg-gray-100 rounded-full text-xs md:text-md text-gray-500">
              📅{itinerary?.noOfDays} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-100 rounded-full text-xs md:text-md text-gray-500">
              🪙 Budget: {itinerary?.budget}
            </h2>
            <h2 className="p-1 px-3 bg-gray-100 rounded-full text-xs md:text-md text-gray-500">
              🧑🏼‍🤝‍🧑🏼 No. of Travelers {itinerary?.traveler}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
