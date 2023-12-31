import React, { useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import { Card } from "antd";

interface ChartProps {
  data: number[];
  labels: string[];
  title: string;
  xAxisName: string;
  yAxisName: string;
}

const BarChart: React.FC<ChartProps> = ({
  data,
  labels,
  title,
  xAxisName,
  yAxisName,
}) => {
  useEffect(() => {
    // Set up ECharts options here
  }, [data, labels, title]);

  const getOption = () => {
    return {
      xAxis: {
        type: "category",
        data: labels,
        name: xAxisName,
      },
      yAxis: {
        type: "value",
        name: yAxisName,
      },
      series: [
        {
          data: data,
          type: "bar",
          label: {
            show: true,
            position: "top",
          },
          barWidth: "60%", // Adjust the width of bars
          itemStyle: {
            color: "#1890FF", // Change the color of bars
          },
        },
      ],
    };
  };

  return (
    <Card title={title} 
    >
      <ReactEcharts option={getOption()} />
    </Card>
  );
};

export default BarChart;
