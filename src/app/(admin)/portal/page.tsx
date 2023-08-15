"use client";
import Heading from "@/components/atoms/Heading";
import Steps from "@/components/molecules/Steps";
import {
  PropertyDetails,
  PropertyImages,
  SelectPropertyType,
} from "@/components/organisms/HotelForms";
import Dialog from "@/components/organisms/dialog";
import useStore from "@/store/main";
import { useUserStore } from "@/store/user";
import { IHotel } from "@/types/hotel.schema";
import { addHotel, getUserNumberOfHotels } from "@/utils/hotel.api";
import { USER_TYPES } from "@/utils/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminHome() {
  const [open, setOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const auth = useStore(useUserStore, (state) => state);
  const [userId, setUserId] = useState(auth?.user?.id);

  const { data: userHotels, isLoading: isUserHotelsLoading } = useQuery({
    queryKey: ["userHotels"],
    queryFn: () => getUserNumberOfHotels(userId!),
    enabled: Boolean(userId),
  });

  useEffect(() => {
    if (
      hasMounted &&
      userHotels &&
      auth?.user?.role === USER_TYPES.HOTEL_ADMIN &&
      userHotels?.numberHotels <= 0
    ) {
      setOpen(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userHotels, hasMounted]);

  useEffect(() => {
    setUserId(auth?.user?.id!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.user]);

  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState<Partial<IHotel>>();

  const handleFormDataChange = (data: Partial<IHotel>) => {
    setFormData({ ...formData, ...data });
  };

  const handleNext = () => setCurrent(current + 1);
  const handlePrev = () => setCurrent(current - 1);
  const handleModalClose = () => setOpen(false);

  const { mutate, isLoading } = useMutation({
    async onSuccess(data: { hotel: IHotel }) {
      toast.success("You have successful added a property.");
      handleModalClose?.();
    },
    onError(error: { message: string }) {
      toast.error(error.message ?? "An error occurred during registration.");
    },
    mutationFn: (data: IHotel) => addHotel(data, auth?.accessToken?.token!),
  });

  const onSubmit = (formData: IHotel) => {
    mutate(formData);
  };

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {hasMounted && !isUserHotelsLoading && (
        <Dialog open={open}>
          <Heading
            subTitleClassName="max-w-[600px]"
            subTitle="Now that you have successfully registered as a hotel administrator, it's time to enrich your profile with essential and captivating details about your property."
          >
            Welcome, Back!
          </Heading>

          <Steps
            current={current}
            setCurrent={setCurrent}
            steps={["Property type", "Property Details", "Property Images"]}
          />

          {current === 0 ? (
            <SelectPropertyType
              handleFormDataChange={handleFormDataChange}
              formData={formData}
              handleNext={handleNext}
            />
          ) : current === 1 ? (
            <PropertyDetails
              handleFormDataChange={handleFormDataChange}
              formData={formData}
              handleNext={handleNext}
              handlePrev={handlePrev}
            />
          ) : current === 2 ? (
            <PropertyImages
              handleFormDataChange={handleFormDataChange}
              formData={formData}
              handleNext={handleNext}
              handlePrev={handlePrev}
              mutate={onSubmit}
              isLoading={isLoading}
            />
          ) : null}
        </Dialog>
      )}
    </div>
  );
}
