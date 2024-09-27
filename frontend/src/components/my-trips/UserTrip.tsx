/* eslint-disable react-hooks/exhaustive-deps */
import { Itinerary } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TravelImage from "@/public/travel.jpg";
import { PHOTO_REF_URL, PlaceDetails } from "@/src/service/GlobalAPI";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { IoIosSend } from "react-icons/io";
import { Skeleton } from "../ui/skeleton"; // Assume you have a Skeleton component for loading

const UserTrip = ({ trip }: { trip: Itinerary }) => {
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.location,
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
    if (trip) getPlacePhoto();
  }, [trip]);

  return (
    <div className="">
      <div className="hover:scale-105 transition-all w-full space-y-4 bg-gray-100 p-4 rounded-lg">
        {loading ? (
          <Skeleton className="h-[150px] md:h-[200px] w-full rounded-xl" />
        ) : (
          <Image
            src={photo ? photo : TravelImage}
            alt="Travel"
            height={100}
            width={1200}
            quality={100}
            layout="fixed"
            className="h-[150px] md:h-[200px] w-full object-cover rounded-xl shadow-md"
            loading="lazy"
          />
        )}
        <div className="">
          <h2 className="font-bold md:text-lg">{trip?.location}</h2>
          <h2 className="text-xs md:text-sm text-gray-500">
            {trip?.noOfDays} Days with {trip?.budget} Budget
          </h2>
        </div>
        <Button
          className="w-full bg-slate-500"
          onClick={() => router.push(`/view-trip/${trip._id}`)}
        >View Itinerary</Button>
      </div>
    </div>
  );
};

export default UserTrip;
