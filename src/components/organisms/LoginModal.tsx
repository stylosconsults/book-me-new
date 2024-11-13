import React from 'react'
import Heading from '../atoms/Heading'
import Input from '../atoms/Input'
import Button from '../atoms/Button'
import { useRouter } from 'next/navigation'
import { useStore } from 'zustand'
import { useMutation } from '@tanstack/react-query'
import { ISignIn, IUser, LoginFormSchema } from "@/types/user.schema";
import { ITokenData, useUserStore } from "@/store/user";
import { toast } from "react-toastify";
import { USER_TYPES } from "@/utils/user";
import { signIn } from "@/utils/auth.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from 'next/link'
import Image from 'next/image'



const LoginModal = () => {
    const router = useRouter();
    const auth = useStore(useUserStore, (state) => state);
    const { mutate, isLoading } = useMutation({
        onSuccess(data: {
            user: IUser;
            tokens: { refresh: ITokenData; access: ITokenData };
        }) {
            toast.success("Login successful.");
            auth?.signIn(data.user, data.tokens.access, data.tokens.refresh);
            if (
                data.user.role === USER_TYPES.HOTEL_ADMIN ||
                data.user.role === USER_TYPES.ADMIN
            ) {
                router.replace("/portal");
            } else {
                router.replace("/");
            }
        },
        onError(error: { message: string }) {
            toast.error(error.message ?? "An error occurred during registration.");
        },
        mutationFn: signIn,
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ISignIn>({
        resolver: zodResolver(LoginFormSchema),
    });

    const onSubmit = (data: ISignIn) => {
        mutate(data);
    };

    return (
        <div className='flex items-center justify-center  absolute inset-0 w-full h-[calc(100vh-5.2rem)] bg-opacity-[10%] backdrop-blur-sm  bg-black  rounded-md mx-auto'>
            <div className=' rounded-[30px] flex items-center justify-between bg-white/50 w-[85%] h-auto p-6'>

                <div className='w-[49%] h-full relative rounded-[30px]'>
                    <Image className='w-full h-full rounded-[30px]' src={"/static/images/login/loginModal.png"} alt="no-img" width={200} height={200} />
                    <div className='absolute inset-0 w-full h-full bg-black/60 rounded-[30px]'></div>
                    <p className='absolute bottom-[1em] text-white w-full text-center text-[1.4em]'>Providing Best Places To Stay</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="  p-5 bg-white rounded-[30px] h-auto w-[49%] flex flex-col justify-center gap-3">
                    <Heading
                        subTitle={"Sign in to enjoy all our services"}
                        className="md:text-xl"
                        subTitleClassName="text-base mt-0"
                    >
                        Access <span className='bg-mainAboutUsBlue text-white rounded-[10px] p-1 px-3'>Your</span> Account
                    </Heading>
                    <Input
                        error={errors.email?.message}
                        {...register("email")}
                        label="Email"
                        placeholder='Enter your email'
                        imageUrl="/static/images/login/emailSubscribe.png"
                    />
                    <Input
                        error={errors.password?.message}
                        label="Password"
                        {...register("password")}
                        type="password"
                        placeholder='Enter your password'
                        imageUrl="/static/images/login/password.png"
                    />

                    <div className="flex gap-2 mt-1">
                        <Link
                            href=""
                            className={` text-[1.1em] ps-4 underline-offset-3 underline ${isLoading && "pointer-events-none"
                                }`}
                        >
                            Forgot Password?
                        </Link>

                    </div>
                    <Button loadingText="Signing in..." isLoading={isLoading}>
                        Sign in
                    </Button>

                </form>
            </div>
        </div>

    )
}

export default LoginModal