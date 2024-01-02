export const billStatistic = {
  day: 4,
  month: 13,
  year: 34,
};

export const bilChart = [10, 15, 12, 18, 25, 20, 22];

export const billRate = {
  value:
    Math.round(
      (100 * bilChart[bilChart.length - 1]) / bilChart[bilChart.length - 2]
    ) / 100,
};

export const revenueStatistic = {
  day: 230000,
  month: 4002000,
  year: 5200000,
};

export const revenueChart = [50000, 75000, 60000, 90000, 120000, 80000, 65000];

export const revenueRate = {
  value:
    Math.round(
      (revenueChart[revenueChart.length - 1] * 100) /
        revenueChart[revenueChart.length - 2]
    ) / 100,
};
