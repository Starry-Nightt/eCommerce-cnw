import { Book } from "./book.model";

export class CartInfo {
  _id: string;
  id_user: string;
  date: string;
  products: CartItem[];
  __v: number;
}

export class CartItem extends Book {
  count: number;
}
