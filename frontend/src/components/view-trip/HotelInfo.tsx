"use client";

import { Itinerary } from "@/types";
import React from "react";
import HotelCard from "./HotelCard";

const HotelInfo = ({ itinerary }: { itinerary: Itinerary }) => {
  return (
    <div>
      <h2 className="font-bold md:text-xl  text-lg mt-5 pb-2">
        Hotels recommended for you
      </h2>

      <div className="grid md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {itinerary?.hotels?.map((hotel, index) => (
          <div
            key={index}
            className="hover:scale-105 transition-all"
          >
            <HotelCard hotel={hotel} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelInfo;
