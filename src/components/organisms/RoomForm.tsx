import React, { ReactNode, useState } from "react";
import Dialog from "./dialog";
import Input from "../atoms/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IRoom, zodRoom } from "@/types/room.schema";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRoom, updateRoom } from "@/utils/room.api";
import SelectWithErrorCustomSelect, { IOption } from "../atoms/Select";
import TextArea from "../atoms/TextArea";
import Button from "../atoms/Button";
import { useParams } from "next/navigation";
import ImageUploader from "../atoms/ImageUploader";

interface RoomFormProps {
  room?: IRoom;
  trigger?: ReactNode;
}
export default function RoomForm({ room, trigger }: RoomFormProps) {
  const params = useParams();
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<IRoom>({
    resolver: zodResolver(zodRoom),
    defaultValues: {
      ...room,
      hotel: String(params?.propertyId),
    },
  });

  const { mutate: createRoom, isLoading: isCreatingRoom } = useMutation({
    onSuccess() {
      toast.success(`Room added successful.`);
      queryClient.invalidateQueries(["roomsInHotel"]);
      reset();
      setModalOpen(false);
    },
    onError(error: { message: string }) {
      toast.error(error.message ?? "An error occurred during registration.");
    },
    mutationFn: addRoom,
  });

  const { mutate: updateMutate, isLoading: isUpdatingRoom } = useMutation({
    onSuccess() {
      toast.success(`Room added successful.`);
      queryClient.invalidateQueries(["roomsInHotel"]);
      reset();
      setModalOpen(false);
    },
    onError(error: { message: string }) {
      toast.error(error.message ?? "An error occurred during registration.");
    },
    mutationFn: (data: IRoom) => updateRoom(room?.id!, data),
  });

  const onSubmit = (data: IRoom) => {
    if (room && room.id) {
      updateMutate(data);
    } else {
      createRoom?.(data);
    }
  };

  const facilities = [
    { value: "wifi", label: "Wifi" },
    { value: "parking", label: "Parking" },
    { value: "pool", label: "Pool" },
    { value: "gym", label: "Gym" },
    { value: "spa", label: "Spa" },
    { value: "laundry", label: "Laundry" },
    { value: "room service", label: "Room Service" },
    { value: "air conditioning", label: "Air Conditioning" },
    { value: "tv", label: "TV" },
    { value: "kitchen", label: "Kitchen" },
    { value: "smoking", label: "Smoking" },
  ];

  const bedType = [
    { value: "single", label: "Single" },
    { value: "double", label: "Double" },
    { value: "queen", label: "Queen" },
    { value: "king", label: "King" },
  ];

  console.log({ errors });

  return (
    <Dialog
      title={`Create new room`}
      open={modalOpen}
      setOpen={setModalOpen}
      trigger={trigger}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-3"
      >
        <Input
          label="Room name"
          error={errors.name?.message}
          {...register("name")}
        />
        <div className="flex gap-3">
          <Input
            type="number"
            error={errors.price?.message}
            {...register("price", { valueAsNumber: true })}
            label="Price (in USD)"
          />
          <SelectWithErrorCustomSelect
            className="flex-grow w-full"
            options={bedType}
            error={errors.bedType?.message}
            onChange={(val) => {
              setValue("bedType", val?.value, {
                shouldDirty: true,
              });
            }}
            defaultInputValue={watch("bedType")}
            label="Bed Type"
          />
        </div>
        <div className="flex gap-3">
          <Input
            type="number"
            label="Adults"
            error={errors.adults?.message}
            {...register("adults", { valueAsNumber: true })}
          />
          <Input
            label="Children"
            type="number"
            error={errors.children?.message}
            {...register("children", { valueAsNumber: true })}
          />
        </div>
        <Input
          type="number"
          label="Size (in meters)"
          error={errors.size?.message}
          {...register("size", { valueAsNumber: true })}
        />
        <TextArea
          error={errors.description?.message}
          label="Description"
          {...register("description")}
        />

        <SelectWithErrorCustomSelect
          className="flex-grow w-full"
          options={facilities}
          error={errors.facilities?.message}
          isMulti={true}
          onChange={(val) => {
            const facilities = (
              val as unknown as { label: string; value: string[] }
            )?.value;
            setValue("facilities", facilities, {
              shouldDirty: true,
            });
          }}
          label="Facilities"
        />

        <ImageUploader
          type={"file"}
          label={"Upload image"}
          onImageChange={(images) => {
            setValue("images", images, { shouldDirty: true });
          }}
        />
        <div className="flex gap-3">
          <Button
            loadingText="Saving"
            isLoading={isCreatingRoom || isUpdatingRoom}
            disabled={!isValid && !isDirty}
            className="mt-5 flex-grow bg-co-blue text-white hover:bg-blue-700 border-0"
          >
            Save
          </Button>

          <Button
            type="button"
            disabled={isCreatingRoom || isUpdatingRoom}
            onClick={() => setModalOpen(false)}
            className="mt-5 flex-grow"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
