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
import React, { useEffect, useState } from "react";
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

  const getItineraryData = async () => {
    try {
      const response = await api.get(
        `${baseURL}/api/itinerary/v2/${id.tripId}`
      );
      const setData = response.data.data;
      setItinerary(setData);
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    getItineraryData();
  }, [id.tripId]);

  const [photo, setPhoto] = useState("");

  const getPlacePhoto = async () => {
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
  };

  useEffect(() => {
    itinerary && getPlacePhoto();
  }, [itinerary]);

  return (
    <div className="p-6 md:px-20 lg:px-44 ">
      {/* Info section */}
      <div className="flex flex-col justify-center items-start ">
        <Image
          src={photo ? photo : TravelImage}
          alt="Travel"
          height={100}
          width={1200}
          quality={100}
          layout="fixed"
          className=" h-[150px] md:h-[340px] object-cover rounded-xl shadow-md"
        />
        <div className="flex justify-between w-full">
          <div className="my-5 gap-2">
            <h2 className="font-bold text-2xl pb-2">{itinerary?.location}</h2>
            <div className="flex gap-x-4">
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
          <div className="pt-14 pl-2 md:pl-0">
            <Button>
              <IoIosSend className="h-7 w-7 p-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Hotels */}
      <div>
        <h2 className="font-bold text-xl mt-5 pb-2">
          Hotels recommended for you
        </h2>

        <div className="grid md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {itinerary?.hotels?.map((hotel, index) => (
            <div key={index} className="hover:scale-105 transition-all">
              <HotelCard hotel={hotel} />
            </div>
          ))}
        </div>
      </div>

      {/* Place  */}
      <div>
        <h2 className="font-bold text-lg">Places to visit</h2>
        <div className="">
          {itinerary?.itinerary.map((item, index) => (
            <div key={index} className="space-y-4">
              <h2 className="font-bold text-lg pt-4">Day {item.day}</h2>
              {item.plan.map((place: any, index: any) => (
                <div key={index} className="">
                  <h2 className="font-medium text-sm text-yellow-400">
                    Time required: {place?.timeToTravel}
                  </h2>
                  {place && <PlaceCard place={place} />}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewTrip;
