import { ItineraryService } from "../services";

export class ItineraryController{
    private itineraryService: ItineraryService;

    constructor() {
        this.itineraryService = new ItineraryService();
    }

    async saveItinerary(req:any, res: any) {
        const userId = req.user._id;
        const itinerary = req.body;
        try{
            const itneraryData = await this.itineraryService.saveItinerary(itinerary, userId);
            if(itneraryData) {
                return res.status(201).json({status: true, data: itneraryData, message: "Itinerary saved successfully!"});
            } else {
                return res.status(400).json({status: false, message: "Itinerary not saved"});
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log("Erorr in itinerary-controller:", error.message)
                res.status(500).send({ message: error.message });
            }
        }
    }

    async getAnItinerary(req:any, res: any) {
        const tripId = req.params.tripId;
        try{
            const trip = await this.itineraryService.getAnItinerary(tripId);
            if(trip) {
                return res.status(200).json({status: true, data: trip, message: "Itinerary received successfully!"});
            } else {
                return res.status(404).json({status: false, message: "Itinerary not found"});
            }
        }catch (error) {
            if (error instanceof Error) {
                console.log("Erorr in itinerary-controller:", error.message)
                res.status(500).send({ message: error.message });
            }
        }
    }

    async getUsersItinerary(req: any, res: any) {
        const userId = req.user._id;
        try{
            const itineraries = await this.itineraryService.getUsersItinerary(userId);
            if(itineraries) {
                return res.status(200).json({status: true, data: itineraries, message: "Itinerary received successfully!"});
            } else {
                return res.status(404).json({status: false, message: "Itinerary not found"});
            }
        }catch (error) {
            if (error instanceof Error) {
                console.log("Erorr in itinerary-controller:", error.message)
                res.status(500).send({ message: error.message });
            }
        }
    }
}