// services/orderService.ts
import axios from "axios";

interface CreateOrderPayload {
  id_user: string;
  id_product: string;
}

export const createOrder = async (payload: CreateOrderPayload) => {
  try {
    const response = await axios.post(
      "https://cnweb-backend.onrender.com/bill/add",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

interface UpdateIssendPayload {
  id: string;
  issend: string;
}

export const updateIssendOrder = async (payload: UpdateIssendPayload) => {
  try {
    const response = await axios.post(
      "https://cnweb-backend.onrender.com/bill/updateissend",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error updating issend:", error);
    throw error;
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axios.get('https://cnweb-backend.onrender.com/bill/allbill');
    return response.data.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const deleteOrder = async (id: string) => {
  try {
    const response = await axios.get(`https://cnweb-backend.onrender.com/bill/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting order with id ${id}:`, error);
    throw error;
  }
};

export const getOrdersByUserId = async (userId: string) => {
  try {
    const response = await axios.get(`https://cnweb-backend.onrender.com/bill/user/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching orders for user with id ${userId}:`, error);
    throw error;
  }
};

