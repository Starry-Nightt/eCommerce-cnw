import { CartInfo } from "@/models/cart.model";
import { http } from "./http.service";
class AppCartService {
  getCart = (userId: string): Promise<CartInfo> => {
    return http.get(`/cart/${userId}`).then((res) => res.data);
  };

  addToCart = (data: {
    id_user: string;
    id_product: string;
    count: number;
  }) => {
    return http.post(`/cart/addtocart`, data);
  };

  updateCart = (data: {
    id_user: string;
    id_product: string;
    count: number;
  }) => {
    return http.post(`/cart/update`, data);
  };

  deleteItemFromCart = (data: { id_user: string; id_product: string }) => {
    return http.post(`/cart/delete`, data);
  };
}

const CartService = new AppCartService();

export default CartService;
