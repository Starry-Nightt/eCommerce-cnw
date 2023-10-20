import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

interface Props {
  children: React.ReactNode;
}

function MainContentAdmin({ children }: Props) {
  return <Content className="my-6 mx-4 p-6 bg-white">{children}</Content>;
}

export default MainContentAdmin;
