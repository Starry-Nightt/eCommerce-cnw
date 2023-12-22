import CustomTable from "@/components/table";
import LayoutAdmin from "@/layouts/admin/layout-admin";
import UserService from "@/services/user.service";
import { Button, Space, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { GetServerSideProps } from "next";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { User } from "@/models/user.model";
import { useState } from "react";

const Index = ({ users }) => {
  const [data, setData] = useState(users);
  const onDeleteUser = async (id: string) => {
    await UserService.deleteUser(id);
    setData((prev) => prev.filter((it) => it._id !== id));
  };

  const columns: ColumnsType<User> = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
      render: (name) => (
        <span className="font-medium text-slate-600">{name}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (email) =>
        email && <Typography.Text copyable>{email}</Typography.Text>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      render: (phone) =>
        phone && (
          <Typography.Text copyable className="tracking-wide text-base">
            {phone}
          </Typography.Text>
        ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      render: (address) => <span className="capitalize">{address}</span>,
    },
    {
      title: "Vai trò",
      dataIndex: "isAdmin",
      render: (isAdmin: boolean) => {
        const color = isAdmin ? "geekblue" : "green";
        return (
          <Tag color={color}>{isAdmin ? "Quản trị viên" : "Khách hàng"}</Tag>
        );
      },
    },
    {
      title: "Tác vụ",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            danger
            shape="round"
            icon={<DeleteOutlined />}
            onClick={() => onDeleteUser(record.id)}
          />
        </Space>
      ),
    },
  ];

  return <CustomTable data={data} columns={columns} />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const users = await UserService.getAllUsers();
  return {
    props: {
      users,
    },
  };
};

Index.getLayout = function PageLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default Index;
