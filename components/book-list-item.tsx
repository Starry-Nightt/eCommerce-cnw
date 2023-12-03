import { Book } from "@/models/book.model";
import { Card} from "antd";
import React from "react";
import {
  ShoppingCartOutlined,
  EyeOutlined,
  LikeOutlined,
} from "@ant-design/icons";
const { Meta } = Card;
import {
  dateFormatted,
  truncateString,
  vndCurrencyFormat,
} from "@/utils/helper";
import { useRouter } from "next/router";

interface Props {
  book: Book;
}

function BookListItem({ book }: Props) {
  const router = useRouter();

  const onViewDetail = () => {
    router.push(`/book/${book.id}`)
  }

  const description = (
    <div>
      <div className="mb-2">{truncateString(book.describe)}</div>
      <div className="flex justify-between mb-3 items-center">
        <div className="text-cyan-600 font-medium">
          Giá: {vndCurrencyFormat(book.price)}
        </div>
        <div className=" text-neutral-800 text-xs">Đã bán: {book.sales}</div>
      </div>
      <div className="text-xs">
        Ngày sản xuất: {dateFormatted(book.releaseDate)}
      </div>
    </div>
  );
  return (
    <Card
      cover={
        <img
          alt="book-image"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          onClick={onViewDetail}
          className="cursor-pointer"
        />
      }
      actions={[<ShoppingCartOutlined />]}
    >
      <Meta title={book.name} description={description} />
    </Card>
  );
}

export default BookListItem;
