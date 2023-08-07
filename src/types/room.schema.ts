import { z } from "zod";
import { IHotel } from "./hotel.schema";

export const zodRoom = z.object({
    name: z.string({ required_error: "Name is required." }),
    description: z.string({ required_error: "Description is required." }),
    price: z.number({ required_error: "Price is required." }),
    bedType: z.optional(z.string()),
    children: z.number({ required_error: "Number of children is required." }),
    adults: z.number({ required_error: "Number of adults is required." }),
    size: z.number({ required_error: "Size is required." }),
    hotel: z.string({ required_error: "Hotel is required." }),
    image: z.any({
        required_error: "Please upload at least one image"
    }),
    facilities: z.array(z.string()).optional()
  });

export type IRoom = z.infer<typeof zodRoom> & {
  id: string;
}

export type IRoomWithHotel = IRoom & {
  hotel: IHotel
}