/* 

budget
: 
"Moderate"
hotels
: 
(3) [{…}, {…}, {…}]
itinerary
: 
(5) [{…}, {…}, {…}, {…}, {…}]
location
: 
"New Delhi, Delhi, India"
noOfDays
: 
5
traveler
: 
"4 to 6 people"
*/

import mongoose, { Schema, Document, Model } from "mongoose";

interface Itinerary {
    userId: string;
    budget: string;
    noOfDays: number;
    traveler: string;
    location: string;
    hotels: (any | string)[];
    itinerary: (any | string)[];
};

const ItinerarySchema: Schema = new Schema(
    {
        userId: {
            type: String,
            required: true
        },
        budget: {
            type: String,
            required: [true, "Budget is required"],
        },
        noOfDays: {
            type: Number,
            required: [true, "Number of days is required"],
        },
        traveler: {
            type: String,
            required: [true, "No. of travelers are reuqired"]
        },
        location: {
            type: String,
            required: [true, "Location is required"]
        },
        hotels: {
            type: [Schema.Types.Mixed],
            reuqired: true
        },
        itinerary: {
            type: [Schema.Types.Mixed],
            reuqired: true
        }
    },
    {timestamps: true}
);

let ItineraryModel: Model<Itinerary>;

try{
    ItineraryModel = mongoose.model<Itinerary>("ItineraryResultV2");
} catch {
    ItineraryModel = mongoose.model<Itinerary>("ItineraryResultV2", ItinerarySchema);
}

export {ItineraryModel};