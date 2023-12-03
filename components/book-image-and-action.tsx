import { Book } from "@/models/book.model";
import { App, Button, Skeleton, Space } from "antd";
import React from "react";
import { Image } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { vndCurrencyFormat } from "@/utils/helper";
import useAuth from "@/hooks/use-auth";
import useAuthModal from "@/hooks/use-auth-modal";

interface Props {
  book: Book;
}

function BookImageAndAction({ book }: Props) {
  if (!book)
    return (
      <Space className="w-full xl:px-12" direction="vertical" size="large">
        <div className="w-full flex justify-center mb-5">
          <Skeleton.Image active style={{ height: "300px", width: "300px" }} />
        </div>

        <Skeleton.Button active block />
        <Skeleton.Button active block />
      </Space>
    );

  const { message } = App.useApp();

  const { loggedIn } = useAuth();
  const { onShowLogin } = useAuthModal();

  const onAddToCart = () => {
    if (!loggedIn) onShowLogin();
    else message.success("Thêm vào giỏ hàng thành công");
  };

  const onBuy = () => {
    if (!loggedIn) onShowLogin();
  };

  return (
    <Space direction="vertical" className="w-full xl:px-12" size="large">
      <div className="w-full flex justify-center mb-5">
        <Image
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          width={200}
        />
      </div>
      <Button
        type="primary"
        shape="round"
        block
        size="large"
        icon={<ShoppingCartOutlined />}
        onClick={onAddToCart}
      >
        Thêm vào giỏ hàng
      </Button>
      <Button
        size="large"
        shape="round"
        block
        icon={<ShoppingCartOutlined />}
        onClick={onBuy}
      >
        Mua ngay {vndCurrencyFormat(book?.price)}
      </Button>
    </Space>
  );
}

export default BookImageAndAction;
