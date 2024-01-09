import BookDetail from "@/components/book-detail";
import BookImageAndAction from "@/components/book-image-and-action";
import BookService from "@/services/book.service";
import { Button, Card, Col, Divider, Row, Typography } from "antd";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { DoubleLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import BookComments from "@/components/book-comments";
import { BookDetailInfo } from "@/models/book.model";
import { Comment } from "@/models/comment.model";

interface Props {
  book: BookDetailInfo;
  comments: Comment[];
}

function BookDetailPage({ book, comments }: Props) {
  const [commentsList, setCommentList] = useState(comments);

  const fetchComment = async () => {
    const commentsData = await BookService.getCommentsOfBook(
      book._id ?? book.id
    );
    setCommentList(commentsData.comments);
  };

  const router = useRouter();
  return (
    <>
      <Head>
        <title>Chi tiết sách</title>
      </Head>
      <Button
        type="link"
        className="mb-2"
        size="large"
        icon={<DoubleLeftOutlined />}
        onClick={() => router.back()}
      >
        Quay về
      </Button>
      <Card bordered={false}>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={24} md={10} lg={8}>
            <BookImageAndAction book={book} />
          </Col>
          <Col xs={24} sm={24} md={14} lg={16}>
            <>
              <BookDetail
                book={book}
                comments={commentsList}
              />
              <Divider>
                <span className="text-lg">Đánh giá người dùng</span>
              </Divider>
              <BookComments
                comments={commentsList}
                bookId={book?.id ?? book?._id}
                onFetchComment={fetchComment}
              />
            </>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default BookDetailPage;

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params } = ctx;
  const { bookId } = params;
  const data = await BookService.getBookById(bookId as string);
  const commentsData = await BookService.getCommentsOfBook(bookId as string);

  return {
    props: {
      book: data,
      comments: commentsData.comments,
    },
    revalidate: 100,
  };
};
