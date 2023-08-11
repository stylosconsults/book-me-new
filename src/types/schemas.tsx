import { z } from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const imageSchema = z
  .any()
  .refine((file) => file?.size <= MAX_FILE_SIZE, {
    message: `Max image size is 5MB.`,
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
    message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
  });

export enum EEStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DELETED = "DELETED",
}

export interface ICreateHotel {
  category: string;
  name: string;
  address: string;
  state: string;
  phone: string;
  description: string;
  website: string;
  email: string;
  images: string[];
  amenities: string[];
}
