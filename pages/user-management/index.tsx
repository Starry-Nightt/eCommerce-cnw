import CustomTable from "@/components/table";
import LayoutAdmin from "@/layouts/admin/layout-admin";
import UserService from "@/services/user.service";
import { Button, Popconfirm, Space, Tag, Typography, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { GetServerSideProps } from "next";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { User } from "@/models/user.model";
import { useEffect, useState } from "react";
import TableSearch from "@/components/table/table-search";
import { SearchProps } from "antd/es/input";
import { useRouter } from "next/router";

const Index = ({ users }) => {
  const [data, setData] = useState<User[]>(users);
  const [key, setKey] = useState("");
  const router = useRouter()

  useEffect(() => {
    if (key.trim().length) {
      const _data = data.filter(
        (it) =>
          it.name.includes(key) ||
          it.email.includes(key) ||
          it.email.includes(key)
      );
      setData(_data);
    } else {
      setData(users);
    }
  }, [key]);

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
      dataIndex: "_id",
      key: "action",
      render: (_id, record) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} onClick={() => router.push("/admin-profile/" + _id)}></Button>
          <Popconfirm
            title="Xóa người dùng"
            description="Bạn có chắc chắn muốn xóa người dùng này?"
            icon={null}
            onConfirm={() => {
              message.success("Xóa thành công");
              onDeleteUser(record.id);
            }}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const onSearch: SearchProps["onSearch"] = (value) => setKey(value);

  return (
    <>
      <div className="flex justify-end">
        <TableSearch className="mb-4 ml-auto" onSearch={onSearch} />
      </div>
      <CustomTable data={data} columns={columns}  />
    </>
  );
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
