// services/userService.ts
import axios from "axios";

export const getUserById = async (userId: string) => {
  try {
    // const response = await axios.get(`/api/users/${userId}`);
    // return response.data;
    return {
      name: "TienDQ",
      age: 18,
      email: "test@gmail.com",
      phone: "0123456789",
      address: "Hanoi",
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const updateUser = async (userId: string, {}) => {
  try {
    // const response = await axios.get(`/api/users/${userId}`);
    // return response.data;
    return { name: "TienDQ", age: 18 };
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
