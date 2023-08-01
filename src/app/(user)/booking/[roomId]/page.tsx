"use client";
import { useEffect, useState } from "react";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import Steps from "@/components/molecules/Steps";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { IBooking } from "@/types/booking.schema";
import { IRoom } from "@/types/schemas";
import Button from "@/components/atoms/Button";
import BookingStepOne from "@/components/organisms/BookingStepOne";
import BookingStepTwo from "@/components/organisms/BookingStepTwo";
import BookingStepThree from "@/components/organisms/BookingStepThree";
import PaymentForm from "@/components/molecules/PaymentForm";
import { getRoomById } from "@/utils/room.api";

export default function Booking() {
  const router = useRouter();
  const params = useParams();

  const { data: room } = useQuery<IRoom>({
    queryKey: ["room", params?.roomId!],
    queryFn: () => getRoomById(params?.roomId as string),
    enabled: Boolean(params?.roomId),
  });

  const [current, setCurrent] = useState<number>(0);
  const [nightsToStay, setNightsToStay] = useState(1);
  const [bookingID, setBookingId] = useState("");
  const [formData, setFormData] = useState<Partial<IBooking>>();

  const steps = [
    "Hotel room info",
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

            {current === 2 && (
              <BookingStepThree
                room={room}
                nightsToStay={nightsToStay}
                formData={formData as IBooking}
                handleStepChange={handleStepChange}
                handleGoBack={handleGoBack}
                handleGoNext={handleGoNext}
                handleSuccessBooking={handleSuccessBooking}
              />
            )}

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
