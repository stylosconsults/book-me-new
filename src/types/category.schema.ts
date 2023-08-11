import { z } from "zod";
import { EEStatus, imageSchema } from "./schemas";



export const zodCategory = z.object({
    name: z.string().min(3, "Category name must be at least 3 letters"),
    image: imageSchema
})

export type ICreateCategory = z.infer<typeof zodCategory>;

export interface ICategory {
    id: string;
    name: string;
    image: string;
    status: EEStatus;
    hotelsCount: number;
}