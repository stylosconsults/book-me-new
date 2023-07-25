"use client";
import { useEffect, useState } from "react";

import { HiOutlineXMark } from "react-icons/hi2";
import { IoMdCheckmark } from "react-icons/io";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import Steps from "@/components/molecules/Steps";
import Input from "@/components/atoms/Input";
import RoomCard from "@/components/molecules/RoomCard";
import PaymentForm from "@/components/molecules/PaymentForm";
import { BASE_URL } from "@/lib/share";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import {
  IBooking,
  IBookingStepOne,
  bookingStepOneSchema,
} from "@/types/booking.schema";
import { toast } from "react-toastify";
import { formatDate, getDaysBetweenDates } from "@/lib/date";
import { IRoom } from "@/types/schemas";
import Button from "@/components/atoms/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import BookingStepOne from "@/components/organisms/BookingStepOne";

export async function GetRoomById(id: string) {
  const res = await fetch(`${BASE_URL}/rooms/${id}`);
  const users = await res.json();
  return users;
}

export async function BookingAction(data: IBooking) {}

export default function Booking() {
  const router = useRouter();
  const params = useParams();

  const { data: room, isLoading: isRoomLoading } = useQuery<IRoom>({
    queryKey: ["room", params?.roomId!],
    queryFn: () => GetRoomById(params?.roomId as string),
    enabled: Boolean(params?.roomId),
  });

  const { mutate, isLoading, isSuccess } = useMutation({
    async onSuccess(data) {
      toast.success("Registration successful.");
    },
    onError(error: { message: string }) {
      toast.error(error.message ?? "An error occurred during registration.");
    },
    mutationFn: BookingAction,
  });

  const handleSubmit = (data: IBooking) => {
    mutate(data);
  };

  const [current, setCurrent] = useState<number>(0);
  const [nightsToStay, setNightsToStay] = useState(1);
  const [formData, setFormData] = useState<Partial<IBooking>>();

  const steps = [
    "Hotel room info",
    "Personal Information",
    "Booking Details",
    "Payment Final",
  ];

  const handleGoNext = () => setCurrent(current + 1);

  const handleFormChange = (data: Partial<IBooking>) => {
    setFormData({ ...formData, ...data });
  };

  return (
    <>
      <Breadcrumb
        fullLocation={[
          {
            name: room?.hotel.name + " Hotel",
            link: "/h/" + room?.hotel.id,
          },
          { name: room?.name ?? "" + " Room", link: "/room/" + room?.id ?? "" },
        ]}
      />

      <div className="mt-10 w-full bg-white px-4 py-2 rounded-md">
        <Steps steps={steps} setCurrent={setCurrent} current={current} />
      </div>

      <div
        className={`mt-10 bg-co-search shadow-co-search bg-white border rounded p-10`}
      >
        {!room ? (
          <div className="max-w-md">
            <p className="mb-2">
              The room your want to book does not exists or it has been booked
              already
            </p>
            <Button
              onClick={() => {
                router.back();
              }}
            >
              Go Back
            </Button>
          </div>
        ) : (
          <div className={`${current !== 2 && "max-w-md"} `}>
            {current != 3 && (
              <p className={"font-bold mb-4"}>
                You are booking for{" "}
                <span className="text-co-blue">{room?.name}</span> in{" "}
                <span className="text-co-blue">{room?.hotel.name}</span>
              </p>
            )}

            {current === 0 && (
              <BookingStepOne
                formData={{
                  amount: formData?.amount ?? room.price,
                  checkIn: formData?.checkIn ?? new Date().toISOString(),
                  checkOut:
                    formData?.checkOut ??
                    new Date(
                      new Date().setDate(new Date().getDate() + 1)
                    ).toISOString(),
                  guests: formData?.guests ?? 1,
                  numberOfRooms: formData?.numberOfRooms ?? 1,
                }}
                roomAmount={room.price!}
                handleFormChange={handleFormChange}
                facilities={room.facilities}
                handleNightToStay={(nights: number) => setNightsToStay(nights)}
                handleGoNext={handleGoNext}
              />
            )}
          </div>
        )}
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

function TimeCustomInput({ openCalendar, value }: any) {
  return (
    <div className="flex gap-2 mt-2">
      <Input
        name="checkIn"
        type="text"
        label="Arrival time (optional):"
        value={value[0]}
        placeholder="Arrival time (optional):"
        onFocus={openCalendar}
        readOnly
      />
    </div>
  );
}
