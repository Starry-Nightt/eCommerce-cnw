import BarChart from "@/components/bar-chart";
import useLogger from "@/hooks/use-logger";
import LayoutAdmin from "@/layouts/admin/layout-admin";
import { Bill, BillStatus } from "@/models/bill.model";
import { BookStatistic } from "@/models/statistic.model";
import BillService from "@/services/bill.service";
import StatisticService from "@/services/statistic.service";
import {
  convertDateFormat,
  getCurrentYear,
  getRecentDates,
  isDateInCurrentMonth,
  isDateInCurrentYear,
  isDateToday,
  vndCurrencyFormat,
} from "@/utils/helper";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DollarOutlined,
  AccountBookOutlined,
} from "@ant-design/icons";
import { Row, Col, Card, Statistic } from "antd";
import { GetServerSideProps, GetStaticProps } from "next";

interface Props {
  bills: Bill[];
}

const recentDates = getRecentDates();

const Index = ({ bills }: Props) => {
  if (!bills) return <></>;
  const billsInDay = bills?.filter((it) => isDateToday(it.date));
  const billsInMonth = bills?.filter((it) => isDateInCurrentMonth(it.date));
  const billsInYear = bills?.filter((it) => isDateInCurrentYear(it.date));
  const getRevenue = (bills: Bill[]) => {
    return (
      Math.floor(
        bills
          .filter((it) => it.issend === BillStatus.CHECK)
          .reduce((prev, cur) => prev + cur.total, 0) * 1000
      ) / 1000
    );
  };

  const billChartData = recentDates.map((date) => {
    const billsInDate = bills?.filter(
      (bill) => convertDateFormat(bill.date) == date
    );
    return billsInDate.length;
  });

  const revenueChartData = recentDates.map((date) => {
    const billsInDate = bills?.filter(
      (bill) => convertDateFormat(bill.date) == date
    );
    return getRevenue(billsInDate);
  });

  const billRate =
    billChartData[billChartData.length - 1] /
    billChartData[billChartData.length - 2];
  const revenueRate =
    revenueChartData[revenueChartData.length - 1] /
    revenueChartData[revenueChartData.length - 2];

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
              isFinite(revenueRate)
                ? Math.floor(
                    (revenueRate >= 1 ? revenueRate - 1 : 1 - revenueRate) *
                      10000
                  ) / 100
                : `Tăng ${vndCurrencyFormat(
                    revenueChartData[revenueChartData.length - 1]
                  )}`
            }
            valueStyle={
              revenueRate >= 1 ? { color: "#3f8600" } : { color: "#cf1322" }
            }
            prefix={
              revenueRate >= 1 ? <ArrowUpOutlined /> : <ArrowDownOutlined />
            }
            suffix={isFinite(revenueRate) ? "%" : null}
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
              isFinite(billRate)
                ? Math.floor(
                    (billRate >= 1 ? billRate - 1 : 1 - billRate) * 10000
                  ) / 100
                : `Tăng thêm ${billChartData[billChartData.length - 1]}`
            }
            valueStyle={
              billRate >= 1 ? { color: "#3f8600" } : { color: "#cf1322" }
            }
            prefix={billRate >= 1 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix={isFinite(billRate) ? "%" : null}
          />
        </Card>
      </Col>
      <Col lg={24} xl={12}>
        <BarChart
          data={revenueChartData}
          labels={getRecentDates()}
          title="Thống kê doanh thu 7 ngày gần nhất"
          xAxisName={`Ngày`}
          yAxisName="Doanh thu"
        />
      </Col>
      <Col lg={24} xl={12}>
        <BarChart
          data={billChartData}
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
  const bills = await BillService.getAllBill();

  return {
    props: { bills },
    revalidate: 180,
  };
};

Index.getLayout = function PageLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default Index;
