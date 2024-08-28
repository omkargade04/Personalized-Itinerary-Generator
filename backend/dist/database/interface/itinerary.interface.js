"use strict";
/*

budget
:
"Moderate"
hotels
:
(3) [{…}, {…}, {…}]
itinerary
:
(5) [{…}, {…}, {…}, {…}, {…}]
location
:
"New Delhi, Delhi, India"
noOfDays
:
5
traveler
:
"4 to 6 people"
*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItineraryModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
;
const ItinerarySchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true
    },
    budget: {
        type: String,
        required: [true, "Budget is required"],
    },
    noOfDays: {
        type: Number,
        required: [true, "Number of days is required"],
    },
    traveler: {
        type: String,
        required: [true, "No. of travelers are reuqired"]
    },
    location: {
        type: String,
        required: [true, "Location is required"]
    },
    hotels: {
        type: [mongoose_1.Schema.Types.Mixed],
        reuqired: true
    },
    itinerary: {
        type: [mongoose_1.Schema.Types.Mixed],
        reuqired: true
    }
}, { timestamps: true });
let ItineraryModel;
try {
    exports.ItineraryModel = ItineraryModel = mongoose_1.default.model("ItineraryResultV2");
}
catch (_a) {
    exports.ItineraryModel = ItineraryModel = mongoose_1.default.model("ItineraryResultV2", ItinerarySchema);
}
