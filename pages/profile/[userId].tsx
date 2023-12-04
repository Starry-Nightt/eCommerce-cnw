// pages/[userId].tsx
import React, { useState, useEffect } from "react";
import { getUserById, updateUser } from "@/services/user.services";
import FormRules from "@/utils/form-rules";
import { Button, Divider, Form, Input, message } from "antd";
import { Typography } from "antd";
import { notification } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Modal } from "antd";

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

const initialFormValues = (user, isEditing) => ({
  name: user ? user.name : "",
  age: user ? user.age : "",
  address: user ? user.address : "",
  phone: user ? user.phone : "",
  email: user ? user.email : "",
  image: user ? user.avatar : "",
});

const UserProfile: React.FC = ({ userId }: any) => {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues(null, false));
  const [buttonType, setButtonType] = useState<"button" | "submit">("button");
  const [form] = Form.useForm();

  const [imageLink, setImageLink] = useState<string | null>(null);
  // State to control the visibility of the modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById("656c7f06657dab52d0053101");
        setUser(userData);
        setFormValues(initialFormValues(userData, isEditing));
        setButtonType(!isEditing ? "submit" : "button");
      } catch (error) {
        console.error("Error ufetchUser", error);
      }
    };
    fetchUser();
  }, [userId, isEditing]);

  const onFinish = async (values) => {
    try {
      if (isEditing) {
        // event.preventDefault()
        const userId = "656c7f06657dab52d0053101";
        const userUpdate = {
          name: values.name,
          age: values.age,
          address: values.address,
          phone: values.phone,
          email: values.email,
        };
        console.log(userUpdate)
        const updateError = await updateUserAndHandleErrors(userId, userUpdate);

        if (!updateError) {
          notification.success({
            message: "Thông báo",
            description: "Cập nhật thông tin thành công!",
          });
          setIsEditing(false);
        } else {
          console.error("Error updating user data:", updateError);
          notification.error({
            message: "Lỗi",
            description: "Đã xảy ra lỗi khi cập nhật thông tin.",
          });
        }
      }
    } catch (error) {
      console.error("Error in onFinish:", error);
    }
  };

  const handleUpdate = async (event) => {
    // event.
    setIsEditing((prevEditing) => !prevEditing);
    setFormValues(initialFormValues(user, !isEditing));
    setButtonType(isEditing ? "button" : "submit");
  };

  const updateUserAndHandleErrors = async (userId, userData) => {
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

  // Function to handle the submission of the modal form
  const handleModalSubmit = () => {
    // Add validation or additional handling if needed
    setFormValues((prevValues) => ({
      ...prevValues,
      image: imageLink,
    }));
    setIsModalVisible(false);
  };

  // Function to handle the cancellation of the modal
  const handleModalCancel = () => {
    setIsModalVisible(false);
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
                src={
                  formValues.image ||
                  "https://anhcuoiviet.vn/wp-content/uploads/2023/02/avatar-ngau-nam-2.jpg"
                }
                alt="Description"
                style={{ width: "100%", borderRadius: "50%" }}
              />
              <EditOutlined onClick={handleEditIconClick} />
              {/* Add Modal for entering image link */}
              <Modal
                title="Enter Image Link"
                visible={isModalVisible}
                onOk={handleModalSubmit}
                onCancel={handleModalCancel}
              >
                <Input
                  value={imageLink}
                  onChange={(e) => setImageLink(e.target.value)}
                />
              </Modal>
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

export default UserProfile;
