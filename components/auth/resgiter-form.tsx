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
  loading: boolean
}

function RegisterForm({ value, onToggleForm, onFinish, onFinishFailed, loading }: Props) {
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
  }

  return (
    <Form form={form} layout="vertical" onFinish={onFinishForm} onFinishFailed={() => onFinishFailed('Submit failed !')}>
      <Title level={3}>Đăng ký</Title>
      <Divider />
      <Form.Item label="Tên đăng nhập" name="name" rules={FormRules.name}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={FormRules.email}>
        <Input />
      </Form.Item>
      <Form.Item label="Mật khẩu" name="password" rules={FormRules.password}>
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Xác nhận mật khẩu"
        name="confirmPassword"
        rules={[
          ...FormRules.password,
          confirmPasswordRule,
        ]}
      >
        <Input.Password />
      </Form.Item>
      <div className="flex justify-between items-end">
        <Button type="link" className="-ml-3" onClick={onToggleForm} disabled={loading}>
          Đã có tài khoản ? Đăng nhập
        </Button>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={loading}>
            Đăng ký
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

export default RegisterForm;
