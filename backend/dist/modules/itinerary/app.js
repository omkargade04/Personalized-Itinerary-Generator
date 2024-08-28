"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItineraryModule = void 0;
const express_1 = require("express");
// import { itineraryRouter } from "./routes/itinerary.routes";
const routes_1 = require("./routes/routes");
const ItineraryModule = (0, express_1.Router)();
exports.ItineraryModule = ItineraryModule;
// ItineraryModule.use("/itinerary", itineraryRouter)
ItineraryModule.use("/itinerary", routes_1.router);
