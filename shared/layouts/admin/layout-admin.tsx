import React, { ReactNode, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import HeaderAdmin from "./header-admin";
import MainContentAdmin from "./main-content-admin";

const { Header, Sider, Content } = Layout;

interface Props {
  children: ReactNode;
}

function LayoutAdmin({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div className="min-h-screen flex">
      <Layout className="flex-1">
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
        <Layout>
          <Header
            style={{ padding: 16, background: colorBgContainer }}
            className="flex items-center"
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="w-16 h-16 text-base"
            />
            <HeaderAdmin />
          </Header>
          <Content
            style={{
              background: colorBgContainer,
            }}
            className="my-6 mx-4 p-6"
          >
            <MainContentAdmin>{children}</MainContentAdmin>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default LayoutAdmin;
