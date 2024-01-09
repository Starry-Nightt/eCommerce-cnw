import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Form,
  Input,
  Card,
  Select,
  Table,
  Popconfirm,
  message,
  Checkbox,
  Modal,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import UserService from "@/services/user.service";
import useAuth from "@/hooks/use-auth";
import { vndCurrencyFormat } from "@/utils/helper";
import Head from "next/head";
import CartService from "@/services/cart.service";
import { CartInfo, CartItem } from "@/models/cart.model";
import { useRouter } from "next/router";
import BillService from "@/services/bill.service";

const { Option } = Select;

interface Props {
  userId: string;
}

const ShoppingCart: React.FC<Props> = () => {
  const [cartInfo, setCartInfo] = useState<CartInfo | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrderProducts, setSelectedOrderProducts] = useState<
    CartItem[]
  >([]);
  const router = useRouter();
  const { user } = useAuth();

  const fetchCarts = useCallback(async () => {
    if (user) {
      CartService.getCart(user.id).then((data) => {
        setCartInfo(data);
      });
    }
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const userData = await UserService.getUser(user.id);
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
  }, [form]);

  useEffect(() => {
    fetchCarts();
    fetchUser();
  }, [fetchCarts, fetchUser]);

  const handleContinueShopping = () => {
    router.push("/book");
  };

  const handleCheckout = () => {
    if (selectedProducts.length === 0) {
      message.error("Vui lòng chọn ít nhất một sản phẩm để tạo đơn hàng.");
      return;
    }

    const selectedOrderProducts = cartInfo?.products.filter(({ _id }) =>
      selectedProducts.includes(_id)
    );

    setSelectedOrderProducts(selectedOrderProducts || []);
    setIsModalVisible(true);
  };

  const handleQuantityChange = async (id: string, value: number) => {
    try {
      await CartService.updateCart({
        id_user: form.getFieldValue("id"),
        id_product: id,
        count: value,
      });

      setCartInfo((prevOrder) => {
        if (!prevOrder) return null;

        const updatedProducts = prevOrder.products.map((product) =>
          product._id === id ? { ...product, count: value } : product
        );

        return { ...prevOrder, products: updatedProducts };
      });

      message.success("Số lượng sản phẩm đã được cập nhật.");
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
      message.error("Cập nhật số lượng sản phẩm thất bại. Vui lòng thử lại.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      CartService.deleteItemFromCart({ id_user: user.id, id_product: id });

      setCartInfo((prevOrder) => {
        if (!prevOrder) return null;

        const updatedProducts = prevOrder.products.filter(
          (product) => product._id !== id
        );

        message.success("Sản phẩm đã được xóa.");
        return { ...prevOrder, products: updatedProducts };
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Xóa sản phẩm thất bại. Vui lòng thử lại.");
    }
  };

  const handleProductSelection = (productId: string, isSelected: boolean) => {
    setSelectedProducts((prevSelected) =>
      isSelected
        ? [...prevSelected, productId]
        : prevSelected.filter((id) => id !== productId)
    );
  };

  const calculateTotalOrder = () => {
    return selectedOrderProducts.reduce(
      (total, product) => total + product.count * product.price,
      0
    );
  };

  const handleOk = async () => {
    const orderPayload = {
      id_user: form.getFieldValue("id"),
      products: selectedProducts,
    };

    try {
      await BillService.createBill(orderPayload, calculateTotalOrder());
      message.success("Đơn hàng đã được tạo thành công.");
      setCartInfo({
        ...cartInfo,
        products: cartInfo.products.filter(
          (it) => !selectedProducts.includes(it._id)
        ),
      });
      setSelectedProducts([]);
    } catch (error) {
      console.error("Error creating order:", error);
      message.error("Tạo đơn hàng thất bại. Vui lòng thử lại.");
    }

    // Close the modal
    setIsModalVisible(false);
  };

  return (
    <div>
      <Head>
        <title>Xem giỏ hàng</title>
      </Head>
      <Card
        title="Giỏ hàng"
        extra={
          <Button type="primary" size="small" onClick={handleContinueShopping}>
            ← Trở về
          </Button>
        }
      >
        <Table
          dataSource={cartInfo?.products}
          columns={[
            {
              title: "Chọn",
              render: ({ _id }) => (
                <Checkbox
                  onChange={(e) =>
                    handleProductSelection(_id, e.target.checked)
                  }
                  checked={selectedProducts.includes(_id)}
                />
              ),
            },
            {
              title: "Sản phẩm",
              render: ({ img, name }) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={img}
                    alt={name}
                    style={{ marginRight: 8, width: 50, height: 50 }}
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
              render: (text, { _id }) => (
                <Input
                  min={1}
                  type="number"
                  value={text}
                  onChange={(e) => handleQuantityChange(_id, +e.target.value)}
                />
              ),
            },
            {
              title: "Giá",
              dataIndex: "price",
              render: (price) => <>{vndCurrencyFormat(price * 1000)}</>,
            },
            {
              title: "Tổng",
              render: ({ count, price }) =>
                vndCurrencyFormat(count * price * 1000),
            },
            {
              title: "Xóa",
              render: ({ _id }) => (
                <Popconfirm
                  title="Bạn có chắc muốn xóa sản phẩm này?"
                  onConfirm={() => handleDelete(_id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link" danger icon={<DeleteOutlined />} />
                </Popconfirm>
              ),
            },
          ]}
          rowKey="_id"
        />

        <Form form={form} name="card-details-form">
          <h2 className="mb-5">Thông tin thanh toán</h2>
          <div className="font-medium mb-3">Hình thức thanh toán</div>
          <Form.Item name="cardType" className="-ml-1">
            <Select size="large">
              <Option value="1">Thanh toán lúc giao hàng</Option>
            </Select>
          </Form.Item>
          <div className="font-medium mb-3">Tên</div>
          <Form.Item name="name" className="-ml-1">
            <Input disabled size="large" />
          </Form.Item>
          <div className="font-medium mb-3">Số điện thoại</div>
          <Form.Item name="phone" className="-ml-1">
            <Input disabled size="large" />
          </Form.Item>
          <div className="font-medium mb-3">Email</div>
          <Form.Item name="email" className="-ml-1">
            <Input disabled size="large" />
          </Form.Item>
          <div className="font-medium mb-3">Địa chỉ</div>
          <Form.Item name="address" className="-ml-1">
            <Input disabled size="large" />
          </Form.Item>
          <div className="flex justify-end">
            <Button type="primary" onClick={handleCheckout} size="large">
              Tạo đơn hàng
            </Button>
          </div>
          <div>
            <Modal
              title="Thông tin đơn hàng"
              open={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
              onOk={handleOk}
              width={1000}
            >
              <div className="mb-4 leading-8">
                <p>
                  <b>Tên: </b> {form.getFieldValue("name")}
                </p>
                <p>
                  <b>Email: </b> {form.getFieldValue("email")}
                </p>
                <p>
                  <b>Số điện thoại: </b> {form.getFieldValue("phone")}
                </p>
                <p>
                  <b>Địa chỉ: </b> {form.getFieldValue("address")}
                </p>
              </div>

              <Table
                dataSource={selectedOrderProducts}
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
                    render: (price) => vndCurrencyFormat(price * 1000),
                  },
                ]}
              />
              <p className="my-6 text-lg text-right">
                Tổng đơn:
                <b> {vndCurrencyFormat(calculateTotalOrder() * 1000)} </b>
              </p>
            </Modal>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ShoppingCart;
