import React, { useState, useEffect } from "react";
import { getCartByUserId } from "@/services/cart.services";
import { getUserById } from "@/services/user.services";
import {
  Button,
  Form,
  Input,
  Card,
  Select,
  Table,
  Popconfirm,
  message,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Head from "next/head";
import { useRouter } from "next/router";
const { Option } = Select;

interface Item {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  color: string;
}

interface User {
  id: number;
  name: string;
  age: number;
  address: string;
  phone: string;
  email: string;
  avatar: string;
}

const ShoppingCart: React.FC = ({ userId }: any) => {
  const [items, setItems] = useState<Item[]>([]);
  const [user, setUser] = useState<User>();
  const [form] = Form.useForm();
  const router = useRouter()

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const cartData = await getCartByUserId(userId);
        setItems(cartData);
      } catch (error) {
        // Handle errors if needed
      }
    };
    fetchCarts();
  }, [userId]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById("656c7f06657dab52d0053101");
        setUser(userData);

        // Use the userData to set the form fields
        form.setFieldsValue({
          id: userData.id,
          name: userData.name,
          phone: userData.phone,
          address: userData.address,
          email: userData.email,
        });
      } catch (error) {
        // Handle errors if needed
      }
    };

    fetchUser();
  }, [userId, form]);

  const [cardDetails, setCardDetails] = useState({
    cardType: "Thanh toán lúc giao hàng",
    cardholderName: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
  });

  const handleContinueShopping = () => {
    // Implement logic for continuing shopping
  };

  const handleCheckout = () => {
    // Implement logic for checkout
    router.push("/buy-result")
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedCardDetails = {
      cardType: formData.get("cardType") as string,
      cardholderName: formData.get("cardholderName") as string,
      cardNumber: formData.get("cardNumber") as string,
      expiration: formData.get("expiration") as string,
      cvv: formData.get("cvv") as string,
    };
    setCardDetails(updatedCardDetails);
  };

  const handleQuantityChange = (id: number, value: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: value } : item
      )
    );
  };

  const handleDelete = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    message.success("Sản phẩm đã được xóa.");
  };

  return (
    <div>
      <Head>
        <title>Xem giỏ hàng</title>
      </Head>
      <Card
        title="Giỏ hàng"
        extra={
          <Button type="primary" size="small" onClick={() => router.push("/book")}>
            ← Trở về
          </Button>
        }
      >
        <Table
          dataSource={items}
          columns={[
            {
              title: "Sản phẩm",
              render: (row) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={row.image}
                    alt={row.name}
                    style={{ marginRight: 8, width: 50, height: 50 }}
                  />
                  {row.name}
                </div>
              ),
            },
            {
              title: "Số lượng",
              dataIndex: "quantity",
              render: (text, record) => (
                <Input
                  type="number"
                  value={text}
                  onChange={(e) =>
                    handleQuantityChange(record.id, +e.target.value)
                  }
                />
              ),
            },
            {
              title: "Giá",
              dataIndex: "price",
            },
            {
              title: "Tổng",
              render: (row) => row.quantity * row.price,
            },
            {
              title: "Xóa",
              render: (row) => (
                <Popconfirm
                  title="Bạn có chắc muốn xóa sản phẩm này?"
                  onConfirm={() => handleDelete(row.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link" danger icon={<DeleteOutlined />} />
                </Popconfirm>
              ),
            },
          ]}
        />

        <Form
          form={form}
          className="card-details-form"
          name="card-details-form"
          // onSubmit={handleFormSubmit}
        >
          <h2>Thông tin thanh toán</h2>
          <Form.Item label="Loại thanh toán" name="cardType">
            <Select>
              <Option value="1">Thanh toán lúc giao hàng</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Tên" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Địa chỉ" name="address">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" onClick={handleCheckout}>
            Tạo đơn hàng
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ShoppingCart;
