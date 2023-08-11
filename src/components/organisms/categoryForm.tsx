import ImageUploader from "@/components/atoms/ImageUploader";
import Input from "@/components/atoms/Input";
import Dialog from "@/components/organisms/dialog";
import {
  ICategory,
  ICreateCategory,
  zodCategory,
} from "@/types/category.schema";
import { addCategory } from "@/utils/category.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "../atoms/Button";

export default function CategoryForm({
  formData,
  trigger,
}: {
  formData?: ICategory;
  trigger: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm<ICreateCategory>({
    resolver: zodResolver(zodCategory),
    defaultValues: {
      name: formData?.name,
      image: formData?.image,
    },
  });

  const { mutate, isLoading } = useMutation({
    async onSuccess() {
      toast.success("You have successful added a property.");
      reset();
      setOpen(false);
    },
    onError(error: { message: string }) {
      toast.error(error.message ?? "An error occurred during registration.");
    },
    mutationFn: addCategory,
  });

  const onSubmit = (data: ICreateCategory) => {
    mutate(data);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  return (
    <Dialog
      title={`${formData?.id ? "Edit" : "Add"} Property Category`}
      open={open}
      setOpen={setOpen}
      trigger={trigger}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Input
          error={errors.name?.message}
          label="Category name"
          {...register("name")}
        />
        <ImageUploader
          type={"file"}
          label={"Upload images"}
          onImageChange={(images) => {
            setValue("image", images?.[0], {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
          max={1}
          singleError={
            typeof errors.image?.message === "string"
              ? errors.image?.message
              : ""
          }
        />
        <div className="flex gap-3">
          <Button
            disabled={!isDirty}
            theme="secondary"
            className="flex-grow"
            isLoading={isLoading}
            loadingText="Saving..."
          >
            Save
          </Button>
          <Button
            disabled={isLoading}
            className="flex-grow"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
