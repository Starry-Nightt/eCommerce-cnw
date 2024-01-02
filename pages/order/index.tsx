// Import necessary components
import React, { useState, useEffect } from "react";
import {
  getOrdersByUserId,
  updateIssendOrder,
  deleteOrder,
} from "@/services/order.services";
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
} from "antd";
import useAuth from "@/hooks/use-auth";
import Head from "next/head";

const { Option } = Select;
const { RangePicker } = DatePicker;

interface OrderItem {
  _id: string;
  user_id: string;
  issend: "99" | "1" | "0";
  total: number;
  date: string;
  phone: string;
  name: string;
  products: ProductItem[];
}

interface ProductItem {
  id_category: string;
  name: string;
  count: number;
  price: number;
  img: string;
  // ... (other properties)
}

const OrderPage: React.FC = () => {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [statusOptions, setStatusOptions] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );
  const [dateRangeFilter, setDateRangeFilter] = useState<
    [string, string] | undefined
  >(undefined);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [visibleModals, setVisibleModals] = useState<{
    [key: string]: boolean;
  }>({});
  const { loggedIn, user } = useAuth();

  const fetchOrders = async () => {
    console.log(user);
    try {
      const orders = await getOrdersByUserId(
        user.id || "656c7f06657dab52d0053101"
      );
      setItems(orders);

      const uniqueStatusOptions = orders.map((o) => o.issend);
      setStatusOptions(Array.from(new Set(uniqueStatusOptions)));
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openOrderDetailModal = (record) => {
    setSelectedOrder(record);
    setVisibleModals((prev) => ({ ...prev, [record._id]: true }));
  };

  const handleModalSubmit = (orderId: string) => {
    setVisibleModals((prev) => ({ ...prev, [orderId]: false }));
  };

  const handleModalCancel = (orderId: string) => {
    setVisibleModals((prev) => ({ ...prev, [orderId]: false }));
  };

  function getStatusName(issend) {
    if (issend == "0") return "Đã xử lý";
    else if (issend == "1") return "Đang xử lý";
    else if (issend == "99") return "Đang chờ";
  }

  const filteredItems = items.filter(
    (item) =>
      (!statusFilter ||
        statusFilter === "Tất cả" ||
        item.issend === statusFilter) &&
      (!dateRangeFilter ||
        (item.date >= dateRangeFilter[0] && item.date <= dateRangeFilter[1]))
  );

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
              /* Handle continue shopping */
            }}
          >
            ← Trở về
          </Button>
        }
      >
        <div style={{ marginBottom: 16 }}>
          <Select
            style={{ width: 200, marginRight: 8 }}
            placeholder="Chọn trạng thái"
            onChange={(value) => setStatusFilter(value)}
          >
            <Option value="Tất cả">Tất cả</Option>

            {statusOptions.map((option) => (
              <Option key={option} value={option}>
                {option === "99"
                  ? "Đang chờ"
                  : option === "1"
                  ? "Đang xử lý"
                  : "Đã xử lý"}
              </Option>
            ))}
          </Select>
          <RangePicker
            style={{ marginRight: 8 }}
            onChange={(dates) =>
              setDateRangeFilter(
                dates ? [dates[0].format(), dates[1].format()] : undefined
              )
            }
          />
        </div>
        <Table
          dataSource={filteredItems}
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
              render: (record) => <span>{getStatusName(record.issend)}</span>,
            },
            {
              title: "Xem chi tiết",
              key: "viewDetail",
              render: (record) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => openOrderDetailModal(record)}
                  >
                    Xem
                  </Button>
                  <Modal
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
                      {getStatusName(record.issend)}
                    </p>
                    <br />
                    <Table
                      dataSource={record.products}
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
                        },
                      ]}
                    />
                    <p>
                      <b>Tổng giá đơn: </b>
                      {record.total}
                    </p>
                    <p>
                      <b>Phương thức thanh toán: </b>
                      {"giao hàng tại nhà"}
                    </p>
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
