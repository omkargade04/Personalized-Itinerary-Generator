"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItineraryService = void 0;
const itinerary_interface_1 = require("../../../database/interface/itinerary.interface");
class ItineraryService {
    saveItinerary(itineraryData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const NewItinerary = {
                userId: userId,
                budget: itineraryData.budget,
                noOfDays: itineraryData.noOfDays,
                traveler: itineraryData.traveler,
                location: itineraryData.location,
                hotels: itineraryData.hotels,
                itinerary: itineraryData.itinerary
            };
            try {
                const newItinerary = new itinerary_interface_1.ItineraryModel(NewItinerary);
                const response = yield newItinerary.save();
                return response;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log("Error in itinerary-service:", error.message);
                    throw error;
                }
                else {
                    throw new Error("Error occures");
                }
            }
        });
    }
    getAnItinerary(tripId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trip = yield itinerary_interface_1.ItineraryModel.findById(tripId);
                if (!trip) {
                    throw new Error("Itinerary not found");
                }
                // console.log(trip)
                return trip;
                // const { _id, ...rest } = trip.toObject();
                // return { _id: _id.toString(), ...rest } as Itinerary;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log("Error in itinerary-service:", error.message);
                    throw error;
                }
                else {
                    throw new Error("Error occures");
                }
            }
        });
    }
    getUsersItinerary(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const itineraries = yield itinerary_interface_1.ItineraryModel.find({ userId });
                return itineraries;
                // return itineraries.map(doc => ({
                //     ...doc.toObject(),
                //     _id: doc._id.toString()
                // }));
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log("Error in itinerary-service:", error.message);
                    throw error;
                }
                else {
                    throw new Error("Error occures");
                }
            }
        });
    }
}
exports.ItineraryService = ItineraryService;
