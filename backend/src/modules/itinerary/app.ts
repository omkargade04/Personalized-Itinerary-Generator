import { Router } from "express"
import { itineraryRouter } from "./routes/itinerary.routes";
import { router } from "./routes/routes";

const ItineraryModule = Router()

//Code written using usual methods in v1
ItineraryModule.use("/itinerary/v1", itineraryRouter)

//Code written using OOP in v2
ItineraryModule.use("/itinerary/v2", router)

export { ItineraryModule };