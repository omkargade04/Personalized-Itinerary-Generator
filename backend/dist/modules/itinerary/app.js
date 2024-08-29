"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItineraryModule = void 0;
const express_1 = require("express");
const itinerary_routes_1 = require("./routes/itinerary.routes");
const routes_1 = require("./routes/routes");
const ItineraryModule = (0, express_1.Router)();
exports.ItineraryModule = ItineraryModule;
//Code written using usual methods in v1
ItineraryModule.use("/itinerary/v1", itinerary_routes_1.itineraryRouter);
//Code written using OOP in v2
ItineraryModule.use("/itinerary/v2", routes_1.router);
