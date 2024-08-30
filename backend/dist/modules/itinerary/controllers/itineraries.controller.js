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
exports.ItineraryController = void 0;
const services_1 = require("../services");
class ItineraryController {
    constructor() {
        this.itineraryService = new services_1.ItineraryService();
    }
    saveItinerary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user._id;
            const itinerary = req.body;
            try {
                const itneraryData = yield this.itineraryService.saveItinerary(itinerary, userId);
                if (itneraryData) {
                    return res.status(201).json({ status: true, data: itneraryData, message: "Itinerary saved successfully!" });
                }
                else {
                    return res.status(400).json({ status: false, message: "Itinerary not saved" });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log("Erorr in itinerary-controller:", error.message);
                    res.status(500).send({ message: error.message });
                }
            }
        });
    }
    getAnItinerary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tripId = req.params.tripId;
            try {
                const trip = yield this.itineraryService.getAnItinerary(tripId);
                if (trip) {
                    return res.status(200).json({ status: true, data: trip, message: "Itinerary received successfully!" });
                }
                else {
                    return res.status(404).json({ status: false, message: "Itinerary not found" });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log("Erorr in itinerary-controller:", error.message);
                    res.status(500).send({ message: error.message });
                }
            }
        });
    }
    getUsersItinerary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user._id;
            try {
                const itineraries = yield this.itineraryService.getUsersItinerary(userId);
                if (itineraries) {
                    return res.status(200).json({ status: true, data: itineraries, message: "Itinerary received successfully!" });
                }
                else {
                    return res.status(404).json({ status: false, message: "Itinerary not found" });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log("Erorr in itinerary-controller:", error.message);
                    res.status(500).send({ message: error.message });
                }
            }
        });
    }
}
exports.ItineraryController = ItineraryController;
