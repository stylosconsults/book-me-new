import { z } from "zod";
import { imageSchema } from "./schemas";

  
export const propertyCategorySchema = z.object({
    category: z.string({
        required_error: "Property category is required"
    }),
})

export const propertyDetails = z.object({
    name: z.string().nonempty("Property name should not be empty."),
    address: z.string().nonempty("Address should not be empty."),
    state: z.string().nonempty("State should not be empty."),
    phone: z.string().optional(),
    description: z.string().nonempty("Description should not be empty."),
    website: z.string().optional(),
    email: z.string().optional(),
    city: z.string().nonempty("City should not be empty."),
    amenities: z.array(z.string()).min(2, "Add at least two amenities")
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

export type IEditHotel = IHotel & {
  savedImages: string[]
}