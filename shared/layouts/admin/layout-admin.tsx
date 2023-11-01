import React, { ReactNode, useEffect, useState } from "react";
import { Layout} from "antd";
import HeaderAdmin from "./header-admin";
import SideNavAdmin from "./sidenav-admin";
import MainContentAdmin from "./main-content-admin";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Role } from "@/constants/app.const";
import { useRouter } from "next/router";
import { ROUTE_PATH } from "@/constants/route-path.const";

interface Props {
  children: ReactNode;
}

function LayoutAdmin({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const { loggedIn, user } = useSelector((state: RootState) => state.user);
  const router = useRouter()
  useEffect(() => {
    if (!loggedIn || user.role !== Role.ADMIN){
      router.push(ROUTE_PATH.HOME)
    }
  }, [])

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
