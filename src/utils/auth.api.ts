import { BASE_URL } from "@/lib/share";
import { ICreateUser, ISignIn } from "@/types/user.schema";

export async function signIn(data: ISignIn) {
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

  export async function resentEmailVerification(
    user: ICreateUser,
    token: string
  ) {
    const response = await fetch(`${BASE_URL}/auth/send-verification-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData?.message || "Unable to sent email";
      throw new Error(errorMessage);
    }
  
    return response.json();
  }

  export const createUser = async (data: ICreateUser) => {
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