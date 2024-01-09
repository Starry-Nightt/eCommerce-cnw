import useToggle from "@/hooks/use-toggle";
import { Book, BookDetailInfo } from "@/models/book.model";
import { dateFormatted } from "@/utils/helper";
import { Divider, Rate, Skeleton, Space, Tag, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import BookService from "@/services/book.service";
import { useRouter } from "next/router";
import { Comment } from "@/models/comment.model";

interface Props {
  book: BookDetailInfo;
  comments: Comment[];
}

function BookDetail({ book, comments }: Props) {
  const [showFull, toggleShowFull] = useToggle(false);
  const [rating, setRating] = useState(null);
  const router = useRouter();
  const { bookId } = router.query;

  useEffect(() => {
    if (comments) {
      const rateValue = comments.reduce((prev, cur) => {
        return prev + cur?.score ?? 0;
      }, 0);
      setRating(Math.floor((rateValue * 100) / comments.length) / 100);
    }
  }, [bookId, comments]);

  if (!book)
    return (
      <Space direction="vertical" size="middle" className="w-full">
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </Space>
    );

  return (
    <Space direction="vertical" className="w-full">
      <Typography.Title>{book.name}</Typography.Title>
      <h3 className="text-2xl font-light tracking-wide mb-1">{book.author}</h3>
      <div className="flex items-center gap-6">
        <Rate value={rating} disabled className="translate-y-1" />
        {rating ? (
          <h4 className="text-2xl font-medium font-serif tracking-wider">
            {rating}/5
          </h4>
        ) : (
          <span className="text-base font-medium font-serif tracking-wider">
            Chưa có đánh giá
          </span>
        )}
      </div>
      <Typography.Paragraph className="text-base mt-3">
        {showFull ? (
          <div>
            <div className="mb-3">{book.describe}</div>
            <span
              onClick={() => toggleShowFull(false)}
              className="cursor-pointer hover:underline ease-in-out text-neutral-600 text-sm font-medium"
            >
              Ẩn bớt <CaretUpOutlined />
            </span>
          </div>
        ) : (
          <div>
            <div className="max-paragraph-8 mb-3">{book.describe}</div>
            <span
              onClick={() => toggleShowFull(true)}
              className="cursor-pointer hover:underline ease-in-out text-neutral-600 text-sm font-medium"
            >
              Xem thêm <CaretDownOutlined />
            </span>
          </div>
        )}
      </Typography.Paragraph>
      <div className="flex items-center">
        <span className="text-slate-700 font-medium text-sm mr-3">
          Thể loại
        </span>
        <Tag bordered={false} color="green">
          {book.category}
        </Tag>
      </div>
      <div className="text-slate-700 font-medium text-sm">
        <p className="mb-2">
          Ngày xuất bản: {dateFormatted(book.release_date)}
        </p>
        <p className="mb-2">Nhà xuất bản: {book.nsx}</p>
      </div>
    </Space>
  );
}

export default BookDetail;
