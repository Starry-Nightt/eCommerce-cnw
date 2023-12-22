// pages/[userId].tsx
import React, { useState, useEffect } from "react";
import { getUserById } from "@/services/userServices";
import FormRules from "@/utils/form-rules";
import { Button, Divider, Form, Input } from "antd";
import { Typography } from "antd";
import { notification } from "antd";
import useAuth from "@/hooks/use-auth";
import LayoutAdmin from "@/layouts/admin/layout-admin";

const { Title } = Typography;

const initialFormValues = (user, isEditing) => ({
  name: user ? user.name : "",
  age: user ? user.age : "",
  address: user ? user.address : "",
  phone: user ? user.phone : "",
  email: user ? user.email : "",
});

function AdminProfile({ userId }: any) {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues(null, false));
  const [buttonType, setButtonType] = useState<"button" | "submit">("button");
  const { loggedIn } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(userId);
        setUser(userData);
        setFormValues(initialFormValues(userData, isEditing));
        setButtonType(!isEditing ? "submit" : "button");
      } catch (error) {
        // Handle errors if needed
      }
    };
    fetchUser();
  }, [userId, isEditing]);

  const onFinish = async (values) => {
    try {
      // Call your API to update user data here
      // For example, await updateUserData(userId, values);
      if (!isEditing) {
        setUser({ ...user, ...values });
        notification.success({
          message: "Thông báo",
          description: "Cập nhật thông tin thành công!",
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      notification.error({
        message: "Lỗi",
        description: "Đã xảy ra lỗi khi cập nhật thông tin.",
      });
    }
  };

  const handleUpdate = () => {
    setIsEditing((prevEditing) => !prevEditing);
    setFormValues(initialFormValues(user, !isEditing));
    setButtonType(isEditing ? "button" : "submit");
  };

  return (
    <div className="split-screen-container">
      {user ? (
        <>
          <div className="user-setting">
            <ul>
              <li>Thông tin cá nhân</li>
              <li>Đổi mật khẩu</li>
              <li>Cài đặt</li>
              <li>Thoát</li>
            </ul>
          </div>
          <div className="form-user-avatar">
            <Form layout="horizontal" initialValues={formValues}>
              <img
                src="https://anhcuoiviet.vn/wp-content/uploads/2023/02/avatar-ngau-nam-2.jpg"
                alt="Description"
                style={{ width: "100%", borderRadius: "50%" }}
              />
              <Form.Item label="Tài khoản" name="email">
                <Input size="large" value={`${user.email}`} readOnly />
              </Form.Item>
            </Form>
          </div>

          <div className="form-user-info">
            <Form initialValues={formValues} onFinish={onFinish}>
              <Title level={3}>Thông tin cá nhân</Title>
              <Form.Item label="Tên" name="name">
                <Input
                  size="large"
                  value={`${user.name}`}
                  disabled={!isEditing}
                />
              </Form.Item>

              <Form.Item label="Tuổi" name="age">
                <Input
                  size="large"
                  value={`${user.age}`}
                  disabled={!isEditing}
                />
              </Form.Item>
              <Form.Item label="Địa chỉ" name="address">
                <Input
                  size="large"
                  value="Nội dung chỉ đọc"
                  disabled={!isEditing}
                />
              </Form.Item>

              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={isEditing ? FormRules.phone : undefined}
                // rules={FormRules.phone}
              >
                <Input
                  size="large"
                  value={`${user.phone}`}
                  disabled={!isEditing}
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={isEditing ? FormRules.email : undefined}
                // rules={FormRules.email}
              >
                <Input
                  size="large"
                  value={`${user.email}`}
                  disabled={!isEditing}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType={buttonType}
                  onClick={handleUpdate}
                >
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

AdminProfile.getLayout = function PageLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default AdminProfile;
