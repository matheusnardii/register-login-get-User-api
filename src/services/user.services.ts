import { injectable } from "tsyringe";
import { TCreateUserBody, TLoginReturn, TUserLogin, TUserReturn, userReturnSchema } from "../schemas/user.schemas";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

@injectable()
export class UserServices {
    async create(body: TCreateUserBody): Promise<TUserReturn> {
        const hashPassword = await bcrypt.hash(body.password, 10);

        const newUser: TCreateUserBody = {
            name: body.name,
            email: body.email,
            password: hashPassword,
        }

        const data = await prisma.user.create({ data: newUser });

        return userReturnSchema.parse(data);
    }

    async login(body: TUserLogin): Promise<TLoginReturn> {
        const user = await prisma.user.findFirst({ where: { email: body.email } });

        if (!user) {
            throw new AppError("User not register", 404);
        }

        const compare = await bcrypt.compare(body.password, user.password);

        if (!compare) {
            throw new AppError("Email and password doesn't match", 401);
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "24h" });

        return {
            accessToken: token,
            user: userReturnSchema.parse(user),
        }

    }

    async getUser(id: number): Promise<TUserReturn> {
        const user = await prisma.user.findFirst({ where: { id } });

        return userReturnSchema.parse(user);
    }
}