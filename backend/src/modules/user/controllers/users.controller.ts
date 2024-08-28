import { UserService } from "../services";

export class  UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async signup(req: any, res: any) {
        const user = {
            data: {},
            token: ""
        }
        const userData = req.body;
        try{
            const data = await this.userService.signup(userData);
            user.data = data.data;
            user.token = data.token;
            return res.status(201).json({message: "User created successfully!", success: true, data: user.data, token: user.token});
        }catch(error){
            console.log(error);
            res
            .status(500)
            .json({ message: "Error creating user", success: false});
        }
    }

    async login(req: any, res: any) {
        const user = {
            data: {},
            token: ""
        }
        const userData = req.body;
        try{
            const data = await this.userService.login(userData);
            if(data.message === "Incorrect password") {
                return res
                .status(200)
                .json({message: "Password is incorrect", success: false});
            } else if(data.message === "User does not exists") {
                return res
                .status(404)
                .json({message: "User does not exist", success: false});
            }
            user.data = data.data;
            user.token = data.token;
            console.log(data)
            return res.status(201).json({message: "User logged in successfully!", success: true, data: user.data, token: user.token});
        }catch(error){
            console.log(error);
            res
            .status(500)
            .json({ message: "Error logging in user", success: false});
        }
    }
}