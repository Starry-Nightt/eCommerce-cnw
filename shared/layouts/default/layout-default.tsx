import React from "react";
import { Layout } from "antd";
import Header from "@/layouts/default/header";
import Footer from "@/layouts/default/footer";
import MainContent from "@/layouts/default/main-content";

function LayoutDefault({ children }) {
  return (
    <div className="min-h-screen flex">
      <Layout className="flex-1">
        <Header />
        <MainContent>{children}</MainContent>
        <Footer />
      </Layout>
    </div>
  );
}

export default LayoutDefault;
