import { Router } from "express"
// import { itineraryRouter } from "./routes/itinerary.routes";
import { router } from "./routes/routes";

const KeyModule = Router()


KeyModule.use("/key/v2", router)

export { KeyModule };