import { http } from "./http.service";

class AppBillService {
  getAllBill = (): Promise<any> => {
    return http.get("/bill/allbill").then((res) => res.data);
  };
}

const BillService = new AppBillService();

export default BillService;
