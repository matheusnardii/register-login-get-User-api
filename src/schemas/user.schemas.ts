import { z } from "zod";

export const userSchema = z.object({
   id: z.number().positive(),
   name: z.string().min(1),
   email: z.string().min(1).email(),
   password: z.string().min(8)
});

export type TUser = z.infer<typeof userSchema>;

export const userCreateBodySchema = userSchema.omit({id: true});
export type TCreateUserBody = z.infer<typeof userCreateBodySchema>;

export const userReturnSchema = userSchema.omit({password: true});
export type TUserReturn = z.infer<typeof userReturnSchema>; 

export const userLoginBodySchema = userSchema.pick({email: true, password: true});
export type TUserLogin = z.infer<typeof userLoginBodySchema>;

export type TLoginReturn = {
   accessToken: string,
   user: TUserReturn,
};
