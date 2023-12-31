import {
  bilChart,
  billStatistic,
  revenueChart,
  revenueStatistic,
  billRate,
  revenueRate,
} from "shared/data/statistic";

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      bilChart,
      billStatistic,
      revenueChart,
      revenueStatistic,
      billRate,
      revenueRate,
    });
  } else if (req.method === "POST") {
    const { value } = req.body;
    billStatistic.day++;
    billStatistic.month++;
    billStatistic.year++;
    bilChart[bilChart.length - 1]++;
    billRate.value =
      Math.round(
        (100 * bilChart[bilChart.length - 1]) / bilChart[bilChart.length - 2]
      ) / 100;

    revenueStatistic.day += value;
    revenueStatistic.month += value;
    revenueStatistic.year += value;
    revenueChart[revenueChart.length - 1] += value;
    revenueRate.value =
      Math.round(
        (revenueChart[revenueChart.length - 1] * 100) /
          revenueChart[revenueChart.length - 2]
      ) / 100;
    return res.status(201).json({ message: "ok" });
  }
}
