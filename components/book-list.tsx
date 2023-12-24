import { Book } from "@/models/book.model";
import { Row, Col, Empty } from "antd";
import React from "react";
import BookListItem from "./book-list-item";

interface Props {
  books: Book[];
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
}

function BookList({ books, xs, sm, md, lg }: Props) {
  return (
    <>
      {books.length ? (
        <Row
          gutter={[
            { xs: 6, sm: 14, md: 20, lg: 28 },
            { xs: 14, sm: 14, md: 20, lg: 28 },
          ]}
        >
          {books.map((item) => (
            <Col
              key={item.id}
              xs={xs ?? 24}
              sm={sm ?? 12}
              md={md ?? 12}
              lg={lg ?? 8}
            >
              <BookListItem book={item} />
            </Col>
          ))}
        </Row>
      ) : (
        <>
          <Empty className="mt-12 mx-auto"/>
        </>
      )}
    </>
  );
}

export default BookList;
