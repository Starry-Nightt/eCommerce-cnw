import { Book } from "@/models/book.model";
import { App, Button, Rate, Skeleton, Space } from "antd";
import React, { useState } from "react";
import { Image } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { vndCurrencyFormat } from "@/utils/helper";
import useAuth from "@/hooks/use-auth";
import useAuthModal from "@/hooks/use-auth-modal";
import CartService from "@/services/cart.service";

interface Props {
  book: Book;
}

function BookImageAndAction({ book }: Props) {
  const { message } = App.useApp();

  const { loggedIn, user } = useAuth();
  const { onShowLogin } = useAuthModal();
  const [value, setValue] = useState(null);

  const desc = ["Rất tệ", "Tệ", "Ổn", "Tốt", "Tuyệt vời"];

  const onAddToCart = () => {
    if (!loggedIn) onShowLogin();
    else{
      CartService.addToCart({id_user: user.id, id_product: book._id ?? book.id, count: 1}).then(res => {
        message.success("Thêm vào giỏ hàng thành công");
      }).catch(() => {
        message.error("Có lỗi xảy ra! Xin vui lòng thử lại")
      })
    }
  };

  const onBuy = () => {
    if (!loggedIn) onShowLogin();
  };

  const onRating = (value: number) => {
    if (!loggedIn) onShowLogin();
    else setValue(value);
  };

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

  return (
    <Space
      direction="vertical"
      className="w-full xl:px-12 md:sticky md:top-4 lg:top-8 "
      size="large"
    >
      <div className="w-full flex justify-center mb-5">
        <Image
          src={book.img}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/static/images/no-image.jpg";
          }}
        />
      </div>
      {!(user && user?.isAdmin) && (
        <div className="flex flex-col gap-5">
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
            Mua ngay {vndCurrencyFormat(book?.price * 1000)}
          </Button>
          <div className="flex justify-center flex-col items-center">
            <Rate tooltips={desc} onChange={onRating} value={value} />
            <span className="mt-2 font-semibold font-sans tracking-wide text-base">
              Đánh giá điểm
            </span>
          </div>
        </div>
      )}
    </Space>
  );
}

export default BookImageAndAction;
