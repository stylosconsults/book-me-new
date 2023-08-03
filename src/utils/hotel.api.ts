import { BASE_URL } from "@/lib/share";
import { IHotel } from "@/types/hotel.schema";
import { IFilters } from "@/types/share";
import { objectToQueryParams } from "./queryParams";

export async function getUserNumberOfHotels(userId: string) {
    const res = await fetch(`${BASE_URL}/hotels/user/${userId}`);
    const hotels = await res.json();
    return hotels;
  }
  
  export async function addHotel(createData: IHotel, token: string) {
    const formData = new FormData();
  
    createData?.images.forEach((img, index: number) => {
      formData.append("images" + index, img as unknown as Blob);
    });
  
    formData.append("name", createData?.name);
    formData.append("description", createData?.description);
    formData.append("address", createData?.address);
    formData.append("state", createData?.state);
    formData.append("city", createData?.city);
    formData.append("phone", createData?.phone);
    formData.append("email", createData?.email);
    formData.append("website", createData?.website);
    formData.append("category", createData.category);
    formData.append("admin", createData.admin!);
  
    const response = await fetch(`${BASE_URL}/hotels`, {
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
  
  export async function getHotelsByCategory(category: string) {
    const res = await fetch(`${BASE_URL}/hotels?category=${category}`);
    const hotels = await res.json();
    return hotels;
  }


  export async function getAllHotels({limit, page}: IFilters) {
    const params  = objectToQueryParams({limit, page});
    const res = await fetch(`${BASE_URL}/hotels?${params}`);
    const hotels = await res.json();
    return hotels;
  }