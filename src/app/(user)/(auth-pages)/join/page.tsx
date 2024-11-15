"use client";
import UserForm from "@/components/organisms/UserForm";
import { USER_TYPES } from "@/utils/user";
import { useMutation } from "@tanstack/react-query";
import { ICreateUser } from "@/types/user.schema";
import { toast } from "react-toastify";
import { createUser, resentEmailVerification } from "@/utils/auth.api";
import EmailSent from "@/components/molecules/EmailSent";
import JoinModal from "@/components/organisms/JoinModal";

export default function Join() {
  return (
    <JoinModal/> 
  )
}
