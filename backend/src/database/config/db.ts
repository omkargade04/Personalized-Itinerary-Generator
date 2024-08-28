import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URL || "");

const connection = mongoose.connection;

connection.on('connected', () => {
    // console.log("MongoDB is connected");
})

connection.on('error', (error: any) => {
    console.log("Error in MongoDB connection", error);
});

module.exports = mongoose;