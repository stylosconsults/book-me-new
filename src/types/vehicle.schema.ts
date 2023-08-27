import { z } from "zod";
import { imageSchema } from "./schemas";

export const zodVehicle = z.object({
  make: z.string(),
  model: z.string(),
  year: z.number(),
  type: z.string(),
  seats: z.number(),
  transmission: z.string(),
  fuelType: z.string(),
  dailyPrice: z.number(),
  images: z.array(imageSchema).min(1, "Please provide at least one image URL"),
  location: z.string(),
  features: z.array(z.string()),
  description: z.string(),
  admin: z.string()
});

export type IVehicle = z.infer<typeof zodVehicle> & {
  id: string
}