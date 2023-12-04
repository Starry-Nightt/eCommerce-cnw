// services/userService.ts
import axios from "axios";

export const getCartByUserId = async (userId: string) => {
  try {
    // const response = await axios.get(`/api/users/${userId}`);
    // return response.data;
    return [
      {
        id: 1,
        name: "Đắc nhân tâm",
        image: "https://thietkekhainguyen.com/wp-content/uploads/2018/10/sach-anh-dep3.jpg",
        quantity: 2,
        price: 900,
        color: "256GB, Navy Blue",
      },
      {
        id: 2,
        name: "Khéo ăn nói",
        image: "https://thietkekhainguyen.com/wp-content/uploads/2018/10/sach-anh-dep3.jpg",
        quantity: 2,
        price: 900,
        color: "256GB, Navy Blue",
      },
      {
        id: 3,
        name: "Trí tuệ Do Thái",
        image: "https://thietkekhainguyen.com/wp-content/uploads/2018/10/sach-anh-dep3.jpg",
        quantity: 1,
        price: 1199,
        color: "Onyx Black",
      },
      {
        id: 4,
        name: "Trí tuệ Do Thái",
        image: "https://thietkekhainguyen.com/wp-content/uploads/2018/10/sach-anh-dep3.jpg",
        quantity: 1,
        price: 1799,
        color: "1TB, Graphite",
      },
    ];
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
