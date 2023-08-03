import { IFilters } from "@/types/share";
import { objectToQueryParams } from "./queryParams";
import { BASE_URL } from "@/lib/share";

export async function getAllUsers({limit, page}:IFilters){
    const params  = objectToQueryParams({limit, page});
    const res = await fetch(`${BASE_URL}/users?${params}`);
    const hotels = await res.json();
    return hotels;
}