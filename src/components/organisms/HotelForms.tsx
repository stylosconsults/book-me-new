import {
  IEditHotel,
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
import { countries } from "@/data/countries";
import useStore from "@/store/main";
import { useUserStore } from "@/store/user";
import Button from "../atoms/Button";
import Heading from "../atoms/Heading";
import Steps from "../molecules/Steps";
import { ChangeEvent, useState } from "react";
import { USER_TYPES } from "@/utils/user";
import { ICategory } from "@/types/category.schema";
import { getFacilities } from "@/utils/facilities.api";
import { IFacility } from "@/types/facilities.schema";
import Link from "next/link";

export interface HotelRegisterProps {
  formData?: Partial<IEditHotel>;
  handleFormDataChange?: (data: Partial<IHotel>) => void;
  handleNext?: () => void;
  handlePrev?: () => void;
}

interface IPropFormProps
  extends Pick<HotelRegisterProps, "formData" | "handleFormDataChange"> {
  mutate: (formData: IHotel) => void;
  isLoading: boolean;
}

export function PropertyForm({
  formData,
  isLoading,
  mutate,
  handleFormDataChange,
}: IPropFormProps) {
  const [current, setCurrent] = useState(0);
  const auth = useStore(useUserStore, (state) => state);
  const isAdmin = auth?.user?.role === USER_TYPES.ADMIN;

  const handleNext = () => setCurrent(current + 1);
  const handlePrev = () => setCurrent(current - 1);

  const allSteps = [
    "Property type",
    "Property Details",
    // ...(isAdmin ? ["Property Settings"] : []),
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
        ) : current === 2 ? (
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
        placeholder={"Select property category"}
        defaultInputValue={
          formattedOptions.find(
            (value: IOption) => value.value === watch("category")
          )?.label
        }
        onChange={(newValue) => {
          const val: { value: string } = newValue as unknown as IOption;
          setValue("category", String(val?.value), { shouldValidate: true });
        }}
      />
      <Button
        type="submit"
        disabled={(isSubmitted && !isValid) || isPropertyCategoriesLoading}
      >
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

  const auth = useStore(useUserStore, (state) => state);
  const isAdmin = auth?.user?.role === USER_TYPES.ADMIN;

  const onSubmit = (data: IPropertyDetails) => {
    handleFormDataChange?.(data);
    handleNext?.();
  };

  const { data, isLoading } = useQuery({
    queryFn: getFacilities,
    queryKey: ["facilities"],
  });

  const amenities = data?.results?.map((fac: IFacility) => ({
    value: fac.name,
    label: fac.name,
  }));

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

      <div>
        <SelectWithErrorCustomSelect
          className="flex-grow w-full"
          options={amenities}
          value={watch("amenities")?.map((fa) => ({ label: fa, value: fa }))}
          error={errors.amenities?.message}
          isMulti
          isLoading={isLoading}
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
        {isAdmin && (
          <Link
            href={"/portal/facilities"}
            className="leading-none text-blue-500 underline text-sm -mt-3"
          >
            Add more amenities
          </Link>
        )}
      </div>

      <SelectWithErrorCustomSelect
        label="Select country"
        options={countries.map((count) => ({
          label: count.name,
          value: count.name,
        }))}
        error={errors.state?.message}
        defaultInputValue={watch("state")}
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
        label={formData?.id ? "Add images" : "Upload images"}
        onImageChange={(images) => {
          setValue("images", images, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }}
        savedImages={formData?.savedImages ?? []}
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
            handleFormDataChange?.({ images });
            handlePrev?.();
          }}
        >
          Back
        </Button>
      </div>
    </form>
  );
}
