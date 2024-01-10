"use client";

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

  public createCategory(data: { name: string; }, token: string): Promise<any> {
    return fetch(`${this.apiUrl}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  }

  public updateCategory(id: string, data: { name: string; is_active: boolean }, token: string): Promise<any> {
    return fetch(`${this.apiUrl}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, ...data }), // spread the data object
    }).then((response) => response.json());
  }

  public getCategoryByName(name: string, token: string): Promise<any> {
    return fetch(`${this.apiUrl}?page=1&name=${encodeURIComponent(name)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json());
  }

  public getCategoryById(id: string, token: string): Promise<any> {
    return fetch(`${this.apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json());
  }

  public deleteCategory(id: string, token: string): Promise<any> {
    return fetch(`${this.apiUrl}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json());
  }
}

export default CategoryService;
