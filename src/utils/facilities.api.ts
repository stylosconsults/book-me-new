import { BASE_URL } from "@/lib/share";

export async function getFacilities() {
    const res = await fetch(`${BASE_URL}/facilities`);
    const facilities = await res.json();
    return facilities;
  }

export async function addFacility(data: {name: string}) {
    const response = await fetch(`${BASE_URL}/facilities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData?.message || "An error occurred during adding facility.";
      throw new Error(errorMessage);
    }
  
    return response.json();
}

export async function deleteFacility(id: string) {
    const response = await fetch(`${BASE_URL}/facilities/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw Error("Error removing facility")
    }
  
    return '';
}