import React from 'react'
import UserForm from "@/components/organisms/UserForm";
import { USER_TYPES } from "@/utils/user";
import { useMutation } from "@tanstack/react-query";
import { ICreateUser, RegisterFormSchema } from "@/types/user.schema";
import { toast } from "react-toastify";
import { createUser, resentEmailVerification } from "@/utils/auth.api";
import EmailSent from "@/components/molecules/EmailSent";
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Heading from '../atoms/Heading';
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import Image from 'next/image';


const JoinModal = () => {
    const userType = USER_TYPES.USER
    const { mutate, isLoading, isSuccess, data } = useMutation({
        async onSuccess(data) {
            toast.success("Registration successful.");
            await resentEmailVerification(data?.user, data?.tokens.access.token);
        },
        onError(error: { message: string }) {
            toast.error(error.message ?? "An error occurred during registration.");
        },
        mutationFn: createUser,
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<ICreateUser>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
          role: userType,
        },
      });
    
      const onSubmit = (data: ICreateUser) => {
        mutate(data);
      };
  

    return (
        <div className="border border-green-500 flex items-center justify-center  absolute inset-0 w-full h-[calc(100vh-6rem)] bg-opacity-[10%] backdrop-blur-sm  bg-black  rounded-md mx-auto">
      <div className=" rounded-[30px] flex items-center justify-between bg-white/50 w-[85%] h-auto p-6">

        <div className='w-[49%] h-full relative rounded-[30px]'>
          <Image className='w-full h-full rounded-[30px]' src={"/static/images/login/loginModal.png"} alt="no-img" width={200} height={200} />
          <div className='absolute inset-0 w-full h-full bg-black/60 rounded-[30px]'></div>
          <p className='absolute bottom-[1em] text-white w-full text-center text-[1.4em]'>Providing Best Places To Stay</p>
        </div>
            {isSuccess ? (
                <EmailSent user={data?.user} token={data?.tokens.access.token} />
            ) : (

                <form onSubmit={handleSubmit(onSubmit)} className=" p-5 bg-white rounded-[30px] h-auto w-[49%] flex flex-col justify-center gap-3">
                <Heading
                  subTitle={"As a User, you can enjoy smooth booking on the platform."}
                  className="md:text-xl"
                  subTitleClassName="text-base mt-0"
                >
                  Welcome <span className="bg-mainAboutUsBlue text-white p-2 py-2 rounded-[10px] ">User</span> !
                </Heading>
                <Input
                  {...register("name")}
                  label="Names"
                  error={errors.name?.message}
                  imageUrl="/static/images/contactUS/Name.png"
                />
    
                <Input
                  {...register("email")}
                  label="Email"
                  error={errors.email?.message}
                  imageUrl="/static/images/contactUS/Your_phone_email.png"
    
                />
                <Input
                  {...register("password")}
                  label="Password"
                  type="password"
                  error={errors.password?.message}
                  imageUrl="/static/images/login/password.png"
    
                />
                <Button isLoading={isLoading} loadingText="Registering...">
                  Register
                </Button>
                <div className="flex gap-2">
                  <Link
                    href="/login"
                    className={`underline underline-offset-2 hover:underline-offset-4 text-md ${isLoading && "pointer-events-none"
                      }`}
                  >
                    Already have an account?
                  </Link>
                  <Link
                    href={"/"}
                    className={`underline underline-offset-2 hover:underline-offset-4 text-md ${isLoading && "pointer-events-none"
                      }`}
                  >
                    Go home
                  </Link>
                </div>
              </form>

            )}
        </div>
        </div>
        )
}

export default JoinModal