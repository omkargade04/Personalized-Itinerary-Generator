import { ItineraryModel } from "../../../database/interface/itinerary.interface";

interface Itinerary {
    budget: string;
    noOfDays: number;
    traveler: string;
    location: string;
    hotels: (any | string)[];
    itinerary: (any | string)[];
};


export const saveItinerary = async(req: any, res: any) => {

    const userId = req.user._id;
    const itinerary: Itinerary = req.body;

    const NewItinerary = {
        userId: userId,
        budget: itinerary.budget,
        noOfDays: itinerary.noOfDays,
        traveler: itinerary.traveler,
        location: itinerary.location,
        hotels: itinerary.hotels,
        itinerary: itinerary.itinerary
    }

    if(!itinerary) {
        return res.status(400).json({status: false, message: "Itinerary not found"});
    }

    try{
        const newItinerary = new ItineraryModel(NewItinerary);
        const response = await newItinerary.save();
        if(response) {
            return res.status(201).json({status: true, data: response, message: "Itinerary saved successfully!"});
        } else {
            return res.status(400).json({status: false, message: "Itinerary not saved"});
        }
    }catch(err: any) {
        console.log("Error: ", err);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

export const getAItinerary = async(req: any, res: any) => {
    try{
        const tripId = req.params.tripId;
        const trip = await ItineraryModel.findById(tripId);
        if(trip) {
            return res.status(200).json({status: true, data: trip, message: "Itinerary retrieved successfully!"});
        } else {
            return res.status(404).json({status: false, message: "Itinerary not found"});
        }
    }catch(err: any) {
        console.log("Error: ", err);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

export const getUsersItinerary = async(req: any, res: any) => {
    try{
        const userId = req.user._id;
        const itinerary = await ItineraryModel.find({userId});
        // console.log(itinerary)
        if(itinerary) {
            return res.status(200).json({status: true, data: itinerary, message: "Itinerary retrieved successfully!"});
        } else {
            return res.status(404).json({status: false, message: "Itinerary not found"});
        }
    }catch(err: any) {
        console.log("Error: ", err);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}