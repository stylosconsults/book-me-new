import { BASE_URL } from "@/lib/share";
import { ICreateCategory } from "@/types/category.schema";

export async function getCategories() {
    const res = await fetch(`${BASE_URL}/categories?status=ACTIVE`);
    const users = await res.json();
    return users;
  }

  export async function addCategory(data: ICreateCategory) {
    const formData = new FormData();
    if(data.image){
      formData.append('image', data.image)
    }
    formData.append('name', data.name)

    const response = await fetch(`${BASE_URL}/categories`, {
      method: "POST",
      // headers: {
      //   Authentication: `Bearer ${token}`,
      // },
      body: formData,
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData?.message || "An error occurred during adding category.";
      throw new Error(errorMessage);
    }
  
    return response.json();
  }