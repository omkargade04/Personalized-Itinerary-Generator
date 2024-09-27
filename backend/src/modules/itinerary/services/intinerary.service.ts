import { ItineraryModel } from "../../../database/interface/itinerary.interface";
import UserModel from "../../../database/interface/user.interface";
import { Itinerary, ItineraryData } from "../../../types";
import { emailService } from "../../../utils/mailingService";
import generatePdf from "../../../utils/pdfConverter";

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
            const user: any = await UserModel.findById(userId);

            if (!user) {
                throw new Error('User not found');
            }

            const newItinerary = new ItineraryModel(NewItinerary);
            
            // Generate the PDF
            const itineraryWithStringId = {
                ...newItinerary,
                _id: newItinerary._id.toString()
            };
            // console.log("Itineraary: ",itineraryWithStringId);
            
            const response = await newItinerary.save();

            const filePath = await generatePdf(itineraryWithStringId, user.name);

            // console.log(filePath)
            
            await emailService({
                email: user.email,
                name: user.name
            }, filePath, `Travel-Itinerary-${user._id}.pdf`);

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