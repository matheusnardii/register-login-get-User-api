import "dotenv";
import "express-async-errors";
import "reflect-metadata";
import helmet from "helmet";
import cors from "cors";
import express, { json } from "express";
import { HandleErrors } from "./middlewares/handleErrors.middleware";
import { userRouter } from "./routes/user.routes";

export const app = express();

app.use(helmet());

app.use(cors());

app.use(json());

app.use("/users", userRouter);

app.use(HandleErrors.execute);