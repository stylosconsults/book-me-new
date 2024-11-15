"use client";
import { USER_TYPES } from "@/utils/user";
import Input from "../atoms/Input";
import Heading from "../atoms/Heading";
import Button from "../atoms/Button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ICreateUser, RegisterFormSchema } from "@/types/user.schema";

interface UserFormProps {
  userType: USER_TYPES;
  isLoading?: boolean;
  mutate?: (data: ICreateUser) => void;
}

export default function UserForm({
  userType,
  isLoading,
  mutate,
}: UserFormProps) {
  const { heading, subHeading } =
    userType === USER_TYPES.HOTEL_ADMIN
      ? {
          heading: "Welcome, Hotel Manager!",
          subHeading:
            "As a Hotel Manager, you can manage your hotel and its resources.",
        }
      : {
          heading: "Welcome, User!",
          subHeading:
            "As a User, you can enjoy smooth booking on the platform.",
        };

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
    mutate?.(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <Heading
        subTitle={subHeading}
        className="md:text-xl"
        subTitleClassName="text-base mt-0"
      >
        {heading}
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
        imageUrl="/public/static/images/contactUS/Your_phone_email.png"

      />
      <Input
        {...register("password")}
        label="Password"
        type="password"
        error={errors.password?.message}
        imageUrl="/public/static/images/login/password.png"

      />
      <Button isLoading={isLoading} loadingText="Registering...">
        Register
      </Button>
      <div className="flex gap-2">
        <Link
          href="/login"
          className={`highlight-link-hover text-sm ${
            isLoading && "pointer-events-none"
          }`}
        >
          Already have an account?
        </Link>
        <Link
          href={"/"}
          className={`highlight-link-hover text-sm ${
            isLoading && "pointer-events-none"
          }`}
        >
          Go home
        </Link>
      </div>
    </form>
  );
}