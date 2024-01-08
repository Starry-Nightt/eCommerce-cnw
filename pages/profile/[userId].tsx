import React, { useState, useEffect } from "react";
import FormRules from "@/utils/form-rules";
import { Button, Form, Input, message, Modal, Skeleton } from "antd";
import { Typography } from "antd";
import { notification } from "antd";
import { EditOutlined } from "@ant-design/icons";
import useAuth from "@/hooks/use-auth";
import LayoutAdmin from "@/layouts/admin/layout-admin";
import { useRouter } from "next/router";
import { User } from "@/models/user.model";
import UserService from "@/services/user.service";
import { useDispatch } from "react-redux";
import { update } from "@/redux/user.slice";

const { Title } = Typography;

function Index() {
  const [user, setUser] = useState<User>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imageLink, setImageLink] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();
  const [userId, setUserId] = useState<string>(
    (router.query?.userId as string) ?? "656c7f06657dab52d0053101"
  );
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const userData = await UserService.getUser(userId);
      setUser(userData);
    } catch (error) {
      console.error("Error fetching User", error);
    }
  };
  const { loggedIn, user: userInfo } = useAuth();

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const initialFormValues = (userData: User | null) => ({
    name: userData?.name || "",
    address: userData?.address || "",
    phone: userData?.phone || "",
    email: userData?.email || "",
    image: userData?.avatar || "",
  });

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
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
      await UserService.updateUser(userId, userData);
      console.log(userData);
      dispatch(update({ ...userInfo, ...userData }));
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
                  "/static/images/avatar-default.jpg"
                }
                alt="avatar"
                style={{ width: "300px", height: "300px", borderRadius: "50%" }}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/static/images/avatar-default.jpg";
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
          <Skeleton avatar paragraph={{ rows: 4 }} />;
        </div>
      )}
    </div>
  );
}

export default Index;
