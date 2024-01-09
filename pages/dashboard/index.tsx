import BarChart from "@/components/bar-chart";
import useLogger from "@/hooks/use-logger";
import LayoutAdmin from "@/layouts/admin/layout-admin";
import { Bill } from "@/models/bill.model";
import { BookStatistic } from "@/models/statistic.model";
import BillService from "@/services/bill.service";
import StatisticService from "@/services/statistic.service";
import { getCurrentYear, getRecentDates, isDateInCurrentMonth, isDateInCurrentYear, isDateToday } from "@/utils/helper";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DollarOutlined,
  AccountBookOutlined,
} from "@ant-design/icons";
import { Row, Col, Card, Statistic } from "antd";
import { GetServerSideProps, GetStaticProps } from "next";

interface Props {
  data: BookStatistic;
  bills: Bill[]
}

const Index = ({ data, bills }: Props) => {
  if (!bills) return <>
  
  </> 
  const billsInDay = bills?.filter(it => isDateToday(it.date))
  const billsInMonth = bills?.filter(it => isDateInCurrentMonth(it.date))
  const billsInYear = bills?.filter(it => isDateInCurrentYear(it.date))
  const getRevenue = (bills: Bill[]) => {
    return Math.floor(bills.reduce((prev, cur) => prev + cur.total, 0) *1000)/1000
  }

  return (
    <Row gutter={[24, 24]}>
      <Col xs={12} sm={12} lg={12} xl={6}>
        <Card
          bordered={true}
          className="shadow-sm duration-300 hover:shadow-md"
        >
          <Statistic
            title={<span className="font-semibold">Doanh thu ngày</span>}
            value={getRevenue(billsInDay)}
            suffix="VND"
            valueStyle={{}}
          />
        </Card>
      </Col>
      <Col xs={12} sm={12} lg={12} xl={6}>
        <Card
          bordered={true}
          className="shadow-sm duration-300 hover:shadow-md"
        >
          <Statistic
            title={<span className="font-semibold">Doanh thu tháng</span>}
            value={getRevenue(billsInMonth)}
            valueStyle={{}}
            suffix="VND"
          />
        </Card>
      </Col>
      <Col xs={12} sm={12} lg={12} xl={6}>
        <Card
          bordered={true}
          className="shadow-sm duration-300 hover:shadow-md"
        >
          <Statistic
            title={<span className="font-semibold">Doanh thu năm</span>}
            value={getRevenue(billsInYear)}
            valueStyle={{}}
            suffix="VND"
          />
        </Card>
      </Col>
      <Col xs={12} sm={12} lg={12} xl={6} className="h-full">
        <Card
          bordered={true}
          className="shadow-sm duration-300 hover:shadow-md"
        >
          <Statistic
            title="Doanh thu tăng trưởng"
            value={
              Math.floor(
                (data.revenueRate.value >= 1
                  ? data.revenueRate.value - 1
                  : 1 - data.revenueRate.value) * 10000
              ) / 100
            }
            valueStyle={
              data.revenueRate.value >= 1
                ? { color: "#3f8600" }
                : { color: "#cf1322" }
            }
            prefix={
              data.revenueRate.value >= 1 ? (
                <ArrowUpOutlined />
              ) : (
                <ArrowDownOutlined />
              )
            }
            suffix="%"
          />
        </Card>
      </Col>
      <Col xs={12} sm={12} lg={12} xl={6}>
        <Card
          bordered={true}
          className="shadow-md duration-300 hover:shadow-lg"
        >
          <Statistic
            title={<span className="font-semibold">Đơn hàng trong ngày</span>}
            value={billsInDay.length}
            prefix={
              <span className="mr-2">
                <AccountBookOutlined />
              </span>
            }
            valueStyle={{}}
          />
        </Card>
      </Col>
      <Col xs={12} sm={12} lg={12} xl={6}>
        <Card
          bordered={true}
          className="shadow-md duration-300 hover:shadow-lg"
        >
          <Statistic
            title={<span className="font-semibold">Đơn hàng trong tháng</span>}
            value={billsInMonth.length}
            prefix={
              <span className="mr-2">
                <AccountBookOutlined />
              </span>
            }
          />
        </Card>
      </Col>
      <Col xs={12} sm={12} lg={12} xl={6}>
        <Card
          bordered={true}
          className="shadow-md duration-300 hover:shadow-lg"
        >
          <Statistic
            title={<span className="font-semibold">Đơn hàng trong năm</span>}
            value={billsInYear.length}
            prefix={
              <span className="mr-2">
                <AccountBookOutlined />
              </span>
            }
          />
        </Card>
      </Col>
      <Col xs={12} sm={12} lg={12} xl={6} className="h-full">
        <Card
          bordered={true}
          className="shadow-md duration-300 hover:shadow-lg"
        >
          <Statistic
            title="Tỉ lệ tăng trưởng đơn hàng"
            value={
              Math.floor(
                (data.billRate.value >= 1
                  ? data.billRate.value - 1
                  : 1 - data.billRate.value) * 10000
              ) / 100
            }
            valueStyle={
              data.billRate.value >= 1
                ? { color: "#3f8600" }
                : { color: "#cf1322" }
            }
            prefix={
              data.billRate.value >= 0 ? (
                <ArrowUpOutlined />
              ) : (
                <ArrowDownOutlined />
              )
            }
            suffix="%"
          />
        </Card>
      </Col>
      <Col lg={24} xl={12}>
        <BarChart
          data={data.revenueChart}
          labels={getRecentDates()}
          title="Thống kê doanh thu 7 ngày gần nhất"
          xAxisName={`Ngày`}
          yAxisName="Doanh thu"
        />
      </Col>
      <Col lg={24} xl={12}>
        <BarChart
          data={data.bilChart}
          labels={getRecentDates()}
          title="Thống kê hóa đơn 7 ngày gần nhất"
          xAxisName={`Ngày`}
          yAxisName="Số đơn hàng"
        />
      </Col>
    </Row>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const data = await StatisticService.getGeneralStatistic();
  const bills = await BillService.getAllBill();

  return {
    props: { data, bills },
    revalidate: 180,
  };
};

Index.getLayout = function PageLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default Index;
