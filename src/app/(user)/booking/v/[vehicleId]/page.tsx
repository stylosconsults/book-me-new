"use client";
import { useEffect, useState } from "react";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import Steps from "@/components/molecules/Steps";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { IBooking } from "@/types/booking.schema";
import Button from "@/components/atoms/Button";
import BookingStepOne from "@/components/organisms/BookingStepOne";
import BookingStepTwo from "@/components/organisms/BookingStepTwo";
import BookingStepThree from "@/components/organisms/BookingStepThree";
import PaymentForm from "@/components/molecules/PaymentForm";
import { getVehicleById } from "@/utils/vehicle.api";
import { IVehicle } from "@/types/vehicle.schema";

export default function Booking() {
  const router = useRouter();
  const params = useParams() as { vehicleId: string };

  const { data: vehicle } = useQuery<IVehicle>({
    queryKey: ["vehicle", params?.vehicleId!],
    queryFn: () => getVehicleById(params?.vehicleId as string),
    enabled: Boolean(params?.vehicleId),
  });

  const [current, setCurrent] = useState<number>(0);
  const [nightsToStay, setNightsToStay] = useState(1);
  const [bookingID, setBookingId] = useState("");
  const [formData, setFormData] = useState<Partial<IBooking>>();

  const steps = [
    "Vehicle information",
    "Personal Information",
    "Booking Details",
    "Payment Final",
  ];

  const handleGoNext = () => setCurrent(current + 1);
  const handleGoBack = () => setCurrent(current - 1);
  const handleStepChange = (page: number) => setCurrent(page);

  const handleFormChange = (data: Partial<IBooking>) => {
    setFormData({ ...formData, ...data });
  };

  const handleSuccessBooking = (id: string) => setBookingId(id);

  useEffect(() => {
    if (window && window !== undefined) {
      const bookingId = sessionStorage.getItem("bookingID");
      if (bookingId) {
        setBookingId(bookingId);
        setCurrent(3);
      }
    }
  }, []);

  return (
    <>
      <Breadcrumb
        fullLocation={[
          {
            name: vehicle?.make + " " + vehicle?.model,
            link: "/vehicles/",
          },
          {
            name: "Booking",
            link: "#",
          },
        ]}
      />

      <div className="mt-10 w-full bg-white px-4 py-2 rounded-md">
        <Steps steps={steps} setCurrent={setCurrent} current={current} />
      </div>

      <div
        className={`mt-10 bg-co-search shadow-co-search bg-white border rounded p-10`}
      >
        {!vehicle ? (
          <div className="max-w-md">
            <p className="mb-2">
              The vehicle your want to book does not exists or it has been
              booked already
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
                <span className="text-co-blue">{vehicle.make}</span> with modal{" "}
                <span className="text-co-blue">{vehicle?.model}</span>
              </p>
            )}

            {current === 0 && <p>Step one</p>}

            {current === 1 && (
              <BookingStepTwo
                handleFormChange={handleFormChange}
                formData={{
                  email: formData?.email ?? "",
                  firstName: formData?.firstName ?? "",
                  lastName: formData?.lastName ?? "",
                  phone: formData?.phone ?? "",
                  arrivalTime: formData?.arrivalTime ?? "00:00",
                }}
                handleGoBack={handleGoBack}
                handleGoNext={handleGoNext}
              />
            )}

            {current === 2 && <p>Step two</p>}

            {current === 3 && (
              <div className="flex flex-col gap-4">
                <h1 className="font-bold">
                  You have now booked it is time to pay
                </h1>
                {
                  <PaymentForm
                    bookingID={bookingID}
                    amountToPay={
                      formData?.amount! ??
                      sessionStorage.getItem("bookingAmount")!
                    }
                  />
                }
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
