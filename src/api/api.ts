// src/api/api.ts
import axios from "axios";
import { storage } from "../storage";
const API_BASE_URL = "http://localhost:8442";

export const loginUser = async (userId: string, username:string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/user/login`, { userId, username, password });
    const data = response.data as { token: string };
    storage.set("token", data.token, 60); 
    storage.set("userId", userId, 60);
    storage.set("username", username, 60);
    storage.set("password", password, 60);
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
