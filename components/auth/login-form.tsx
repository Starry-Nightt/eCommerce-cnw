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
}

function LoginForm({ value, onToggleForm, onFinish, onFinishFailed }: Props) {
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
      <Title level={3}>Sign In</Title>
      <Divider />
      <Form.Item
        label="Email"
        name="email"
        rules={FormRules.email}
      >
        <Input size="large" placeholder="example@gmail.com" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={FormRules.password}
      >
        <Input.Password size="large" placeholder="At least 6 characters" />
      </Form.Item>
      <div className="flex justify-between items-end">
        <Button type="link" className="-ml-3" onClick={onToggleForm}>
          Create an account ?
        </Button>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign in
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

export default LoginForm;
