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
  
    createData.amenities.map((amenity)=>{
      formData.append('amenities', amenity);
    })

    formData.append("name", createData?.name);
    formData.append("description", createData?.description);
    formData.append("address", createData?.address);
    formData.append("state", createData?.state);
    formData.append("city", createData?.city);
    formData.append("phone", createData?.phone??"");
    formData.append("email", createData?.email??"");
    formData.append("website", createData?.website??"");
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
    // this will be enable later category=${category}
    // const res = await fetch(`${BASE_URL}/hotels?limit=100`);
      const res = await fetch(`${BASE_URL}/hotels/promoted`)
    const hotels = await res.json();
    return hotels;
  }


  export async function getAllHotels({limit, page}: IFilters) {
    const params  = objectToQueryParams({limit, page});
    // const res = await fetch(`${BASE_URL}/hotels?${params}`);
      const res = await fetch(`${BASE_URL}/hotels/promoted`);
    const hotels = await res.json();
    return hotels;
  }

  export async function getHotelById(id: string) {
    const res = await fetch(`${BASE_URL}/hotels/${id}`);
    const hotel = await res.json();
    return hotel;
  }

  export async function updateHotel(id: string, data: Partial<IHotel>){
    const res = await fetch(`${BASE_URL}/hotels/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    const hotel = await res.json();
    return hotel;
  }

  export async function deleteHotel(id: string){
    const res = await fetch(`${BASE_URL}/hotels/${id}`, {
      method: "DELETE",
    });
    return true
  }

