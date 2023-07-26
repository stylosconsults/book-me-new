import React from "react";
import RoomCard from "../molecules/RoomCard";
import { IRoom } from "@/types/schemas";
import { IBooking } from "@/types/booking.schema";
import Button from "../atoms/Button";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/lib/share";
import { useParams } from "next/navigation";

export async function BookingAction(data: IBooking) {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage =
      errorData?.message || "An error occurred during booking.";
    throw new Error(errorMessage);
  }

  const users = await res.json();
  return users;
}

export default function BookingStepThree({
  room,
  formData,
  handleStepChange,
  nightsToStay,
  handleGoBack,
  handleGoNext,
  handleSuccessBooking,
}: {
  room: IRoom;
  formData: IBooking;
  handleStepChange: (page: number) => void;
  nightsToStay: number;
  handleGoBack: () => void;
  handleGoNext: () => void;
  handleSuccessBooking: (id: string) => void;
}) {
  const params = useParams() as { roomId: string };
  const amountToPay = formData.amount;

  const { mutate, isLoading } = useMutation({
    async onSuccess(data) {
      toast.success("Booking succeeded.");
      sessionStorage.setItem("bookingID", data._id);
      sessionStorage.setItem("bookingAmount", String(formData.amount));
      handleSuccessBooking(data._id);
      handleGoNext?.();
    },
    onError(error: { message: string }) {
      toast.error(error.message ?? "An error occurred during booking.");
    },
    mutationFn: () => BookingAction({ ...formData, room: params.roomId }),
  });

  return (
    <>
      <div className="flex gap-4">
        <RoomCard
          id={"1"}
          name={room?.name}
          noAdults={room?.adults}
          noChildren={room?.children}
          image={room?.image}
          price={room?.price}
          // discountedPrice={room?.discountedPrice}
          refundable={true}
          bedType={room?.bedType}
          breakfast={true}
          roomSize={room?.size!}
          hideBtn
        />
        <CustomCardData
          title={"Personal"}
          pageIndex={1}
          changeState={handleStepChange}
          columns={[
            {
              name: "First Name",
              value: formData.firstName,
            },
            {
              name: "Last Name",
              value: formData.lastName,
            },
            {
              name: "Email",
              value: formData.email,
            },
            {
              name: "Phone Number",
              value: formData.phone,
            },
            {
              name: "Arrival Time",
              value: formData.arrivalTime,
            },
          ]}
        />
        <CustomCardData
          title={"Room"}
          pageIndex={0}
          changeState={handleStepChange}
          columns={[
            {
              name: "Hotel name",
              value: room?.hotel.name,
            },
            {
              name: "Room name",
              value: room?.name,
            },
            {
              name: "Number of room",
              value: String(amountToPay / room?.price / nightsToStay),
            },
            {
              name: "Amount To Pay",
              value: String(amountToPay),
            },
          ]}
        />
      </div>
      <div className="flex gap-3">
        <Button
          isLoading={isLoading}
          loadingText="Reserving..."
          onClick={mutate}
          className="mt-5 bg-co-blue text-white hover:bg-blue-700 border-0"
          theme="secondary"
        >
          Book now
        </Button>
        <Button disabled={isLoading} onClick={handleGoBack} className="mt-5">
          Back
        </Button>
      </div>
    </>
  );
}

export function CustomCardData({
  changeState,
  columns,
  pageIndex,
  title,
}: {
  title: string;
  pageIndex: number;
  changeState: (page: number) => void;
  columns: { name: string; value?: string }[];
}) {
  return (
    <div
      className="bg-white flex flex-col justify-between rounded-2xl group mt-5 border p-2 shadow"
      style={{
        width: "calc(25% - 10px)",
      }}
    >
      <div className="text-sm mt-2">
        <h1 className="font-bold text-lg mb-5 capitalize">{title} Info</h1>
        {columns.map(
          (column, index) =>
            column.value && (
              <p key={index}>
                {column.name}: <span className="font-bold">{column.value}</span>
              </p>
            )
        )}
      </div>
      <Button
        onClick={() => changeState(pageIndex)}
        className="py-1 font-medium bg-co-blue text-white border-0 w-full mt-2"
      >
        Change {title.toLowerCase()} info
      </Button>
    </div>
  );
}
