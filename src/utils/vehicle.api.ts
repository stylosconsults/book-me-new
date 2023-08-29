import { BASE_URL } from "@/lib/share";
import { IVehicle } from "@/types/vehicle.schema";
import { objectToQueryParams } from "./queryParams";
import { IFilters } from "@/types/share";

export async function getAllVehicles({limit, page}: IFilters) {
  const params  = objectToQueryParams({limit, page});
  const res = await fetch(`${BASE_URL}/vehicles?${params}`);
  const hotels = await res.json();
  return hotels;
}

export async function getVehicleById(id: string) {
  const res = await fetch(`${BASE_URL}/vehicles/${id}`);
  const vehicles = await res.json();
  return vehicles;
}
export async function addVehicle(createData: IVehicle) {
    const formData = new FormData();
  
    createData?.images.forEach((img, index: number) => {
      formData.append("images" + index, img as unknown as Blob);
    });
  
    createData.features.map((feature)=>{
      formData.append('features', feature);
    })

    formData.append("make", createData?.make);
    formData.append("model", createData?.model);
    formData.append("description", createData?.description);
    formData.append("dailyPrice", String(createData?.dailyPrice));
    formData.append("fuelType", createData?.fuelType);
    formData.append("location", createData?.location);
    formData.append("seats", String(createData?.seats));
    formData.append("transmission", createData?.transmission);
    formData.append("type", createData?.type);
    formData.append("year", String(createData.year));
    formData.append("admin", createData.admin!);

    const response = await fetch(`${BASE_URL}/vehicles`, {
      method: "POST",
      // headers: {
      //   Authentication: `Bearer ${token}`,
      // },
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