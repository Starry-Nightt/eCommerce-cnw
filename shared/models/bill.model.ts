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
