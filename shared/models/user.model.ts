import { Role } from "@/constants/app.const";

export class User {
  _id?: string;
  id: string;
  name: string;
  email: string;
  address?: string;
  avatar?: string;
  isAdmin?: boolean;
  phone?: string;
}
