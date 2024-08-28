import { NextFunction } from "express";
import jwt from "jsonwebtoken";
const UserModel = require("../../../database/interface/user.interface");
const UserToken = require("../../../database/interface/user_token.interface");
// import { ReqMid } from "../../../database/interfaces/user.interface";


export const isAuthenticated = async (
    req: any,
    res: any,
    next: NextFunction
  ) => {
    try {
      const authHeader = req.header("Authorization");
      const token: any = authHeader ? authHeader.replace("Bearer ", "") : null;
  
      if (!token) {
        return res.status(401).json({ status: false, message: "Unauthorized user!" });
      }
  
      const userToken = await UserToken.findOne({ token });
  
      if (!userToken) {
        return res.status(401).json({ status: false, message: "Unauthorized user!" });
      }

      const user = await UserModel.findById(userToken.userId);
  
      if (!user) {
        return res.status(401).json({ status: false, message: "Unauthorized user!" });
      }
    //   console.log(token)
      req.user = user;
      req.token = token;
      next();
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  };


export const generateUserToken = async (user_id: string) => {
    try {
        const key = process.env.TOKEN_SECRET || 'default_secret_key';
        const token = jwt.sign({ id: user_id }, key, { expiresIn: '24h' });

        const tokenRecord = new UserToken({
            userId: user_id,
            token: token
        })

        await tokenRecord.save();
        return token;
    } catch (err: any) {
        console.log(err);
        throw new Error('Could not generate user token');
    }
};