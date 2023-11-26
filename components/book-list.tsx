import { Book } from "@/models/book.model";
import { Row, Col } from "antd";
import React from "react";
import BookListItem from "./book-list-item";

interface Props {
  books: Book[];
}

function BookList({ books }: Props) {
  return (
    <Row
      gutter={[
        { xs: 6, sm: 14, md: 20, lg: 28 },
        { xs: 6, sm: 14, md: 20, lg: 28 },
      ]}
    >
      {books.map((item) => (
        <Col key={item.id} xs={24} sm={12} md={12} lg={8}>
          <BookListItem book={item} />
        </Col>
      ))}
    </Row>
  );
}

export default BookList;
