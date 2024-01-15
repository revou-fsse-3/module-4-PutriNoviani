"use client"

import { AuthType } from "@/app/types";
import { ACCESS_TOKEN_KEY } from "../utils/constants";




class AuthService {
  private static instance: AuthService;

  private apiUrl: string;

  private constructor() {
    this.apiUrl = "https://mock-api.arikmpt.com/api/user";
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public registerUser = async (data: AuthType): Promise<any> => {
    const { name, email, password } = data;

    const response = await fetch(`${this.apiUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    return response.json();
  };

  public loginUser = async (data: AuthType): Promise<any> => {
    const { email, password } = data;

    const response = await fetch(`${this.apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    return response.json();
  };

  public getUser = async (): Promise<any> => {
    const ACCESS_TOKEN = localStorage.getItem(ACCESS_TOKEN_KEY)
    const response = await fetch(`${this.apiUrl}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    return response.json();
};


}

export default AuthService;