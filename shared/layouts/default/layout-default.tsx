import React from "react";
import { Layout } from "antd";
import Header from "@/layouts/default/header";
import Footer from "@/layouts/default/footer";
import MainContent from "@/layouts/default/main-content";

const {
  Header: HeaderLayout,
  Footer: FooterLayout,
  Content: ContentLayout,
} = Layout;

function LayoutDefault({ children }) {
  return (
    <div className="min-h-screen flex">
      <Layout className="flex-1">
        <HeaderLayout>
          <Header />
        </HeaderLayout>
        <ContentLayout>
          <MainContent>{children}</MainContent>
        </ContentLayout>
        <FooterLayout>
          <Footer />
        </FooterLayout>
      </Layout>
    </div>
  );
}

export default LayoutDefault;
