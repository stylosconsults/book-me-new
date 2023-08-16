import { z } from "zod";
import { EEStatus, imageSchema } from "./schemas";



export const zodCategory = z.object({
    name: z.string().min(3, "Category name must be at least 3 letters"),
    image: imageSchema
})

export const zodEditCategory = z.object({
    name: z.string().min(3, "Category name must be at least 3 letters"),
    image: imageSchema.optional()
})

export type ICreateCategory = z.infer<typeof zodCategory>;
export type IEditCategory = z.infer<typeof zodEditCategory>;

export interface ICategory {
    id: string;
    name: string;
    image: string;
    status: EEStatus;
    hotelsCount: number;
}