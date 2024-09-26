import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../../../database/interface/user.interface";
import UserToken from "../../../database/interface/user_token.interface";

export const isAuthenticated = async (
  req: Request & { user?: any, token?: string }, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader ? authHeader.replace("Bearer ", "") : null;

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

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    console.error("Error in isAuthenticated middleware:", err);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export const generateUserToken = async (user_id: string): Promise<string> => {
  try {
    const key = process.env.SECRET_TOKEN || "jjn sj";
    if (!key) {
      throw new Error("TOKEN_SECRET is not set in environment variables");
    }

    const token = jwt.sign({ id: user_id }, key, { expiresIn: '24h' });

    const tokenRecord = new UserToken({
      userId: user_id,
      token
    });

    await tokenRecord.save();
    return token;
  } catch (err) {
    console.error("Error in generateUserToken function:", err);
    throw new Error("Could not generate user token");
  }
};
