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

  const fetchUser = async () => {
    try {
      const userData = await UserService.getUser(userId);
      console.log(userData);
      setUser(userData);
    } catch (error) {
      console.error("Error fetching User", error);
    }
  };
  const { loggedIn } = useAuth();

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
    <div>hehehe</div>
  );
}

export default Index;
