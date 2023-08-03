import { BASE_URL } from "@/lib/share";
import { objectToQueryParams } from "./queryParams";
import { IFilters } from "@/types/share";

export async function getAllBookings({page=1, limit=7}:IFilters) {
  const params  = objectToQueryParams({page, limit});
    const res = await fetch(`${BASE_URL}/bookings?${params}&populate=room`);
    const bookings = await res.json();
    return bookings;
  }
  