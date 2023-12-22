import { Book } from "@/models/book.model";
import { App, Button, Rate, Skeleton, Space } from "antd";
import React, { useState } from "react";
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
  const [value, setValue] = useState(null);

  const desc = ["Rất tệ", "Tệ", "Ổn", "Tốt", "Tuyệt vời"];

  const onAddToCart = () => {
    if (!loggedIn) onShowLogin();
    else message.success("Thêm vào giỏ hàng thành công");
  };

  const onBuy = () => {
    if (!loggedIn) onShowLogin();
  };

  const onRating = (value: number) => {
    if (!loggedIn) onShowLogin();
    else setValue(value);
  };

  return (
    <Space
      direction="vertical"
      className="w-full xl:px-12 md:sticky md:top-4 lg:top-8 "
      size="large"
    >
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
      <div className="flex justify-center flex-col items-center">
        <Rate tooltips={desc} onChange={onRating} value={value} />
        <span className="mt-2 font-semibold font-sans tracking-wide text-base">
          Đánh giá điểm
        </span>
      </div>
    </Space>
  );
}

export default BookImageAndAction;
