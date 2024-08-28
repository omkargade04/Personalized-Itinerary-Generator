import { Router } from "express"
import { userRouter } from "./routes/user.routes";
// import { router } from "./routes/routes";

const UserModule = Router()

UserModule.use("/user", userRouter)
// UserModule.use("/user", router)

export { UserModule };