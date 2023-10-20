import React, { ReactNode, useState } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

const { Header, Sider, Content } = Layout;

interface Props {
  collapsed: boolean;
}

function SideNavAdmin({ collapsed }: Props) {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="w-5/6 my-4 mx-auto rounded-md h-8 bg-slate-600" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            label: "nav 1",
          },
          {
            key: "2",
            icon: <VideoCameraOutlined />,
            label: "nav 2",
          },
          {
            key: "3",
            icon: <UploadOutlined />,
            label: "nav 3",
          },
        ]}
      />
    </Sider>
  );
}

export default SideNavAdmin;
