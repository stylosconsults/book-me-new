import React from "react";
import Input from "../atoms/Input";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePicker, { DateObject } from "react-multi-date-picker";
import {
  IBooking,
  IBookingStepTwo,
  bookingStepTwoSchema,
} from "@/types/booking.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../atoms/Button";

export default function BookingStepTwo({
  formData,
  handleFormChange,
  handleGoBack,
  handleGoNext,
}: {
  formData: IBookingStepTwo;
  handleFormChange: (data: Partial<IBooking>) => void;
  handleGoBack: () => void;
  handleGoNext: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IBookingStepTwo>({
    resolver: zodResolver(bookingStepTwoSchema),
    defaultValues: {
      arrivalTime: formData.arrivalTime,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
    },
  });

  const onSubmit = (data: IBookingStepTwo) => {
    handleFormChange?.(data);
    handleGoNext?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <Input
        {...register("firstName")}
        name="firstName"
        label="First Name"
        placeholder="First name"
        error={errors.firstName?.message}
      />
      <Input
        {...register("lastName")}
        label="Last Name"
        placeholder="Last name"
        error={errors.lastName?.message}
      />
      <Input
        {...register("email")}
        label="Email"
        type="email"
        placeholder="Email"
        error={errors.email?.message}
      />
      <Input
        {...register("phone")}
        label="Phone number"
        placeholder="Phone number"
        error={errors.phone?.message}
      />
      <div className="flex flex-col gap-2">
        <DatePicker
          disableDayPicker
          format="HH:mm"
          onChange={(dateObject: DateObject) => {
            if (dateObject) {
              setValue("arrivalTime", dateObject.format("HH::mm"));
            }
          }}
          plugins={[<TimePicker key={"arrivalTime"} hideSeconds />]}
          render={<TimeCustomInput />}
        />
      </div>
      <div className="flex gap-3">
        <Button
          disabled={Object.values(errors).length > 0}
          className="mt-5 bg-co-blue text-white hover:bg-blue-700 border-0"
        >
          Next
        </Button>

        <Button onClick={handleGoBack} className="mt-5">
          Back
        </Button>
      </div>
    </form>
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
