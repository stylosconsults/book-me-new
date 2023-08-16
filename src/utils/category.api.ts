import { BASE_URL } from "@/lib/share";
import { ICreateCategory, IEditCategory } from "@/types/category.schema";

export async function getCategories() {
    const res = await fetch(`${BASE_URL}/categories?status=ACTIVE`);
    const categories = await res.json();
    return categories;
}

export async function updateCategory(id: string, data: IEditCategory){
    const res = await fetch(`${BASE_URL}/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const categories = await res.json();
      return categories;
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