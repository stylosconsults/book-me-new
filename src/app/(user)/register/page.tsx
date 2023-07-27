"use client";
import UserForm from "@/components/organisms/UserForm";
import { USER_TYPES } from "@/utils/user";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/lib/share";
import { toast } from "react-toastify";
import { ICreateUser } from "@/types/user.schema";
import EmailSent from "@/components/molecules/EmailSent";

export const CreateUser = async (data: ICreateUser) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
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
};

export default function RegisterProperty() {
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
          userType={USER_TYPES.HOTEL_ADMIN}
        />
      )}
    </div>
  );
}
