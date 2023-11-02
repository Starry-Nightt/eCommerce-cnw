import { Role } from "@/constants/app.const";

export class User {
  id: string;
  username: string;
  email: string;
  address?: string;
  avatar?: string;
  role: Role;
}
