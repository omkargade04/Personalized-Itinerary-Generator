/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Place } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TravelImage from "@/public/travel.jpg";
import { Button } from "../ui/button";
import { FaMapMarkedAlt } from "react-icons/fa";
import Link from "next/link";
import { PHOTO_REF_URL, PlaceDetails } from "@/src/service/GlobalAPI";
import { Skeleton } from "../ui/skeleton"; // Assume you have a Skeleton component for loading
import { useRouter } from "next/navigation";

const PlaceCard = ({ place }: { place: Place }) => {
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getPlacePhoto = async () => {
    try {
      const data = {
        textQuery: place?.placeName,
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
    if (place) getPlacePhoto();
  }, [place]);

  return (
    <div className="border rounded-xl p-3 mt-2 shadow-md md:flex-row flex flex-col gap-x-4 hover:scale-105 transition-all cursor-pointer">
      {loading ? (
        <Skeleton className="h-[150px] w-[300px] rounded-xl" />
      ) : (
        <Image
          src={photo ? photo : TravelImage}
          alt="travel"
          height={200}
          width={300}
          quality={100}
          layout="fixed"
          className="h-[150px] object-cover rounded-xl"
          loading="lazy"
        />
      )}
      <div className="space-y-2">
        <h2 className="font-bold text-sm lg:text-lg md:text-md">
          {place.placeName}
        </h2>
        <p className="text-sm text-gray-400">{place?.placeDetails}</p>
        <p>⌛{place?.timeToTravel}</p>
        <Button
          onClick={() =>
            window.open(
              `https://google.com/maps/search/?api=1&query=${place?.placeName}`,
              "_blank"
            )
          }
          className="w-full md:w-0"
        >
          <FaMapMarkedAlt className="h-7 w-7 p-1" />
        </Button>
      </div>
    </div>
  );
};

export default PlaceCard;
