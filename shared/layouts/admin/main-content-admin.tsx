import React from "react";
import { Layout } from "antd";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Spinner from "@/components/spinner";

const { Content } = Layout;

interface Props {
  children: React.ReactNode;
}

function MainContentAdmin({ children }: Props) {
  const loading = useSelector((state: RootState) => state.spinner.loading);

  return (
    <Content className="my-6 mx-4 p-6 bg-white">
      <Spinner loading={loading}>{children}</Spinner>
    </Content>
  );
}

export default MainContentAdmin;
