import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, MenuProps } from "antd";
import Link from "next/link";
import AvatarHeader from "@/components/avatar-header";

const { Header } = Layout;

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Link href="/counter">Thông tin cá nhân</Link>,
  },
  {
    key: "2",
    label: <Link href="/counter">Đổi mật khẩu</Link>,
  },
  {
    key: "3",
    label: <Link href="/counter">Đăng xuất</Link>,
  },
];

interface Props {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

function HeaderAdmin({ collapsed, setCollapsed }: Props) {
  return (
    <Header
      style={{ padding: 16, background: "#fff" }}
      className="flex items-center justify-between"
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className="w-16 h-16 text-base"
      />
      <div className="pr-8">
        <AvatarHeader items={items} />
      </div>
    </Header>
  );
}

export default HeaderAdmin;
