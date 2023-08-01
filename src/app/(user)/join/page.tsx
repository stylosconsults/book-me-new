"use client";
import UserForm from "@/components/organisms/UserForm";
import { USER_TYPES } from "@/utils/user";
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

  return (
    <div className="max-w-[400px] bg-white p-4 rounded-md mx-auto">
      {isSuccess ? (
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
