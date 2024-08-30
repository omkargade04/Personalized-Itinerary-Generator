import { ItineraryModel } from "../../../database/interface/itinerary.interface";
import { Itinerary, ItineraryData } from "../../../types";

export class ItineraryService {
    async saveItinerary(itineraryData: ItineraryData, userId: String): Promise<ItineraryData> {

        const NewItinerary = {
            userId: userId,
            budget: itineraryData.budget,
            noOfDays: itineraryData.noOfDays,
            traveler: itineraryData.traveler,
            location: itineraryData.location,
            hotels: itineraryData.hotels,
            itinerary: itineraryData.itinerary
        }
        try{
            const newItinerary = new ItineraryModel(NewItinerary);
            const response = await newItinerary.save();
            return response;
        }catch(error: any) {
            if (error instanceof Error) {
                console.log("Error in itinerary-service:", error.message)
        
                throw error;
            }
            else {
                throw new Error("Error occures");
            }
        }
    }

    async getAnItinerary(tripId: String): Promise<Itinerary> {
        try {
            const trip = await ItineraryModel.findById(tripId);
            if (!trip) {
                throw new Error("Itinerary not found");
            }
            const { _id, ...rest } = trip.toObject();
            return { _id: _id.toString(), ...rest } as Itinerary;
        } catch(error: any) {
            if (error instanceof Error) {
                console.log("Error in itinerary-service:", error.message)
        
                throw error;
            }
            else {
                throw new Error("Error occures");
            }
        }
    }

    async getUsersItinerary(userId: String): Promise<Itinerary[]> {
        try {
            const itineraries = await ItineraryModel.find({userId});
            return itineraries.map(doc => ({
                ...doc.toObject(),
                _id: doc._id.toString()
            }));
        } catch(error: any) {
            if (error instanceof Error) {
                console.log("Error in itinerary-service:", error.message)
        
                throw error;
            }
            else {
                throw new Error("Error occures");
            }
        }
    }
}