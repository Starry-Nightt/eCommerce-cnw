import { Book } from "@/models/book.model";
import { Card, message } from "antd";
import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
const { Meta } = Card;
import {
  dateFormatted,
  truncateString,
  vndCurrencyFormat,
} from "@/utils/helper";
import { useRouter } from "next/router";
import useAuth from "@/hooks/use-auth";
import useAuthModal from "@/hooks/use-auth-modal";
import CartService from "@/services/cart.service";

interface Props {
  book: Book;
}

function BookListItem({ book }: Props) {
  const router = useRouter();
  const { user, loggedIn } = useAuth();
  const { onShowLogin } = useAuthModal();

  const onViewDetail = () => {
    router.push(`/book/${book._id}`);
  };

  const description = (
    <div>
      <div className="mb-2">{truncateString(book.describe)}</div>
      <div className="flex justify-between mb-3 items-center">
        <div className="text-cyan-600 font-medium">
          Giá: {vndCurrencyFormat(book.price * 1000)}
        </div>
        <div className=" text-neutral-800 text-xs">Đã bán: {book.sales}</div>
      </div>
      <div className="text-xs">
        Ngày sản xuất: {dateFormatted(book.release_date)}
      </div>
    </div>
  );

  const onAddToCart = () => {
    if (!loggedIn) onShowLogin();
    else {
      CartService.addToCart({
        id_user: user.id,
        id_product: book._id ?? book.id,
        count: 1,
      })
        .then((res) => {
          message.success("Thêm vào giỏ hàng thành công");
        })
        .catch(() => {
          message.error("Có lỗi xảy ra! Xin vui lòng thử lại");
        });
    }
  };

  return (
    <Card
      cover={
        <img
          alt="book-image"
          src={book.img ?? "/static/images/book-image-default.png"}
          onClick={onViewDetail}
          className="cursor-pointer"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/static/images/no-image.jpg";
          }}
        />
      }
      actions={
        !(user && user?.isAdmin) && [
          <ShoppingCartOutlined
            key={Math.floor(Math.random() * 1000000)}
            onClick={onAddToCart}
          />,
        ]
      }
    >
      <Meta title={book.name} description={description} />
    </Card>
  );
}

export default BookListItem;
