import { USER_TYPES } from '@/utils/user';
import * as z from 'zod';

export const LoginFormSchema = z.object({
    email: z.string({
      required_error: "Email is required"
    }).email({
      message: "Email is invalid"
    }),
    password: z.string({
      required_error: "Password is required"
    }).min(8, 'password must be at least 8 characters').refine((value) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(value);
      }, {
        message: 'Password must be at least 8 characters long and contain at least 1 letter and 1 number',
      }),
});

export const RegisterFormSchema = z.object({
    name: z.string({
      required_error: 'Name is required'
    }).min(3),
    role: z.nativeEnum(USER_TYPES),
}).merge(LoginFormSchema);

export type ICreateUser = z.infer<typeof RegisterFormSchema>;
export type IUser = ICreateUser & {
  id: string;
}
export type ISignIn = z.infer<typeof LoginFormSchema>;
