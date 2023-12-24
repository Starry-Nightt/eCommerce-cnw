import { Result, Button } from "antd";
import { useRouter } from "next/router";
import React from "react";

function BuyResult() {
  const router = useRouter();

  return (
    <Result
      status="success"
      title="Mua hàng thành công"
      subTitle="Số đơn hàng: 2017182818828182881. Thanks for coming"
      extra={[
        <Button
          type="primary"
          key="console"
          onClick={() => router.push("/cart")}
        >
          Quay về giỏ hàng
        </Button>,
        <Button key="buy" onClick={() => router.push("/book")}>
          Mua tiếp
        </Button>,
      ]}
    />
  );
}

export default BuyResult;
