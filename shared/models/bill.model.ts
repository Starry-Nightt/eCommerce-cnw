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
  UNCHECK = "0",
  SENDING = "99",
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
