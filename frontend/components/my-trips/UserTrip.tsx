import { Itinerary } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TravelImage from "@/public/travel.jpg";
import { PHOTO_REF_URL, PlaceDetails } from "@/service/GlobalAPI";
import Link from "next/link";

const UserTrip = ({ trip }: { trip: Itinerary }) => {
  const [photo, setPhoto] = useState("");

  const getPlacePhoto = async () => {
    const data = {
      textQuery: trip?.location,
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
    trip && getPlacePhoto();
  }, [trip]);

  return (
    <>
      <Link href={`/view-trip/${trip._id}`} >
        <div className="hover:scale-105 transition-all cursor-pointer">
          <Image
            src={photo ? photo : TravelImage}
            alt="Travel"
            height={100}
            width={1200}
            quality={100}
            layout="fixed"
            className=" h-[150px] md:h-[200px] w-full object-cover rounded-xl shadow-md"
          />
          <div className="">
            <h2 className="font-bold md:text-lg ">{trip?.location}</h2>
            <h2 className="text-xs md:text-sm text-gray-500">
              {trip?.noOfDays} Days with {trip?.budget} Budget
            </h2>
          </div>
        </div>
      </Link>
    </>
  );
};

export default UserTrip;
