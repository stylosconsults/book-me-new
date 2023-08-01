import React, { useState, useEffect } from "react";
import Button from "../atoms/Button";
import { ICreateUser } from "@/types/user.schema";
import { BASE_URL } from "@/lib/share";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { resentEmailVerification } from "@/utils/auth.api";

export default function EmailSent({
  user: actualUser,
  token: actualToken,
}: {
  user?: ICreateUser;
  token?: string;
}) {
  const [isResendEnabled, setResendEnabled] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(60);

  const [user, setUser] = React.useState<ICreateUser | undefined>(actualUser);
  const [token, setToken] = React.useState<string | undefined>(actualToken);

  const { mutateAsync, isSuccess, error } = useMutation(() =>
    resentEmailVerification(user!, token!)
  );

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (!isResendEnabled) {
      timer = setInterval(() => {
        setSecondsRemaining((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    if (secondsRemaining === 0) {
      setResendEnabled(true);
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isResendEnabled, secondsRemaining]);

  useEffect(() => {
    if (isSuccess) {
      setResendEnabled(false);
      setSecondsRemaining(60);
    }
  }, [isSuccess]);

  useEffect(() => {
    // If actual user and token are not available, check session storage for data
    if (!actualUser && !actualToken) {
      const storedUser = sessionStorage.getItem("user");
      const storedToken = sessionStorage.getItem("token");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } else {
      sessionStorage.setItem("token", actualToken!);
      sessionStorage.setItem("user", JSON.stringify(actualUser!));
    }
  }, [actualUser, actualToken]);

  const handleResendEmail = () => {
    mutateAsync();
    if (!isSuccess) {
      toast.error(
        (error as { message: string })?.message ?? "Unable to sent email"
      );
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold">
        Email Sent to your inbox at{" "}
        <span className="text-blue-500">{user?.email}</span>!
      </h1>
      <p>
        Congratulations! You have successfully completed the registration
        process. An email has been sent to your inbox. Please check your email
        to proceed further. If you don&apos;t see the email in your inbox,
        kindly check your spam or junk folder as well. Thank you for joining us,
        and we look forward to having you as part of our community!
      </p>
      <div className="flex items-center gap-3">
        <p className="font-semibold">Didn&apos;t receive email?</p>
        {!isResendEnabled && (
          <p className="text-sm">Resend email in {secondsRemaining} seconds</p>
        )}
      </div>
      <Button
        disabled={!isResendEnabled}
        onClick={handleResendEmail}
        className="w-fit"
      >
        Resend email
      </Button>
    </div>
  );
}
