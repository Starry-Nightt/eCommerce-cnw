import { Role } from "@/constants/app.const";

export class User {
  id: string;
  name: string;
  email: string;
  address?: string;
  avatar?: string;
  isAdmin?: boolean;
}
