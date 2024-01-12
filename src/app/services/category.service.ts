// @/app/services/CategoryService.ts
import { ACCESS_TOKEN } from "@/app/utils/constants";

class CategoryService {
  private static instance: CategoryService;
  private apiUrl: string;

  private constructor() {
    this.apiUrl = "https://mock-api.arikmpt.com/api/category";
  }

  public static getInstance(): CategoryService {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService();
    }
    return CategoryService.instance;
  }

  public createCategory = async (data: { name: string }, token: string): Promise<any> => {
    console.log("Token before API call:", ACCESS_TOKEN);
    return fetch(`${this.apiUrl}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  };

  public updateCategory = async (id: string, data: { name: string; is_active: boolean }): Promise<any> => {
    return fetch(`${this.apiUrl}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ id, ...data }), // spread the data object
    }).then((response) => response.json());
  };

  public getCategoryByName = async (name: string): Promise<any> => {
    return fetch(`${this.apiUrl}?page=1&name=${encodeURIComponent(name)}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }).then((response) => response.json());
  };

  public getCategoryById = async (userId: string): Promise<any> => {
    return fetch(`${this.apiUrl}/${userId}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }).then((response) => response.json());
  };

  public deleteCategory = async (id: string): Promise<any> => {
    return fetch(`${this.apiUrl}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }).then((response) => response.json());
  };
}

export default CategoryService;
