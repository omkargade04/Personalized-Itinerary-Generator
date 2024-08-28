import { Router } from "express";
import { ItineraryController } from "../controllers/itineraries.controller";
import { isAuthenticated } from "../../user/middlewares/user.middleware";

const router = Router();
const itineraryController = new ItineraryController();

router.post("/v2", isAuthenticated, (req, res) => itineraryController.saveItinerary(req, res));
router.get("/v2/:tripId", isAuthenticated, (req, res) => itineraryController.getAnItinerary(req, res));
router.get("/v2", isAuthenticated, (req, res) => itineraryController.getUsersItinerary(req, res));

export {router};