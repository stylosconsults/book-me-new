"use client";
import UserForm from "@/components/organisms/UserForm";
import { USER_TYPES } from "@/utils/user";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/lib/share";
import { toast } from "react-toastify";
import { ICreateUser } from "@/types/user.schema";
import EmailSent from "@/components/molecules/EmailSent";
import { createUser } from "@/utils/auth.api";

export default function RegisterProperty() {
  const { mutate, isLoading, isSuccess, data } = useMutation({
    onSuccess() {
      toast.success("Registration successful.");
    },
    onError(error: { message: string }) {
      toast.error(error.message ?? "An error occurred during registration.");
    },
    mutationFn: createUser,
  });

  const handleSubmit = (data: ICreateUser) => {
    mutate(data);
  };

  return (
    <div className="max-w-[400px] bg-white p-4 rounded-md mx-auto">
      {isSuccess ? (
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
