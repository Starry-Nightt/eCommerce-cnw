import React, { ReactNode, useEffect, useState } from "react";
import { Layout } from "antd";
import HeaderAdmin from "./header-admin";
import SideNavAdmin from "./sidenav-admin";
import MainContentAdmin from "./main-content-admin";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Role } from "@/constants/app.const";
import { useRouter } from "next/router";
import { ROUTE_PATH } from "@/constants/route-path.const";
import Head from "next/head";

interface Props {
  children: ReactNode;
}

function LayoutAdmin({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const { loggedIn, user } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (!loggedIn || !user?.isAdmin) {
      router.push(ROUTE_PATH.PAGE_403);
    } else setOk(true);
  }, []);

  return (
    <div className="min-h-screen flex">
      <Head>
        <title>Quản lý eCommerce</title>
      </Head>
      <Layout className="flex-1">
        {ok && (
          <>
            <SideNavAdmin collapsed={collapsed} />
            <Layout>
              <HeaderAdmin collapsed={collapsed} setCollapsed={setCollapsed} />
              <MainContentAdmin>{children}</MainContentAdmin>
            </Layout>
          </>
        )}
      </Layout>
    </div>
  );
}

export default LayoutAdmin;
