import mongoose from "mongoose";

const userTokenSchema = new mongoose.Schema({
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

const userTokenModel = mongoose.model("user_token", userTokenSchema);

module.exports = userTokenModel;