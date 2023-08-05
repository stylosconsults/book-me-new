import { z } from "zod";
const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const imageSchema = z.any().refine(
    (file) => file?.size <= MAX_FILE_SIZE,
    "Max image size is 5MB."
  ).refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported."
  );
  
export const propertyCategorySchema = z.object({
    category: z.string({
        required_error: "Property category is required"
    }),
})

export const propertyDetails = z.object({
    name: z.string().nonempty("Property name should not be empty."),
    address: z.string().nonempty("Address should not be empty."),
    state: z.string().nonempty("State should not be empty."),
    phone: z.string().nonempty("Phone number should not be empty."),
    description: z.string().nonempty("Description should not be empty."),
    website: z.string().url("Invalid website URL format."),
    email: z.string().email("Invalid email address format."),
    city: z.string().nonempty("City should not be empty."),
})

export const propertyImage = z.object({
    images: z.array(imageSchema).min(1),
  });

export type IPropertyCategorySchema = z.infer<typeof propertyCategorySchema>;
export type IPropertyDetails = z.infer<typeof propertyDetails>;
export type IPropertyImage = z.infer<typeof propertyImage>;
export type IHotel = IPropertyCategorySchema & IPropertyDetails & IPropertyImage & {
  id: string;
  admin: string;
  status: string;
  promoted: boolean;
};
