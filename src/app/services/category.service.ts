// @/app/services/CategoryService.ts
import { ACCESS_TOKEN_KEY } from "../utils/constants";

class CategoryService {
  private static instance: CategoryService;
  private apiUrl: string;
  private token: string;

  private constructor() {
    this.apiUrl = "https://mock-api.arikmpt.com/api/category";
    this.token = localStorage.getItem(ACCESS_TOKEN_KEY) || "";
  }

  public static getInstance(): CategoryService {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService();
    }
    return CategoryService.instance;
  }

  public updateToken(token: string): void {
    this.token = token;
  }

  public createCategory = async (data: { name: string }, token: string): Promise<any> => {
    return fetch(`${this.apiUrl}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  };

  public updateCategory = async (id: string, data: { name: string; is_active: boolean }): Promise<any> => {
    return fetch(`${this.apiUrl}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({ id, ...data }), // spread the data object
    }).then((response) => response.json());
  };

  public getCategoryByName = async (name: string): Promise<any> => {
    return fetch(`${this.apiUrl}?page=1&name=${encodeURIComponent(name)}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).then((response) => response.json());
  };

  public getCategoryById = async (): Promise<any> => {
    return fetch(`${this.apiUrl}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).then((response) => response.json());
  };

  public deleteCategory = async (id: string): Promise<any> => {
    return fetch(`${this.apiUrl}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).then((response) => response.json());
  };
}

export default CategoryService;