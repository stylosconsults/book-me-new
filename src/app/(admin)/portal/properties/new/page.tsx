"use client";
import { PropertyForm } from "@/components/organisms/HotelForms";
import useStore from "@/store/main";
import { useUserStore } from "@/store/user";
import { IHotel } from "@/types/hotel.schema";
import { addHotel } from "@/utils/hotel.api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function NewHotelForm() {
  const auth = useStore(useUserStore, (state) => state);
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<IHotel>>();

  const handleFormDataChange = (data: Partial<IHotel>) => {
    setFormData({ ...formData, ...data });
  };

  const { mutate, isLoading } = useMutation({
    async onSuccess() {
      toast.success("You have successful added a property.");
      router.push("/portal/properties");
    },
    onError(error: { message: string }) {
      toast.error(error.message ?? "An error occurred during registration.");
    },
    mutationFn: (data: IHotel) => addHotel(data, auth?.accessToken?.token!),
  });

  const onSubmit = (formData: IHotel) => {
    mutate(formData);
  };

  return (
    <div>
      <PropertyForm
        isLoading={isLoading}
        mutate={onSubmit}
        formData={formData}
        handleFormDataChange={handleFormDataChange}
      />
    </div>
  );
}
