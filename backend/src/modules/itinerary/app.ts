import { Router } from "express"
// import { itineraryRouter } from "./routes/itinerary.routes";
import { router } from "./routes/routes";

const ItineraryModule = Router()

// ItineraryModule.use("/itinerary", itineraryRouter)
ItineraryModule.use("/itinerary", router)

export { ItineraryModule };