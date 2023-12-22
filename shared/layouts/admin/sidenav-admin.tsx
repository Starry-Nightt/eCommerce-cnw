import React, { ReactNode, useState } from "react";
import {
  UserOutlined,
  BookOutlined,
  AppstoreOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useRouter } from "next/router";

const { Header, Sider, Content } = Layout;

interface Props {
  collapsed: boolean;
}

function SideNavAdmin({ collapsed }: Props) {
  const router = useRouter();
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="w-5/6 my-4 mx-auto rounded-md h-8 bg-slate-600" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "4",
            icon: <AreaChartOutlined />,
            label: "Thống kê",
            style: { fontWeight: 500, fontSize: 14, margin: "12px 0" },
            onClick: () => router.push("/dashboard"),
          },

          {
            key: "2",
            icon: <BookOutlined />,
            label: "Quản lý sách",
            style: { fontWeight: 500, fontSize: 14, margin: "12px 0" },
            onClick: () => router.push("/book-management"),
          },
          {
            key: "3",
            icon: <AppstoreOutlined />,
            label: "Quản lý đơn hàng",
            style: { fontWeight: 500, fontSize: 14, margin: "12px 0" },
            onClick: () => router.push("/order-management"),
          },
          {
            key: "1",
            icon: <UserOutlined />,
            label: "Quản lý người dùng",
            style: { fontWeight: 500, fontSize: 14, margin: "12px 0" },
            onClick: () => router.push("/user-management"),
          },
        ]}
      />
    </Sider>
  );
}

export default SideNavAdmin;
