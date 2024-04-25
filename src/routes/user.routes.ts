import { Router } from "express";
import { container } from "tsyringe";
import { UserServices } from "../services/user.services";
import { UserController } from "../controllers/user.controller";
import { VerifyToken } from "../middlewares/verifyToken.middlewares";
import { IsEmailValid } from "../middlewares/IsEmailValid.middleware";

container.registerSingleton("UserServices", UserServices);

const userController = container.resolve(UserController);

export const userRouter = Router();

userRouter.post("/", IsEmailValid.execute, (req, res) => userController.create(req, res));
userRouter.post("/login", (req, res) => userController.login(req, res));
userRouter.get("/", VerifyToken.execute, (req, res) => userController.getUser(req, res));
