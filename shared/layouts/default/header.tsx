import React from "react";
import { Layout, MenuProps } from "antd";
import Link from "next/link";
import AvatarHeader from "@/components/avatar-header";

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

function Header() {
  return (
    <Layout.Header>
      <div className="flex items-center justify-between">
        <div className="w-20 my-4  rounded-md h-8 bg-slate-600" />
        <AvatarHeader items={items} textWhite/>
      </div>
    </Layout.Header>
  );
}

export default Header;
