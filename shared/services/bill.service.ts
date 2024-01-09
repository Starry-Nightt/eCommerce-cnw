import { BillInfo, BillStatus } from "@/models/bill.model";
import { http } from "./http.service";
import StatisticService from "./statistic.service";

class AppBillService {
  getAllBill = (): Promise<any> => {
    return http.get("/bill/allbill").then((res) => res.data);
  };

  createBill = (
    data: { id_user: string; products: string[] },
    value: number
  ) => {
    StatisticService.addBill(value);
    return http.post(`/bill/add`, data);
  };

  updateBill = (data: { id: string; issend: BillStatus }) => {
    return http.post(`/bill/updateissend`, data);
  };

  deleteBill = (id: string) => {
    return http.get(`/bill/delete/${id}`);
  };

  getBillByUserId = (userId: string): Promise<BillInfo[]> => {
    return http.get(`/bill/user/${userId}`).then((res) => res.data);
  };
}

const BillService = new AppBillService();

export default BillService;
