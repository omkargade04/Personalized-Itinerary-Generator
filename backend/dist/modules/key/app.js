"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyModule = void 0;
const express_1 = require("express");
// import { itineraryRouter } from "./routes/itinerary.routes";
const routes_1 = require("./routes/routes");
const KeyModule = (0, express_1.Router)();
exports.KeyModule = KeyModule;
KeyModule.use("/key/v2", routes_1.router);
