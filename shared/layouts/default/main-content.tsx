import React, { ReactNode } from "react";
import { Layout } from "antd";

interface Props {
  children: ReactNode;
}

function MainContent({ children }: Props) {
  return (
    <Layout.Content className="site-layout p-8">
      <div className="h-full bg-white">{children}</div>
    </Layout.Content>
  );
}

export default MainContent;
