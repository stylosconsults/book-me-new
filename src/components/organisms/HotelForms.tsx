import {
  IHotel,
  IPropertyCategorySchema,
  IPropertyDetails,
  IPropertyImage,
  propertyCategorySchema,
  propertyDetails,
  propertyImage,
} from "@/types/hotel.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import SelectWithErrorCustomSelect, { IOption } from "../atoms/Select";
import Input from "../atoms/Input";
import ImageUploader from "../atoms/ImageUploader";
import TextArea from "../atoms/TextArea";
import { getCategories } from "@/utils/category.api";
import { ICategory } from "@/types/schemas";
import { countries } from "@/data/countries";
import useStore from "@/store/main";
import { useUserStore } from "@/store/user";
import Button from "../atoms/Button";
import Heading from "../atoms/Heading";
import Steps from "../molecules/Steps";
import { ChangeEvent, useState } from "react";
import { USER_TYPES } from "@/utils/user";

export interface HotelRegisterProps {
  formData?: Partial<IHotel>;
  handleFormDataChange?: (data: Partial<IHotel>) => void;
  handleNext?: () => void;
  handlePrev?: () => void;
}

interface IPropFormProps
  extends Pick<HotelRegisterProps, "formData" | "handleFormDataChange"> {
  property?: IHotel;
  mutate: (formData: IHotel) => void;
  isLoading: boolean;
}

export function PropertyForm({
  property,
  formData,
  isLoading,
  mutate,
  handleFormDataChange,
}: IPropFormProps) {
  const [current, setCurrent] = useState(0);
  const auth = useStore(useUserStore, (state) => state);

  const handleNext = () => setCurrent(current + 1);
  const handlePrev = () => setCurrent(current - 1);

  const isAdmin = auth?.user?.role === USER_TYPES.ADMIN;

  const allSteps = [
    "Property type",
    "Property Details",
    ...(isAdmin ? ["Property Settings"] : []),
    "Property Images",
  ];

  return (
    <div className="max-w-[600px] mx-auto py-10">
      <Heading className="mb-5">Adding new Hotel</Heading>

      <Steps current={current} setCurrent={setCurrent} steps={allSteps} />

      <div className="mt-4">
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
        ) : isAdmin && current === 2 ? (
          <PropertySettings
            formData={formData}
            handleFormDataChange={handleFormDataChange}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        ) : current === allSteps.length - 1 ? (
          <PropertyImages
            handleFormDataChange={handleFormDataChange}
            formData={formData}
            handleNext={handleNext}
            handlePrev={handlePrev}
            isLoading={isLoading}
            mutate={mutate}
          />
        ) : null}
      </div>
    </div>
  );
}

export function PropertySettings({
  formData,
  handleFormDataChange,
  handleNext,
  handlePrev,
}: HotelRegisterProps) {
  return (
    <>
      <div className="flex gap-2 py-3">
        <input
          type="checkbox"
          checked={formData?.promoted}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleFormDataChange?.({
              promoted: e.target.checked,
            });
          }}
        />
        <p>Promote hotel</p>
      </div>
      <div className="flex gap-4">
        <Button
          className="flex-grow"
          type="submit"
          // disabled={isSubmitted && !isValid}
          onClick={handleNext}
        >
          Next
        </Button>
        <Button className="flex-grow" type="button" onClick={handlePrev}>
          Back
        </Button>
      </div>
    </>
  );
}
export function SelectPropertyType({
  formData,
  handleFormDataChange,
  handleNext,
}: HotelRegisterProps) {
  const { data: propertyCategories, isLoading: isPropertyCategoriesLoading } =
    useQuery({
      queryKey: ["propertyCategories"],
      queryFn: getCategories,
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

export function PropertyDetails({
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
      amenities: formData?.amenities,
    },
  });

  const onSubmit = (data: IPropertyDetails) => {
    handleFormDataChange?.(data);
    handleNext?.();
  };

  const amenities = [
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
        error={errors.city?.message}
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

      <SelectWithErrorCustomSelect
        className="flex-grow w-full"
        options={amenities}
        value={watch("amenities")?.map((fa) => ({ label: fa, value: fa }))}
        error={errors.amenities?.message}
        isMulti
        onChange={(val) => {
          const facilities = val as unknown as IOption[];
          const value = facilities.map((fac) => fac.value);
          setValue("amenities", value, {
            shouldDirty: true,
            shouldValidate: true,
          });
        }}
        label="Facilities"
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

export function PropertyImages({
  handleFormDataChange,
  formData,
  handlePrev,
  isLoading,
  mutate,
}: HotelRegisterProps & {
  mutate: (formData: IHotel) => void;
  isLoading: boolean;
}) {
  const auth = useStore(useUserStore, (state) => state);
  const {
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isValid, isSubmitted, errors },
  } = useForm<IPropertyImage>({
    resolver: zodResolver(propertyImage),
    defaultValues: {
      images: formData?.images,
    },
  });

  const images = watch("images");

  const onSubmit = () => {
    mutate({ ...formData, images, admin: auth?.user?.id } as IHotel);
  };

  const imageErrors = !errors.images?.message
    ? (errors?.images as { message: string }[])?.map((err) => ({
        message: err?.message ?? "",
      }))
    : [];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ImageUploader
        type={"file"}
        label={"Upload images"}
        onImageChange={(images) => {
          setValue("images", images, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }}
        errors={imageErrors}
        singleError={
          typeof errors.images?.message === "string"
            ? errors.images?.message
            : ""
        }
        defaultImages={images}
      />

      <div className="flex gap-4">
        <Button
          isLoading={isLoading}
          className="flex-grow"
          type="submit"
          disabled={isSubmitted && !isValid}
        >
          Save
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
