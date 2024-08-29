import { Router } from "express";
import { ItineraryController } from "../controllers/itineraries.controller";
import { isAuthenticated } from "../../user/middlewares/user.middleware";

const router = Router();
const itineraryController = new ItineraryController();

router.post("/", isAuthenticated, (req, res) => itineraryController.saveItinerary(req, res));
router.get("/:tripId", isAuthenticated, (req, res) => itineraryController.getAnItinerary(req, res));
router.get("/", isAuthenticated, (req, res) => itineraryController.getUsersItinerary(req, res));

export {router};