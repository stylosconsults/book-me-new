"use client";
import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import Input from "@/components/atoms/Input";
import { BASE_URL } from "@/lib/share";
import { ISignIn, LoginFormSchema } from "@/types/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

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
  const { mutate, isLoading } = useMutation({
    onSuccess(data) {
      toast.success("Login successful.");
      location.replace(
        `https://app.bookme.rw/login?${data?.tokens.access.token}`
      );
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
        <Input {...register("email")} label="Email" />
        <Input label="Password" {...register("password")} type="password" />
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
