"use client";
import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import Input from "@/components/atoms/Input";
import { BASE_URL } from "@/lib/share";
import { ISignIn, IUser, LoginFormSchema } from "@/types/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useStore from "@/store/main";
import { ITokenData, useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";
import { USER_TYPES } from "@/utils/user";

export async function SignIn(data: ISignIn) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage =
      errorData?.message || "An error occurred during registration.";
    throw new Error(errorMessage);
  }

  return response.json();
}

export default function Login() {
  const router = useRouter();
  const auth = useStore(useUserStore, (state) => state);
  const { mutate, isLoading } = useMutation({
    onSuccess(data: {
      user: IUser;
      tokens: { refresh: ITokenData; access: ITokenData };
    }) {
      toast.success("Login successful.");
      auth?.signIn(data.user, data.tokens.access, data.tokens.refresh);
      if (data.user.role === USER_TYPES.HOTEL_ADMIN) {
        router.push("/portal");
      } else {
        router.push("/");
      }
    },
    onError(error: { message: string }) {
      toast.error(error.message ?? "An error occurred during registration.");
    },
    mutationFn: SignIn,
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
    <div className="max-w-[450px] bg-white p-4 rounded-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Heading
          subTitle={"Sign in to enjoy all our services"}
          className="md:text-xl"
          subTitleClassName="text-base mt-0"
        >
          Welcome, back!
        </Heading>
        <Input
          error={errors.email?.message}
          {...register("email")}
          label="Email"
        />
        <Input
          error={errors.password?.message}
          label="Password"
          {...register("password")}
          type="password"
        />
        <Button loadingText="Signing in..." isLoading={isLoading}>
          Sign in
        </Button>
        <div className="flex gap-2">
          <Link
            href="/login"
            className={`highlight-link-hover text-sm ${
              isLoading && "pointer-events-none"
            }`}
          >
            Don&apos;t have account? Open account
          </Link>
          <Link
            href="/login"
            className={`highlight-link-hover text-sm ${
              isLoading && "pointer-events-none"
            }`}
          >
            Register property
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
    </div>
  );
}
