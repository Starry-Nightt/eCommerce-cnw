import React, { useState, useEffect } from "react";
import { getUserById, updateUser } from "@/services/user.services";
import FormRules from "@/utils/form-rules";
import { Button, Form, Input, message, Modal } from "antd";
import { Typography } from "antd";
import { notification } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface User {
  id: number;
  name: string;
  age: number;
  address: string;
  phone: string;
  email: string;
  avatar: string;
}

const UserProfile: React.FC = ({ userId }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imageLink, setImageLink] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchUser = async () => {
    try {
      const userData = await getUserById("656c7f06657dab52d0053101");
      setUser(userData);
    } catch (error) {
      console.error("Error fetching User", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const initialFormValues = (userData: User | null) => ({
    name: userData?.name || "",
    age: userData?.age || "",
    address: userData?.address || "",
    phone: userData?.phone || "",
    email: userData?.email || "",
    image: userData?.avatar || "",
  });

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const userId = "656c7f06657dab52d0053101";
      const userUpdate = {
        name: values.name,
        age: values.age,
        address: values.address,
        phone: values.phone,
        email: values.email,
        avatar: values.image,
      };

      const updateError = await updateUserAndHandleErrors(userId, userUpdate);

      if (!updateError) {
        notification.success({
          message: "Thông báo",
          description: "Cập nhật thông tin thành công!",
        });
        setIsEditing(false);
        fetchUser(); // Refresh user data after successful update
      } else {
        console.error("Error updating user data:", updateError);
        notification.error({
          message: "Lỗi",
          description: "Đã xảy ra lỗi khi cập nhật thông tin.",
        });
      }
    } catch (error) {
      console.error("Error in onFinish:", error);
    }
  };

  const handleUpdate = () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      form.submit();
    }
  };

  const updateUserAndHandleErrors = async (userId: string, userData: any) => {
    try {
      await updateUser(userId, userData);
      return null;
    } catch (error) {
      return error.message || "Có lỗi xảy ra khi cập nhật thông tin user";
    }
  };

  const handleEditIconClick = () => {
    setIsModalVisible(true);
  };

  const handleModalSubmit = async () => {
    try {
      const userId = "656c7f06657dab52d0053101";
      const updateError = await updateUserAndHandleErrors(userId, {
        avatar: imageLink,
      });
  
      if (!updateError) {
        notification.success({
          message: "Thông báo",
          description: "Cập nhật thông tin thành công!",
        });
        setIsEditing(false);
        fetchUser(); 
      } else {
        console.error("Error updating user avatar:", updateError);
        notification.error({
          message: "Lỗi",
          description: "Đã xảy ra lỗi khi cập nhật thông tin.",
        });
      }
    } catch (error) {
      console.error("Error in handleModalSubmit:", error);
    } finally {
      setIsModalVisible(false);
    }
  };
  


  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="split-screen-container">
      {user ? (
        <>
          <div className="form-user-avatar">
            <Form
              layout="horizontal"
              form={form}
              initialValues={initialFormValues(user)}
            >
              <img
                src={
                  initialFormValues(user).image ||
                  "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                }
                alt="avatar"
                style={{ width: "300px", height: "300px", borderRadius: "50%" }}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg";
                }}
              />
              <div>
                <EditOutlined
                  onClick={handleEditIconClick}
                  style={{ fontSize: "24px" }}
                />
              </div>

              <Modal
                title="Enter Image Link"
                open={isModalVisible}
                onOk={handleModalSubmit}
                onCancel={handleModalCancel}
              >
                <Input
                  value={imageLink || user?.avatar || ""}
                  onChange={(e) => setImageLink(e.target.value)}
                />
              </Modal>

              <Form.Item label="Tài khoản" name="email">
                <Input size="large" value={user.email} readOnly />
              </Form.Item>
            </Form>
          </div>

          <div className="form-user-info">
            <Form form={form} onFinish={onFinish}>
              <Title level={3}>Thông tin cá nhân</Title>
              <Form.Item label="Tên" name="name">
                <Input size="large" value={user.name} disabled={!isEditing} />
              </Form.Item>

              <Form.Item label="Tuổi" name="age">
                <Input size="large" value={user.age} disabled={!isEditing} />
              </Form.Item>
              <Form.Item label="Địa chỉ" name="address">
                <Input
                  size="large"
                  value={user.address}
                  disabled={!isEditing}
                />
              </Form.Item>

              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={isEditing ? FormRules.phone : undefined}
              >
                <Input size="large" value={user.phone} disabled={!isEditing} />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={isEditing ? FormRules.email : undefined}
              >
                <Input size="large" value={user.email} disabled={!isEditing} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="button" onClick={handleUpdate}>
                  {isEditing ? "Lưu" : "Cập nhật"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
