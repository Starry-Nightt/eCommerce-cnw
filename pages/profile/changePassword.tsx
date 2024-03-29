import React, { useState, useEffect } from "react";
import FormRules from "@/utils/form-rules";
import { Button, Form, Input, message, Modal, Skeleton, Card } from "antd";
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
  const router = useRouter();
  const { loggedIn, user } = useAuth();

  useEffect(() => {
    if (!loggedIn) return;
    console.log(user);
  }, [user]);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      // Login first
      const loginData = {
        email: user.email,
        password: values.currentPassword,
      };

      const loginResponse = await UserService.login(loginData);
      if (loginResponse.success) {
        // If login is successful, proceed to update the user's password
        const userUpdate = {
          password: values.newPassword,
        };

        const updateError = await updateUserAndHandleErrors(
          user.id,
          userUpdate
        );

        if (!updateError) {
          notification.success({
            message: "Thông báo",
            description: "Thay đổi mật khẩu thành công",
          });
          form.resetFields();
        } else {
          console.error("Error updating user data:", updateError);
          notification.error({
            message: "Lỗi",
            description: "Đang có lỗi xảy ra, vui lòng thử lại sau!",
          });
        }
      } else {
        // If login fails, show an error message
        notification.error({
          message: "Lỗi",
          description: "Mật khẩu hiện tại sai",
        });
      }
    } catch (error) {
      console.error("Error in onFinish:", error);
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

  return (
    <div className="p-3">
      <Card>
        <Title level={2}>Thay Đổi Mật Khẩu</Title>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="currentPassword"
            label="Mật khẩu hiện tại"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu hiện tại" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="Mật khẩu mới"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 kí tự" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu mới"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu mới" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Mật khẩu xác nhận không khớp");
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thay Đổi Mật Khẩu
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Index;
