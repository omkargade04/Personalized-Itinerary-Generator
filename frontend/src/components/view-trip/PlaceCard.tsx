import { Place } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TravelImage from "@/public/travel.jpg";
import { Button } from "../ui/button";
import { FaMapMarkedAlt } from "react-icons/fa";
import Link from "next/link";
import { PHOTO_REF_URL, PlaceDetails } from "@/src/service/GlobalAPI";
import { useRouter } from "next/navigation";

const PlaceCard = ({ place }: { place: Place }) => {
  const [photo, setPhoto] = useState("");
  const router = useRouter();
  const getPlacePhoto = async () => {
    const data = {
      textQuery: place?.placeName,
    };

    const response = await PlaceDetails(data).then((res) => {
      // console.log("This is places data: ",res.data.places[0].photos[3].name);

      const photoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        res.data.places[0].photos[3].name
      );
      setPhoto(photoUrl);
    });
  };

  useEffect(() => {
    place && getPlacePhoto();
  }, [place]);

  return (
    <Link
      href={"https://google.com/maps/search/?api=1&query=" + place?.placeName}
      target="_blank"
    >
      <div className=" border rounded-xl p-3 mt-2 shadow-md md:flex-row flex flex-col gap-x-4 hover:scale-105 transition-all cursor-pointer">
        <Image
          src={photo ? photo : TravelImage}
          alt="travel"
          height={200}
          width={300}
          quality={100}
          layout="fixed"
          className="h-[150px] object-cover rounded-xl"
        />
        <div className="space-y-2">
          <h2 className="font-bold text-sm lg:text-lg md:text-md">
            {place.placeName}
          </h2>
          <p className="text-sm text-gray-400">{place?.placeDetails}</p>
          <p className="">⌛{place?.timeToTravel}</p>
          <Button
            onClick={() =>
              window.open(
                `https://google.com/maps/search/?api=1&query= + ${place?.placeName}`,
                "_blank"
              )
            }
          >
            <FaMapMarkedAlt className="h-7 w-7 p-1" />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;
