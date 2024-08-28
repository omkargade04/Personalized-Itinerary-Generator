import bcrypt from 'bcrypt';
import { generateUserToken } from '../middlewares/user.middleware';
import {LoginData, SignupData} from "../../../types/index"
const User = require("../../../database/interface/user.interface");

export class UserService {
    async signup(userData: SignupData): Promise<any> {
        try {
            const password = userData.password;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            userData.password = hashedPassword;
            const newuser = new User(userData);
            await newuser.save();
            const user = await User.findOne({email: userData.email});
            const token = await generateUserToken(user._id);
            return {data: user, token: token}
        } catch (error) {
            console.log(error);
            throw new Error("Error creating user");
        }
    }

    async login(userData: LoginData): Promise<any> {
        try{
            const email = userData.email;
            const password = userData.password;
            const user = await User.findOne({email: email});
            if(!user){
                return {message: "User does not exists"};
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return {message: "Incorrect password"}
            }else{
                const token = await generateUserToken(user._id);
                return {data: user, token: token};
            }
        }catch (error) {
            console.log(error);
            throw new Error("Error logging user");
        }
    }
}