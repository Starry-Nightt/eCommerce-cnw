import { Spin } from "antd";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  loading: boolean;
}

function Spinner({ children, loading }: Props) {
  return (
    <Spin tip="Loading" size="large" spinning={loading} >
      {children}
    </Spin>
  );
}

export default Spinner;
