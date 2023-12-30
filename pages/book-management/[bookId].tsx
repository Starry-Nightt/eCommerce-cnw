import BookForm from "@/components/book-form";
import BookUpload from "@/components/book-form/book-upload";
import LayoutAdmin from "@/layouts/admin/layout-admin";
import { BookUpdateInfo } from "@/models/book.model";
import BookService from "@/services/book.service";
import { DoubleLeftOutlined } from "@ant-design/icons";
import { Button, Card, Row, Col, Form } from "antd";
import { GetStaticPaths, GetStaticProps } from "next";
import router from "next/router";

const Index = ({ book }) => {
  return (
    <>
      <Button
        type="link"
        className="mb-2"
        size="large"
        icon={<DoubleLeftOutlined />}
        onClick={() => router.back()}
      >
        Quay về
      </Button>
      <BookForm isEdit data={book} />
    </>
  );
};

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

  return {
    props: {
      book: data,
    },
  };
};

Index.getLayout = function PageLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default Index;
