"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const user_services_1 = require("../services/user.services");
const user_controller_1 = require("../controllers/user.controller");
const verifyToken_middlewares_1 = require("../middlewares/verifyToken.middlewares");
const IsEmailValid_middleware_1 = require("../middlewares/IsEmailValid.middleware");
tsyringe_1.container.registerSingleton("UserServices", user_services_1.UserServices);
const userController = tsyringe_1.container.resolve(user_controller_1.UserController);
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/", IsEmailValid_middleware_1.IsEmailValid.execute, (req, res) => userController.create(req, res));
exports.userRouter.post("/login", (req, res) => userController.login(req, res));
exports.userRouter.get("/", verifyToken_middlewares_1.VerifyToken.execute, (req, res) => userController.getUser(req, res));
