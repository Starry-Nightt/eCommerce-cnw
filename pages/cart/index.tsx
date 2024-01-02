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
import {
  getCartByUserId,
  deleteCartItem,
  updateCart,
} from "@/services/cart.services";
import { createOrder } from "@/services/order.services";
import UserService from "@/services/user.service";

const { Option } = Select;

interface Props {
  userId: string;
}

interface Product {
  id_category: string;
  name: string;
  price: number;
  release_date: string;
  img: string;
  describe: string;
  id_nsx: string;
  count: number;
  _id: string;
}

interface Order {
  _id: string;
  id_user: string;
  date: string;
  products: Product[];
  __v: number;
}

const ShoppingCart: React.FC<Props> = ({ userId }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrderProducts, setSelectedOrderProducts] = useState<Product[]>(
    []
  );

  const fetchCarts = useCallback(async () => {
    try {
      const cartData = await getCartByUserId("656c7f06657dab52d0053101");
      setOrder(cartData);
    } catch (error) {
      // Handle errors if needed
    }
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const userData = await UserService.getUser("656c7f06657dab52d0053101");;
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
  }, [userId, fetchCarts, fetchUser]);

  const handleContinueShopping = () => {
    // Implement logic for continuing shopping
  };

  const handleCheckout = () => {
    if (selectedProducts.length === 0) {
      message.error("Vui lòng chọn ít nhất một sản phẩm để tạo đơn hàng.");
      return;
    }

    const selectedOrderProducts = order?.products.filter(({ _id }) =>
      selectedProducts.includes(_id)
    );

    setSelectedOrderProducts(selectedOrderProducts || []);
    setIsModalVisible(true);
  };

  const handleQuantityChange = async (id: string, value: number) => {
    try {
      await updateCart({
        id_user: form.getFieldValue("id"),
        id_product: id,
        count: value,
      });

      setOrder((prevOrder) => {
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
      await deleteCartItem({ id_user: userId, id_product: id });

      setOrder((prevOrder) => {
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
      id_user: form.getFieldValue('id'),
      id_product: selectedProducts[0],
    };

    try {
      await createOrder(orderPayload);
      message.success("Đơn hàng đã được tạo thành công.");
    } catch (error) {
      console.error("Error creating order:", error);
      message.error("Tạo đơn hàng thất bại. Vui lòng thử lại.");
    }

    // Close the modal
    setIsModalVisible(false);
  };

  return (
    <div>
      <Card
        title="Giỏ hàng"
        extra={
          <Button type="primary" size="small" onClick={handleContinueShopping}>
            ← Trở về
          </Button>
        }
      >
        <Table
          dataSource={order?.products}
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
                  type="number"
                  value={text}
                  onChange={(e) => handleQuantityChange(_id, +e.target.value)}
                />
              ),
            },
            {
              title: "Giá",
              dataIndex: "price",
            },
            {
              title: "Tổng",
              render: ({ count, price }) => count * price,
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

        <Form
          form={form}
          className="card-details-form"
          name="card-details-form"
        >
          <h2>Thông tin thanh toán</h2>
          <Form.Item label="Loại thanh toán" name="cardType">
            <Select>
              <Option value="1">Thanh toán lúc giao hàng</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Tên" name="name">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phone">
            <Input disabled/>
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input disabled/>
          </Form.Item>
          <Form.Item label="Địa chỉ" name="address">
            <Input disabled/>
          </Form.Item>
          <Button type="primary" onClick={handleCheckout}>
            Tạo đơn hàng
          </Button>
          <div>
            <Modal
              title="Thông tin đơn hàng"
              open={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
              onOk={handleOk}
            >
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

              <Table
                dataSource={selectedOrderProducts}
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
              <p>
                <b>Tổng đơn: </b> {calculateTotalOrder() + " VNĐ"}
              </p>
            </Modal>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ShoppingCart;
