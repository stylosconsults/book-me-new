import { BASE_URL } from "@/lib/share";

export async function getRoomById(id: string) {
    const res = await fetch(`${BASE_URL}/rooms/${id}`);
    const users = await res.json();
    return users;
  }
  
  export async function getAllRoomsWithHotel(hotel: string) {
    const res = await fetch(`${BASE_URL}/rooms?hotel=${hotel}`);
    const users = await res.json();
    return users;
  }