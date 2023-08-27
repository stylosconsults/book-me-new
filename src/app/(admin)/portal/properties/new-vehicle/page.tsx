"use client";
import { useUserStore } from "@/store/user";
import { IVehicle, zodVehicle } from "@/types/vehicle.schema";
import { addVehicle } from "@/utils/vehicle.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import SelectWithErrorCustomSelect from "@/components/atoms/Select";
export default function VehicleForm() {
  const { user } = useUserStore((state) => state);
  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    async onSuccess() {
      toast.success("You have successful added a vehicle.");
      router.push("/portal/vehicles");
    },
    onError(error: { message: string }) {
      toast.error(error.message ?? "An error occurred during registration.");
    },
    mutationFn: (data: IVehicle) => addVehicle(data),
  });

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors, isValid, isSubmitted },
  } = useForm<IVehicle>({
    resolver: zodResolver(zodVehicle),
    defaultValues: {
      admin: user?.id,
    },
  });

  const onSubmit = (formData: IVehicle) => {
    mutate(formData);
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("make")}
          label="Make"
          error={errors.make?.message}
        />
        <Input
          {...register("model")}
          label="Vehicle Modal"
          error={errors.model?.message}
        />
        <Input
          {...register("type")}
          label="Vehicle type"
          error={errors.type?.message}
        />
        <Input
          {...register("year")}
          label="Year"
          error={errors.year?.message}
        />
        <Input
          {...register("fuelType")}
          label="Fuel Type"
          error={errors.fuelType?.message}
        />
        <Input
          {...register("seats", { valueAsNumber: true })}
          label="Number of seats"
          error={errors.seats?.message}
        />
        <Input
          {...register("transmission")}
          label="Vehicle transmission"
          error={errors.transmission?.message}
        />
        <Input
          {...register("location")}
          label="Pick up location"
          error={errors.location?.message}
        />
        <Input
          {...register("dailyPrice", {
            valueAsNumber: true,
          })}
          error={errors.dailyPrice?.message}
          label="Daily Price"
        />
        <TextArea {...register("description")} label="Description" />
        <SelectWithErrorCustomSelect
          label="Select your property category"
          options={[]}
          isMulti
          error={errors.features?.message}
          placeholder={"Select property category"}
          onChange={(newValue) => {
            setValue("features", [], { shouldValidate: true });
          }}
        />
      </form>
    </div>
  );
}
