"use client";
import UserForm from "@/components/organisms/UserForm";
import { USER_TYPES } from "@/utils/user";
import React from "react";
import { CreateUser } from "../register/page";
import { useMutation } from "@tanstack/react-query";
import { ICreateUser } from "@/types/user.schema";
import { toast } from "react-toastify";
import EmailSent from "@/components/molecules/EmailSent";

export default function Join() {
  const { mutate, isLoading, isSuccess, data } = useMutation({
    onSuccess() {
      toast.success("Registration successful.");
    },
    onError(error: { message: string }) {
      toast.error(error.message ?? "An error occurred during registration.");
    },
    mutationFn: CreateUser,
  });

  const handleSubmit = (data: ICreateUser) => {
    mutate(data);
  };
  return (
    <div className="max-w-[400px] bg-white p-4 rounded-md mx-auto">
      {isSuccess || sessionStorage.getItem("token") ? (
        <EmailSent user={data?.user} token={data?.tokens.access.token} />
      ) : (
        <UserForm
          isLoading={isLoading}
          mutate={handleSubmit}
          userType={USER_TYPES.USER}
        />
      )}
    </div>
  );
}
