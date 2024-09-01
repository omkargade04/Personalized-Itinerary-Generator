"use client";

import { Hotel } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TravelImage from "@/public/travel.jpg";
import { Button } from "../ui/button";
import { FaMapMarkedAlt } from "react-icons/fa";
import Link from "next/link";
import { PHOTO_REF_URL, PlaceDetails } from "@/src/service/GlobalAPI";
import { useRouter } from "next/navigation";

const HotelCard = ({ hotel }: { hotel: Hotel }) => {
  const [photo, setPhoto] = useState("");
  const router = useRouter();
  const getPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
    };

    const response = await PlaceDetails(data).then((res) => {
      console.log("This is places data: ", res.data);

      const photoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        res.data.places[0].photos[3].name
      );
      setPhoto(photoUrl);
    });
  };

  useEffect(() => {
    hotel && getPlacePhoto();
  }, [hotel]);

  return (
    <div>
      <Image
        src={photo ? photo : TravelImage}
        alt="Travel"
        height={100}
        width={1200}
        quality={100}
        layout="fixed"
        className=" h-[150px] md:h-[200px] object-cover rounded-xl shadow-md"
      />
      <div className="flex">
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium ">{hotel?.hotelName}</h2>
          <h2 className="text-xs text-gray-400">📍{hotel?.hotelAddress}</h2>
          <h2 className="text-sm">💰{hotel?.price}</h2>
          <h2 className="text-sm">⭐{hotel?.rating}</h2>
        </div>
        <div className="pt-28 pr-2 md:pt-24 md:pr-2">
          <Button
            onClick={() =>
              window.open(
                `https://google.com/maps/search/?api=1&query=${encodeURIComponent(
                  hotel?.hotelName
                )}`,
                "_blank"
              )
            }
          >
            <FaMapMarkedAlt className="h-7 w-7 p-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
