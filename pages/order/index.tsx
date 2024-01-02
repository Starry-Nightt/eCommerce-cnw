// Import necessary components
import React, { useState, useEffect } from "react";

import {
  Button,
  Card,
  Select,
  Table,
  Popconfirm,
  message,
  Modal,
  DatePicker,
  Input,
  Tag,
} from "antd";
import useAuth from "@/hooks/use-auth";
import Head from "next/head";
import { useRouter } from "next/router";
import BillService from "@/services/bill.service";
import { BillInfo, BillStatus } from "@/models/bill.model";
import {
  convertDateFormat2,
  getLabelBillStatus,
  vndCurrencyFormat,
} from "@/utils/helper";
import { Moment } from "moment";
import _default from "antd/es/theme";

const { Option } = Select;
const { RangePicker } = DatePicker;

const OrderPage: React.FC = () => {
  const [originalItems, setOriginalItems] = useState<BillInfo[]>([]);
  const [items, setItems] = useState<BillInfo[]>([]);
  const [statusFilter, setStatusFilter] = useState<BillStatus | string>('all');

  const [visibleModals, setVisibleModals] = useState<{
    [key: string]: boolean;
  }>({});
  const { loggedIn, user } = useAuth();
  const router = useRouter();

  const fetchOrders = async () => {
    try {
      const orders = await BillService.getBillByUserId(user.id);
      setItems(orders);
      setOriginalItems(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openOrderDetailModal = (record) => {
    setVisibleModals((prev) => ({ ...prev, [record._id]: true }));
  };

  const handleModalSubmit = (orderId: string) => {
    setVisibleModals((prev) => ({ ...prev, [orderId]: false }));
  };

  const handleModalCancel = (orderId: string) => {
    setVisibleModals((prev) => ({ ...prev, [orderId]: false }));
  };


  return (
    <div>
      <Head>
        <title>Đơn hàng</title>
      </Head>
      <Card
        title="Đơn hàng của bạn"
        extra={
          <Button
            type="primary"
            size="small"
            onClick={() => {
              router.push("/book");
            }}
          >
            ← Trở về
          </Button>
        }
      >
        <div style={{ marginBottom: 16 }}>
          <Select
            style={{ width: 200, marginRight: 8 }}
            placeholder="Chọn trạng thái đơn hàng"
            onChange={(value) => setStatusFilter(value)}
            value={statusFilter}
          >
            <Option value={"all"}>Tất cả</Option>
            <Option value={BillStatus.CHECK}>Đã xử lý</Option>
            <Option value={BillStatus.UNCHECK}>Chưa xử lý</Option>
            <Option value={BillStatus.SENDING}>Đang vận chuyển</Option>
          </Select>
        </div>
        <Table
          dataSource={items}
          columns={[
            {
              title: "STT",
              dataIndex: "id",
              key: "id",
              render: (text, record, index) => index + 1,
            },
            {
              title: "Mã đơn",
              dataIndex: "user_id",
              key: "order_id",
              render: (text, record) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  {record._id}
                </div>
              ),
            },
            {
              title: "Tổng giá (VNĐ)",
              dataIndex: "total",
              key: "total",
              render: (price) => vndCurrencyFormat(price * 1000),
            },
            {
              title: "Thời gian tạo",
              dataIndex: "date", // Updated field name
              key: "date",
              render: (text, record) => (
                <span>{new Date(record.date).toLocaleString()}</span>
              ),
            },
            {
              title: "Trạng thái",
              key: "status",
              render: (issend: BillStatus) => {
                const color =
                  issend === BillStatus.SENDING
                    ? "geekblue"
                    : issend === BillStatus.CHECK
                    ? "green"
                    : "crimson";
                return <Tag color={color}>{getLabelBillStatus(issend)}</Tag>;
              },
            },
            {
              title: "Hành động",
              key: "viewDetail",
              render: (record) => (
                <div>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => openOrderDetailModal(record)}
                  >
                    Xem chi tiết
                  </Button>
                  <Modal
                    width={1000}
                    title="Thông tin đơn hàng"
                    open={visibleModals[record._id]}
                    onOk={() => handleModalSubmit(record._id)}
                    onCancel={() => handleModalCancel(record._id)}
                  >
                    <p>
                      <b>Mã đơn: </b> {record._id}
                    </p>
                    <p>
                      <b>Họ và tên: </b> {record.name}
                    </p>
                    <p>
                      <b>Email: </b>
                      {record.email}
                    </p>
                    <p>
                      <b>Số điện thoại: </b>
                      {record.phone}
                    </p>
                    <p>
                      <b>Địa chỉ: </b>
                      {record.address}
                    </p>
                    <p>
                      <b>Trạng thái đơn hàng: </b>
                      {getLabelBillStatus(record.issend)}
                    </p>
                    <br />
                    <Table
                      dataSource={record.products}
                      className="mb-6"
                      pagination={false}
                      columns={[
                        {
                          title: "Số thứ tự",
                          dataIndex: "index",
                          key: "index",
                          render: (text, record, index) => index + 1,
                        },
                        {
                          title: "Sản phẩm",
                          render: ({ img, name }) => (
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <img
                                src={img}
                                alt={name}
                                style={{
                                  marginRight: 8,
                                  width: 50,
                                  height: 50,
                                }}
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src =
                                    "https://demofree.sirv.com/nope-not-here.jpg";
                                }}
                              />
                              {name}
                            </div>
                          ),
                        },
                        {
                          title: "Số lượng",
                          dataIndex: "count",
                          key: "count",
                        },
                        {
                          title: "Tổng giá",
                          dataIndex: "price",
                          key: "price",
                          render: (price) => vndCurrencyFormat(price),
                        },
                      ]}
                    />
                    <div className="flex justify-between mb-3">
                      <span>Tổng giá đơn:</span>
                      <b>{vndCurrencyFormat(record.total)}</b>
                    </div>
                    <div className="flex justify-between mb-5">
                      <span>Phương thức thanh toán: </span>
                      <b>{"Giao hàng tại nhà"}</b>
                    </div>
                  </Modal>
                </div>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default OrderPage;
