import { Book } from "@/models/book.model";
import { Card} from "antd";
import React from "react";
import {
  ShoppingCartOutlined,
} from "@ant-design/icons";
const { Meta } = Card;
import {
  dateFormatted,
  truncateString,
  vndCurrencyFormat,
} from "@/utils/helper";
import { useRouter } from "next/router";
import useAuth from "@/hooks/use-auth";

interface Props {
  book: Book;
}

function BookListItem({ book }: Props) {
  const router = useRouter();
  const {user} = useAuth()

  const onViewDetail = () => {
    router.push(`/book/${book._id}`)
  }

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
  return (
    <Card
      cover={
        <img
          alt="book-image"
          src={book.img ?? '/static/images/book-image-default.png'}
          onClick={onViewDetail}
          className="cursor-pointer"
        />
      }
      actions={!(user && user?.isAdmin) && [<ShoppingCartOutlined key={Math.floor(Math.random() * 1000000)} />]}
    >
      <Meta title={book.name} description={description} />
    </Card>
  );
}

export default BookListItem;
