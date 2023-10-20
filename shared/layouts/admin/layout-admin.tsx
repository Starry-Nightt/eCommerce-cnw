import React, { ReactNode, useState } from "react";
import { Layout} from "antd";
import HeaderAdmin from "./header-admin";
import SideNavAdmin from "./sidenav-admin";
import MainContentAdmin from "./main-content-admin";

interface Props {
  children: ReactNode;
}

function LayoutAdmin({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex">
      <Layout className="flex-1">
        <SideNavAdmin collapsed={collapsed} />
        <Layout>
          <HeaderAdmin collapsed={collapsed} setCollapsed={setCollapsed}  />
          <MainContentAdmin>{children}</MainContentAdmin>
        </Layout>
      </Layout>
    </div>
  );
}

export default LayoutAdmin;
