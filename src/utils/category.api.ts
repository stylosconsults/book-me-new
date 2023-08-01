import { BASE_URL } from "@/lib/share";

export async function getCategories() {
    const res = await fetch(`${BASE_URL}/categories?status=ACTIVE`);
    const users = await res.json();
    return users;
  }
  