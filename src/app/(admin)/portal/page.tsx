"use client";
import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import ImageUploader from "@/components/atoms/ImageUploader";
import Input from "@/components/atoms/Input";
import SelectWithErrorCustomSelect, {
  IOption,
} from "@/components/atoms/Select";
import TextArea from "@/components/atoms/TextArea";
import Steps from "@/components/molecules/Steps";
import { GetCategories } from "@/components/organisms/CategoriesList";
import Dialog from "@/components/organisms/dialog";
import { countries } from "@/data/countries";
import { BASE_URL } from "@/lib/share";
import useStore from "@/store/main";
import { useUserStore } from "@/store/user";
import {
  IPropertyCategorySchema,
  IPropertyDetails,
  IPropertyImage,
  propertyCategorySchema,
  propertyDetails,
  propertyImage,
  IHotel,
} from "@/types/hotel.schema";
import { ICategory } from "@/types/schemas";
import { USER_TYPES } from "@/utils/user";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export async function GetUserNumberOfHotels(userId: string) {
  const res = await fetch(`${BASE_URL}/hotels/user/${userId}`);
  const users = await res.json();
  return users;
}

export async function AddHotel(createData: IHotel, token: string) {
  const formData = new FormData();

  createData?.images.forEach((img, index: number) => {
    formData.append("images" + index, img as unknown as Blob);
  });

  formData.append("name", createData?.name);
  formData.append("description", createData?.description);
  formData.append("address", createData?.address);
  formData.append("state", createData?.state);
  formData.append("city", createData?.city);
  formData.append("phone", createData?.phone);
  formData.append("email", createData?.email);
  formData.append("website", createData?.website);
  formData.append("category", createData.category);
  formData.append("admin", createData.admin!);

  const response = await fetch(`${BASE_URL}/hotels`, {
    method: "POST",
    headers: {
      Authentication: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage =
      errorData?.message || "An error occurred during adding property.";
    throw new Error(errorMessage);
  }

  return response.json();
}

export default function AdminHome() {
  const [open, setOpen] = useState(false);
  const auth = useStore(useUserStore, (state) => state);
  const [userId, setUserId] = useState(auth?.user?.id);

  const { data: userHotels, isLoading: isUserHotelsLoading } = useQuery({
    queryKey: ["userHotels"],
    queryFn: () => GetUserNumberOfHotels(userId!),
    enabled: Boolean(userId),
  });

  useEffect(() => {
    if (
      userHotels &&
      auth?.user?.role === USER_TYPES.HOTEL_ADMIN &&
      userHotels?.numberHotels <= 0
    ) {
      setOpen(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userHotels]);

  useEffect(() => {
    setUserId(auth?.user?.id!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.user]);

  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState<Partial<IHotel>>();

  const handleFormDataChange = (data: Partial<IHotel>) => {
    setFormData({ ...formData, ...data });
  };

  const handleNext = () => setCurrent(current + 1);
  const handlePrev = () => setCurrent(current - 1);
  const handleModalClose = () => setOpen(false);

  return (
    <div>
      <Dialog open={open}>
        <Heading
          subTitleClassName="max-w-[600px]"
          subTitle="Now that you have successfully registered as a hotel administrator, it's time to enrich your profile with essential and captivating details about your property."
        >
          Welcome, Back!
        </Heading>

        <Steps
          current={current}
          setCurrent={setCurrent}
          steps={["Property type", "Property Details", "Property Images"]}
        />

        {current === 0 ? (
          <SelectPropertyType
            handleFormDataChange={handleFormDataChange}
            formData={formData}
            handleNext={handleNext}
          />
        ) : current === 1 ? (
          <PropertyDetails
            handleFormDataChange={handleFormDataChange}
            formData={formData}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        ) : current === 2 ? (
          <PropertyImages
            handleFormDataChange={handleFormDataChange}
            formData={formData}
            handleNext={handleNext}
            handlePrev={handlePrev}
            handleModalClose={handleModalClose}
          />
        ) : null}
      </Dialog>
    </div>
  );
}

interface HotelRegisterProps {
  formData?: Partial<IHotel>;
  handleFormDataChange?: (data: Partial<IHotel>) => void;
  handleNext?: () => void;
  handlePrev?: () => void;
  handleModalClose?: () => void;
}

function SelectPropertyType({
  formData,
  handleFormDataChange,
  handleNext,
}: HotelRegisterProps) {
  const { data: propertyCategories, isLoading: isPropertyCategoriesLoading } =
    useQuery({
      queryKey: ["propertyCategories"],
      queryFn: GetCategories,
    });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isSubmitted },
  } = useForm<IPropertyCategorySchema>({
    resolver: zodResolver(propertyCategorySchema),
    defaultValues: {
      category: formData?.category,
    },
  });

  const formattedOptions =
    propertyCategories?.results?.map((cat: ICategory) => ({
      value: cat.id,
      label: cat.name,
    })) ?? [];

  const onSubmit = (data: IPropertyCategorySchema) => {
    handleFormDataChange?.(data);
    handleNext?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <SelectWithErrorCustomSelect
        label="Select your property category"
        options={formattedOptions}
        error={errors.category?.message}
        isLoading={isPropertyCategoriesLoading}
        defaultInputValue={
          formattedOptions?.find(
            (opt: IOption) => opt.value === watch("category")
          )?.label ?? ""
        }
        placeholder={"Select property category"}
        onChange={(newValue) => {
          const val: { value: string } = newValue as unknown as IOption;
          setValue("category", String(val?.value), { shouldValidate: true });
        }}
      />
      <Button type="submit" disabled={isSubmitted && !isValid}>
        Next
      </Button>
    </form>
  );
}

function PropertyDetails({
  handleFormDataChange,
  formData,
  handleNext,
  handlePrev,
}: HotelRegisterProps) {
  const {
    handleSubmit,
    watch,
    register,
    setValue,
    formState: { errors, isValid, isSubmitted },
  } = useForm<IPropertyDetails>({
    resolver: zodResolver(propertyDetails),
    defaultValues: {
      address: formData?.address,
      description: formData?.description,
      email: formData?.email,
      name: formData?.name,
      phone: formData?.phone,
      state: formData?.state,
      website: formData?.website,
      city: formData?.city,
    },
  });

  const onSubmit = (data: IPropertyDetails) => {
    handleFormDataChange?.(data);
    handleNext?.();
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("name")}
        label="Name"
        placeholder="Your property name"
        error={errors.name?.message}
      />
      <Input
        {...register("email")}
        label="Email address"
        placeholder="Your property email address"
        error={errors.email?.message}
      />

      <SelectWithErrorCustomSelect
        label="Select country"
        options={countries.map((count) => ({
          label: count.name,
          value: count.code,
        }))}
        error={errors.state?.message}
        defaultInputValue={
          countries?.find((opt) => opt.code === watch("state"))?.name ?? ""
        }
        placeholder={"Select property category"}
        onChange={(newValue) => {
          const val: { value: string } = newValue as unknown as IOption;
          setValue("state", String(val?.value), { shouldValidate: true });
        }}
      />

      <Input
        {...register("city")}
        disabled={!watch("state")}
        label="City"
        placeholder="Your property city"
        error={errors.address?.message}
      />

      <Input
        {...register("address")}
        label="Property Address"
        placeholder="Your property location"
        error={errors.address?.message}
      />

      <Input
        {...register("phone")}
        label="Phone number"
        placeholder="Your property phone number"
        error={errors.phone?.message}
      />

      <Input
        {...register("website")}
        type="url"
        label="Website URL"
        placeholder="https://feldux.com"
        error={errors.website?.message}
      />

      <TextArea
        {...register("description")}
        label="Description"
        placeholder="Your property description"
        error={errors.description?.message}
      />

      <div className="flex gap-4">
        <Button
          className="flex-grow"
          type="submit"
          disabled={isSubmitted && !isValid}
        >
          Next
        </Button>
        <Button className="flex-grow" type="button" onClick={handlePrev}>
          Back
        </Button>
      </div>
    </form>
  );
}

function PropertyImages({
  handleFormDataChange,
  formData,
  handlePrev,
  handleModalClose,
}: HotelRegisterProps) {
  const auth = useStore(useUserStore, (state) => state);
  const {
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isValid, isSubmitted },
  } = useForm<IPropertyImage>({
    resolver: zodResolver(propertyImage),
    defaultValues: {
      images: formData?.images,
    },
  });

  const { mutate, isLoading } = useMutation({
    async onSuccess(data: { hotel: IHotel }) {
      toast.success("You have successful added a proprty.");
      handleModalClose?.();
    },
    onError(error: { message: string }) {
      toast.error(error.message ?? "An error occurred during registration.");
    },
    mutationFn: (data: IHotel) => AddHotel(data, auth?.accessToken?.token!),
  });

  const images = watch("images");

  const onSubmit = () => {
    mutate({ ...formData, images, admin: auth?.user?.id } as IHotel);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ImageUploader
        type={"file"}
        label={
          watch("images")?.length <= 0 ? "Upload images" : "Add another images"
        }
        onImageChange={(images) => {
          setValue("images", images, { shouldValidate: true });
        }}
        defaultImages={images}
      />

      <div className="flex gap-4">
        <Button
          isLoading={isLoading}
          className="flex-grow"
          type="submit"
          disabled={isSubmitted && !isValid}
        >
          Next
        </Button>
        <Button
          disabled={isLoading}
          className="flex-grow"
          type="button"
          onClick={() => {
            handleFormDataChange?.({ images: getValues("images") });
            handlePrev?.();
          }}
        >
          Back
        </Button>
      </div>
    </form>
  );
}
