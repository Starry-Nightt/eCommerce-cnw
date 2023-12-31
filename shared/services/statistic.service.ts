import httpTest, { http } from "./http.service";

class AppStatisticService {
  getGeneralStatistic = () => {
    return httpTest.get("/statistic");
  };

  addBill = (value: number) => {
    return httpTest.post("/statistic", { value });
  };
}

const StatisticService = new AppStatisticService();

export default StatisticService;
