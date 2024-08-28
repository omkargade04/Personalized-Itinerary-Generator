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
exports.getUsersItinerary = exports.getAItinerary = exports.saveItinerary = void 0;
const itinerary_interface_1 = require("../../../database/interface/itinerary.interface");
;
const saveItinerary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const itinerary = req.body;
    const NewItinerary = {
        userId: userId,
        budget: itinerary.budget,
        noOfDays: itinerary.noOfDays,
        traveler: itinerary.traveler,
        location: itinerary.location,
        hotels: itinerary.hotels,
        itinerary: itinerary.itinerary
    };
    if (!itinerary) {
        return res.status(400).json({ status: false, message: "Itinerary not found" });
    }
    try {
        const newItinerary = new itinerary_interface_1.ItineraryModel(NewItinerary);
        const response = yield newItinerary.save();
        if (response) {
            return res.status(201).json({ status: true, data: response, message: "Itinerary saved successfully!" });
        }
        else {
            return res.status(400).json({ status: false, message: "Itinerary not saved" });
        }
    }
    catch (err) {
        console.log("Error: ", err);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});
exports.saveItinerary = saveItinerary;
const getAItinerary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tripId = req.params.tripId;
        const trip = yield itinerary_interface_1.ItineraryModel.findById(tripId);
        if (trip) {
            return res.status(200).json({ status: true, data: trip, message: "Itinerary retrieved successfully!" });
        }
        else {
            return res.status(404).json({ status: false, message: "Itinerary not found" });
        }
    }
    catch (err) {
        console.log("Error: ", err);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});
exports.getAItinerary = getAItinerary;
const getUsersItinerary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const itinerary = yield itinerary_interface_1.ItineraryModel.find({ userId });
        // console.log(itinerary)
        if (itinerary) {
            return res.status(200).json({ status: true, data: itinerary, message: "Itinerary retrieved successfully!" });
        }
        else {
            return res.status(404).json({ status: false, message: "Itinerary not found" });
        }
    }
    catch (err) {
        console.log("Error: ", err);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});
exports.getUsersItinerary = getUsersItinerary;
