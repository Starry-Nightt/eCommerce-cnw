import { LoginDetail } from "@/models/auth.model";
import FormRules from "@/utils/form-rules";
import { Button, Divider, Form, Input } from "antd";
import React, { useEffect } from "react";
import { Typography } from 'antd';

const { Title } = Typography;

interface Props {
  value?: LoginDetail;
  onToggleForm: () => void;
  onFinish: (detail: LoginDetail) => void
  onFinishFailed: (text: string) => void
  loading: boolean
}

function LoginForm({ value, onToggleForm, onFinish, onFinishFailed, loading }: Props) {
  const [form] = Form.useForm<LoginDetail>();

  useEffect(() => {
    form.setFieldsValue(value);
  }, [value]);

  const onFinishForm = (formValue: LoginDetail) => {
    onFinish(formValue);
    form.resetFields()
  }

  return (
    <Form form={form} layout="vertical" onFinish={onFinishForm} onFinishFailed={() => onFinishFailed('Submit failed !')}>
      <Title level={3}>Đăng nhập</Title>
      <Divider />
      <Form.Item
        label="Email"
        name="email"
        rules={FormRules.email}
      >
        <Input size="large" placeholder="example@gmail.com" />
      </Form.Item>
      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={FormRules.password}
      >
        <Input.Password size="large" placeholder="At least 6 characters" />
      </Form.Item>
      <div className="flex justify-between items-end">
        <Button type="link" className="-ml-3" onClick={onToggleForm} disabled={loading}>
          Tạo tài khoản ?
        </Button>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={loading}>
            Đăng nhập
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

export default LoginForm;
