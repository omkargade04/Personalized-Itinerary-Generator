import mongoose, { Schema, Document, Model } from "mongoose";

interface User {
    name: string;
    email: string;
    password: string;
};

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }

}, {
    timestamps: true,
});

// const userModel = mongoose.model("users", userSchema);

let UserModel: Model<User>;

try{
    UserModel = mongoose.model<User>("Users");
} catch {
    UserModel = mongoose.model<User>("Users", userSchema);
}

// export {UserModel};

module.exports = UserModel;