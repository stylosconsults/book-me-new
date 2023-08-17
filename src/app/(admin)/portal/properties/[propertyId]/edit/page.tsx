"use client";
import { PropertyForm } from "@/components/organisms/HotelForms";
import { IEditHotel } from "@/types/hotel.schema";
import { getHotelById } from "@/utils/hotel.api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProperty() {
  const params = useParams() as { propertyId: string };
  const { data, isLoading } = useQuery({
    queryFn: () => getHotelById(params.propertyId),
    queryKey: ["property", params.propertyId],
  });
  const [formData, setFormData] = useState<IEditHotel | undefined>();

  useEffect(() => {
    setFormData({ ...data, images: [] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <div>
      <PropertyForm
        mutate={() => alert("saved")}
        isLoading={isLoading}
        formData={{ ...formData, savedImages: data?.images }}
        handleFormDataChange={(data) => {
          console.log({ data });
          setFormData({ ...data, ...formData! });
        }}
      />
    </div>
  );
}
