import express, {Router} from "express";
import { isAuthenticated } from "../../user/middlewares/user.middleware";
import { saveItinerary, getAItinerary, getUsersItinerary } from "../controllers/itinerary.controller";

const itineraryRouter = Router();

itineraryRouter.post("/", isAuthenticated, saveItinerary);
itineraryRouter.get("/:tripId", isAuthenticated, getAItinerary);
itineraryRouter.get("/", isAuthenticated, getUsersItinerary);

export {itineraryRouter};