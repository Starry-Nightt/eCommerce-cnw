// services/cartService.ts
import axios from "axios";

interface Product {
  id_category: string;
  name: string;
  price: number;
  release_date: string;
  img: string;
  describe: string;
  id_nsx: string;
  count: number;
  _id: string;
}

interface Order {
  _id: string;
  id_user: string;
  date: string;
  products: Product[];
  __v: number;
}

interface DeleteCartItemRequest {
  id_user: string;
  id_product: string;
}

interface UpdateCartItemRequest {
  id_user: string;
  id_product: string;
  count: number;
}

const baseUrl = 'https://cnweb-backend.onrender.com/cart';

async function getCartByUserId(userId: string): Promise<Order> {
  const apiUrl = `${baseUrl}/${userId}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      return data.data as Order;
    } else {
      throw new Error(`Error: ${data.message}`);
    }
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

export const deleteCartItem = async (requestData: DeleteCartItemRequest): Promise<void> => {
  try {
    const response = await axios.post(`${baseUrl}/delete`, requestData);

    if (response.status === 200) {
      console.log('Product deleted successfully.');
    } else {
      console.error('Failed to delete product from the cart.');
    }
  } catch (error) {
    console.error('Error deleting product from the cart:', error);
    throw error;
  }
};

export const updateCart = async (requestData: UpdateCartItemRequest): Promise<void> => {
  try {
    const response = await axios.post(`${baseUrl}/update`, requestData);

    if (response.status === 200) {
      console.log('Cart updated successfully.');
    } else {
      console.error('Failed to update cart.');
    }
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};

export { getCartByUserId };
