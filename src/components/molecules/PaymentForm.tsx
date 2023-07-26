import { useState } from "react";

import Button from "../atoms/Button";
import { BASE_URL } from "@/lib/share";
import SelectWithErrorCustomSelect from "../atoms/Select";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import Script from "next/script";

const CreatePayMentSession = async ({
  amountToPay,
}: {
  amountToPay: number;
}) => {
  const res = await fetch(`${BASE_URL}/payments/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: amountToPay }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage =
      errorData?.message || "An error occurred during booking.";
    throw new Error(errorMessage);
  }

  const payment = await res.json();
  return payment;
};

interface PaymentFormProps {
  amountToPay: number;
  bookingID: string;
}

function PaymentForm({ amountToPay, bookingID }: PaymentFormProps) {
  let Checkout: any;

  if (typeof window !== "undefined") {
    // @ts-ignore
    Checkout = window.Checkout;
  }
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const paymentMethods = [
    { value: "visa", label: "Visa card" },
    { value: "mastercard", label: "Mastercard" },
    { value: "bank", label: "Bank transfer" },
  ];

  const pay = (sessionId: string, uid: number) => {
    Checkout.configure({
      session: {
        id: `${sessionId}`,
      },
      merchant: "8206000697",
      order: {
        amount: amountToPay,
        currency: "USD",
        description: `Payment for booking with GoDiscoverAfrica via bookme.rw for amount ${amountToPay}`,
        id: uid,
        reference: uid,
      },
      transaction: {
        reference: uid,
      },
      interaction: {
        operation: "PURCHASE",
        merchant: {
          name: "GODISCOVER AFRICA LTD",
          address: {
            line1: "kicukiro",
          },
        },
      },
    });
    Checkout.showLightbox();
  };

  const { mutate, isLoading } = useMutation({
    async onSuccess(data) {
      const uid = Math.abs(new Date().valueOf());
      sessionStorage.setItem("bookingID", bookingID);
      pay(data.sessionId, uid);
    },
    onError(error: { message: string }) {
      toast.error(error.message ?? "An error occurred during payment session.");
    },
    mutationFn: () => CreatePayMentSession({ amountToPay }),
  });

  return (
    <>
      {/* load mastercard payment javascript */}

      <Script
        src="https://ap-gateway.mastercard.com/checkout/version/61/checkout.js"
        data-error="errorCallback"
        data-cancel="cancelCallback"
        data-complete="completeCallback"
      />

      <Script src="/static/js/script.js" />

      <div className="flex flex-col gap-2">
        <p className="text-co-black font-bold text-base">
          How Do You Want To Pay.
        </p>
        <SelectWithErrorCustomSelect
          name={"paymentMethod"}
          options={paymentMethods}
          placeholder="Select payment option"
          onChange={(e) => setSelectedPaymentMethod(e?.value as string)}
        />
      </div>

      <div className="flex gap-3">
        <Button
          disabled={isLoading || !selectedPaymentMethod}
          onClick={mutate}
          className="mt-5 bg-co-blue text-white hover:bg-blue-700 border-0"
        >
          {isLoading ? "Loading..." : "Pay now"}
        </Button>
      </div>
    </>
  );
}

export default PaymentForm;
