"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userTokenSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});
const userTokenModel = mongoose_1.default.model("user_token", userTokenSchema);
module.exports = userTokenModel;
