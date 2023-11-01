import { RegisterDetail } from "@/models/auth.model";
import FormRules from "@/utils/form-rules";
import { Divider, Input, Button, Form } from "antd";
import React, { useEffect } from "react";
import { Typography } from 'antd';

const { Title } = Typography;

interface Props {
  value?: RegisterDetail;
  onToggleForm: () => void;
  onFinish: (detail: RegisterDetail) => void
  onFinishFailed: (text: string) => void
}

function RegisterForm({ value, onToggleForm, onFinish, onFinishFailed }: Props) {
  const [form] = Form.useForm<RegisterDetail>();

  const confirmPasswordRule = ({ getFieldValue }) => ({
    validator(_: any, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('The confirm password do not match!'));
    },
  })

  useEffect(() => {
    form.setFieldsValue(value);
  }, [value]);

  const onFinishForm = (formValue: RegisterDetail) => {
    onFinish(formValue)
    form.resetFields()
  }

  return (
    <Form form={form} layout="vertical" onFinish={onFinishForm} onFinishFailed={() => onFinishFailed('Submit failed !')}>
      <Title level={3}>Sign Up</Title>
      <Divider />
      <Form.Item label="Username" name="username" rules={FormRules.username}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={FormRules.email}>
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={FormRules.password}>
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Confirm password"
        name="confirmPassword"
        rules={[
          ...FormRules.password,
          confirmPasswordRule,
        ]}
      >
        <Input.Password />
      </Form.Item>
      <div className="flex justify-between items-end">
        <Button type="link" className="-ml-3" onClick={onToggleForm}>
          Already have an account ? Sign in
        </Button>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign up
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

export default RegisterForm;
