import ImageUploader from "@/components/atoms/ImageUploader";
import Input from "@/components/atoms/Input";
import Dialog from "@/components/organisms/dialog";
import {
  ICategory,
  ICreateCategory,
  IEditCategory,
  zodCategory,
  zodEditCategory,
} from "@/types/category.schema";
import { addCategory, updateCategory } from "@/utils/category.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm<ICreateCategory>({
    resolver: zodResolver(formData?.id ? zodEditCategory : zodCategory),
    defaultValues: {
      name: formData?.name,
      ...(!formData?.id ? { image: formData?.image } : {}),
    },
  });

  const { mutate, isLoading } = useMutation({
    async onSuccess() {
      toast.success("You have successful added a property.");
      queryClient.invalidateQueries(["propertyCategories"]);
      reset();
      setOpen(false);
    },
    onError(error: { message: string }) {
      toast.error(error.message ?? "An error occurred during registration.");
    },
    mutationFn: addCategory,
  });

  const { mutate: updateMutate, isLoading: isUpdating } = useMutation({
    async onSuccess() {
      toast.success("You have successful updated a property.");
      queryClient.invalidateQueries(["propertyCategories"]);
      reset();
      setOpen(false);
    },
    onError(error: { message: string }) {
      toast.error(error.message ?? "An error occurred during updating.");
    },
    mutationFn: (data: IEditCategory) => updateCategory(formData?.id!, data),
  });

  const onSubmit = (data: ICreateCategory) => {
    formData?.id ? updateMutate(data) : mutate(data);
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
          label={formData?.id ? "Replace image" : "Upload image"}
          onImageChange={(images) => {
            setValue("image", images?.[0], {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
          savedImages={[formData?.image!]}
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
            isLoading={isLoading || isUpdating}
            loadingText="Saving..."
          >
            Save
          </Button>
          <Button
            disabled={isLoading || isUpdating}
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
