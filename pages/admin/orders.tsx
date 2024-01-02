// Import necessary components
import React, { useState, useEffect } from "react";
import {
  getAllOrders,
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
import { DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;

interface OrderItem {
  _id: string;
  user_id: string;
  issend: "99" | "1" | "0";
  total: number;
  date: string; // Updated field name and type
  phone: string;
  name: string;
  products: ProductItem[];
}

interface ProductItem {
  id_category: string;
  name: string;
  count: number;
  price: number;
  // ... (other properties)
}

const OrderManagement: React.FC = () => {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [statusOptions, setStatusOptions] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );
  const [dateRangeFilter, setDateRangeFilter] = useState<
    [string, string] | undefined
  >(undefined);
  const [searchUser, setSearchUser] = useState<string | undefined>(undefined);

  const fetchOrders = async () => {
    try {
      const orders = await getAllOrders();
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

  const handleModalSubmit = () => setIsModalVisible(false);

  const handleModalCancel = () => setIsModalVisible(false);

  const handleDelete = async (id: string) => {
    try {
      await deleteOrder(id);

      const updatedOrders = await getAllOrders();
      setItems(updatedOrders);

      message.success("Đơn hàng đã được xóa thành công.");
    } catch (error) {
      console.error("Error deleting order:", error);
      message.error("Đã xảy ra lỗi khi xóa đơn hàng.");
    }
  };

  const openOrderDetailModal = () => setIsModalVisible(true);

  const handleStatusChange = async (value: string, record: OrderItem) => {
    try {
      await updateIssendOrder({ id: record._id, issend: value });

      const updatedOrders = await getAllOrders();
      setItems(updatedOrders);

      message.success("Trạng thái đơn hàng đã được cập nhật.");
    } catch (error) {
      console.error("Error updating order status:", error);
      message.error("Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng.");
    }
  };

  const filteredItems = items.filter(
    (item) =>
      (!statusFilter ||
        statusFilter === "Tất cả" ||
        item.issend === statusFilter) &&
      (!dateRangeFilter ||
        (item.date >= dateRangeFilter[0] && item.date <= dateRangeFilter[1])) &&
      (!searchUser ||
        (item.phone &&
          item.phone.toLowerCase().includes(searchUser.toLowerCase())))
  );

  return (
    <div>
      <Card
        title="Quản lý đơn hàng"
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
          <Search
            placeholder="Tìm theo số điện thoại"
            onSearch={(value) => setSearchUser(value)}
            style={{ width: 200 }}
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
              title: "Điện thoại",
              dataIndex: "phone",
              key: "phone",
            },
            {
              title: "Giá",
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
                    onClick={openOrderDetailModal}
                  >
                    Xem
                  </Button>
                  <Modal
                    title="Thông tin đơn hàng"
                    open={isModalVisible}
                    onOk={handleModalSubmit}
                    onCancel={handleModalCancel}
                  >
                    <p>Mã đơn: {record._id}</p>
                    <p>Tên người dùng: {record.name}</p>
                    <p>Email người dùng: {record.email}</p>
                    <p>Số điện thoại người dùng: {record.phone}</p>
                    <p>Địa chỉ: {record.address}</p>
                    <p>Tổng giá đơn: {record.total}</p>
                    <p>
                      Trạng thái:{" "}
                      <Select
                        style={{ width: 200 }}
                        value={record.issend}
                        onChange={(value) => handleStatusChange(value, record)}
                      >
                        <Option value="99">Đang chờ</Option>
                        <Option value="1">Đang xử lý</Option>
                        <Option value="0">Đã xử lý</Option>
                      </Select>
                    </p>

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
                          dataIndex: "name",
                          key: "name",
                        },
                        {
                          title: "Số lượng",
                          dataIndex: "count",
                          key: "count",
                        },
                        {
                          title: "Giá",
                          dataIndex: "price",
                          key: "price",
                        },
                      ]}
                    />
                  </Modal>
                </div>
              ),
            },
            {
              title: "Trạng thái",
              key: "status",
              render: (record) => (
                <Select
                  style={{ width: 200 }}
                  value={record.issend}
                  onChange={(value) => handleStatusChange(value, record)}
                >
                  <Option value="99">Đang chờ</Option>
                  <Option value="1">Đang xử lý</Option>
                  <Option value="0">Đã xử lý</Option>
                </Select>
              ),
            },
            {
              title: "Xóa",
              key: "delete",
              render: (record) => (
                <Popconfirm
                  title="Bạn có chắc muốn xóa sản phẩm này?"
                  onConfirm={() => handleDelete(record._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link" danger icon={<DeleteOutlined />} />
                </Popconfirm>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default OrderManagement;
