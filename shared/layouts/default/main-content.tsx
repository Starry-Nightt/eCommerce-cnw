import React, { ReactNode } from "react";
import { Layout } from "antd";
import Spinner from "@/components/spinner";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface Props {
  children: ReactNode;
}

function MainContent({ children }: Props) {
  const loading = useSelector((state: RootState) => state.spinner.loading);

  return (
    <Layout.Content className="h-full bg-white my-6 mx-12 p-6">
      <Spinner loading={loading}>{children}</Spinner>
    </Layout.Content>
  );
}

export default MainContent;
