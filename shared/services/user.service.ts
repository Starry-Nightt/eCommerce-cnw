import { User } from "@/models/user.model";
import { http } from "./http.service";
import { LoginDetail, RegisterDetail } from "@/models/auth.model";

class AppUserService {
  getAllUsers = (): Promise<User[]> => {
    return http.get("/users");
  };

  getUser = (id: string): Promise<User> => {
    return http.get(`/users/${id}`);
  };

  register = (detail: RegisterDetail): Promise<any> => {
    return http.post(`/auth/register`, detail);
  };

  login = (detail: LoginDetail): Promise<any> => {
    return http.post(`auth/login`, detail);
  };

  updateUser = (
    id: string,
    detail: {
      name?: string;
      password?: string;
      phone?: string;
      email?: string;
    }
  ): Promise<any> => {
    return http.put(`/users/${id}`, detail);
  };

  deleteUser = (id: string): Promise<any> => {
    return http.delete(`users/${id}`);
  };
}

const UserService = new AppUserService();

export default UserService;
