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
    <Layout.Content className="h-full  mx-4 my-6 p-4 md:p-6 sm:mx-6 md:mx-8 lg:mx-12">
      <Spinner loading={loading}>{children}</Spinner>
    </Layout.Content>
  );
}

export default MainContent;
