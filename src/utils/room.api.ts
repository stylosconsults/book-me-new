import { BASE_URL } from "@/lib/share";
import { IRoom } from "@/types/room.schema";

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

  export async function addRoom(createData: IRoom) {
    const formData = new FormData();
    const token = '';
  
    formData.append("name", createData?.name);
    formData.append("description", createData?.description);
    formData.append("adults", String(createData?.adults));
    formData.append("bedType", String(createData?.bedType));
    formData.append("children", String(createData?.children));
    formData.append("hotel", createData?.hotel);
    formData.append("image", createData?.image?.[0] as unknown as Blob);
    formData.append("price", String(createData?.price));
    formData.append("size", String(createData.size));
  
    const response = await fetch(`${BASE_URL}/rooms`, {
      method: "POST",
      headers: {
        Authentication: `Bearer ${token}`,
      },
      body: formData,
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData?.message || "An error occurred during adding property.";
      throw new Error(errorMessage);
    }
  
    return response.json();
  }

  export async function updateRoom(id: string, updateData: IRoom) {
    const res = await fetch(`${BASE_URL}/rooms/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData)
    });
    const room = await res.json();
    return room;
  }

  export async function deleteRoom(id: string) {
    const res = await fetch(`${BASE_URL}/rooms/${id}`, {
      method: "DELETE",
    });
    return true;
  }