import * as z from 'zod';
import { IRoom } from './schemas';

export const bookingSchema = z.object({
    hotel: z.string().uuid(),
    room: z.string().uuid(),
    paymentMethod: z.string(),
})

export const bookingStepOneSchema = z.object({
    amount: z.number().min(0.01, "Amount should be greater than zero"),
    numberOfRooms: z.number().min(1, "Number of rooms should be at least 1"),
    checkIn: z.string({
        required_error: "Check-in date is required"
    }),
    checkOut: z.string({
        required_error: "Check-out date is required"
    }),
    guests: z.number().min(1),
})

export const bookingStepTwoSchema = z.object({

    firstName: z.string({
        required_error: "First name is required"
    }).min(3, "First name must be at least 3 characters"),
    lastName: z.string({
        required_error: "Last name is required"
    }).min(3, "Last name must be at least 3 characters"),
    email: z.string({
        required_error: 'Email is required'
    }).email("Invalid email"),
    phone: z.string({
            required_error: "Phone number is required"
        }).min(10, "Phone number must be at least 10 characters")
        .max(15, "Phone number must be at most 15 characters"),
    arrivalTime: z.string().optional(),
})



export type IBookingStepOne = z.infer<typeof bookingStepOneSchema>;
export type IBookingStepTwo = z.infer<typeof bookingStepTwoSchema>;
export type IBooking = z.infer<typeof bookingSchema> & IBookingStepOne & IBookingStepTwo & {
    status: string;
    room: IRoom
};