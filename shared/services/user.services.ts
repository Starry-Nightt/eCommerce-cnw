// services/userService.ts
import axios from "axios";

export const getUserById = async (userId: string) => {
  try {
    const response = await axios.get(
      `https://cnweb-backend.onrender.com/users/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const updateUser = async (
  userId: string,
  updatedUser: {
    name?: string;
    age?: number;
    email?: string;
    phone?: string;
    address?: string;
    avatar?: string;
  }
) => {
  try {
    const response = await axios.put(
      `https://cnweb-backend.onrender.com/users/${userId}`,
      updatedUser,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
