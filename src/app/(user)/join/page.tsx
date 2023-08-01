"use client";
import UserForm from "@/components/organisms/UserForm";
import { USER_TYPES } from "@/utils/user";
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ICreateUser } from "@/types/user.schema";
import { toast } from "react-toastify";
import { createUser, resentEmailVerification } from "@/utils/auth.api";
import EmailSent from "@/components/molecules/EmailSent";

export default function Join() {
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

  const handleSubmit = (data: ICreateUser) => {
    mutate(data);
  };

  const [isSessionStorageAvailable, setSessionStorageAvailable] =
    useState(false);

  useEffect(() => {
    // Check if sessionStorage is available
    setSessionStorageAvailable(() => {
      try {
        sessionStorage.setItem("__test__", "test");
        sessionStorage.removeItem("__test__");
        return true;
      } catch (error) {
        return false;
      }
    });
  }, []);

  return (
    <div className="max-w-[400px] bg-white p-4 rounded-md mx-auto">
      {isSuccess ||
      (isSessionStorageAvailable && sessionStorage.getItem("token")) ? (
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
