import { CartItem } from "./cart.model";
export interface Bill {
  _id: string;
  id_user: string;
  total: number;
  address: string;
  phone: string;
  name: string;
  token: string;
  issend: BillStatus;
  date: string;
}

export enum BillStatus {
  CHECK = "1",
  SENDING = "0",
  UNCHECK = "99",
}

export interface BillInfo {
  _id: string;
  user_id: string;
  issend: "99" | "1" | "0";
  total: number;
  date: string;
  phone: string;
  name: string;
  products: CartItem[];
}
