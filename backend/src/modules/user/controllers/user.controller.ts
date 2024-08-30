import { generateUserToken } from "../middlewares/user.middleware";

const express = require("express");
const router = express.Router();
const User = require("../../../database/interface/user.interface");
const bcrypt = require("bcrypt");
// const authMiddleware = require("../middlewares/authMiddleware");

export const signup = async(req: any, res: any) => {
    try{
        console.log(req.body)
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newuser = new User(req.body);
        await newuser.save();
        const user = await User.findOne({email: req.body.email});
        const token = await generateUserToken(user._id);
        return res.status(200).send({message: "User created successfully!", success: true, data: user, token: token});
    }catch(error){
        console.log(error);
        res
        .status(500)
        .send({ message: "Error creating user", success: false});
    }
}

export const login = async(req: any, res: any) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res
                .status(200)
                .json({message: "User does not exist", success: false});
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res
                .status(200)
                .json({message: "Password is incorrect", success: false});
        }else{
            const token = await generateUserToken(user._id);
            return res.status(200).json({message: "Login successful", success: true, data: user, token: token});
        }
    }catch(error){
        console.log(error);
        res
        .status(500)
        .json({message: "Error Logging In", success: false, error});
    }
};

// module.exports = {signup, login};