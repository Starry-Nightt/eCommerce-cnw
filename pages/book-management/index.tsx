import LayoutAdmin from "@/layouts/admin/layout-admin";
import { Book } from "@/models/book.model";
import BookService from "@/services/book.service";
import { GetServerSideProps, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { Button, Image, Popconfirm, Space, Typography, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import TableSearch from "@/components/table/table-search";
import CustomTable from "@/components/table";
import { SearchProps } from "antd/es/input";
import { truncateString, vndCurrencyFormat } from "@/utils/helper";

const Index = ({ books }) => {
  const [data, setData] = useState<Book[]>(books);
  const [key, setKey] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (key.trim().length) {
      const _data = data.filter(
        (it) => it.name.includes(key) || it.describe.includes(key)
      );
      setData(_data);
    } else {
      setData(books);
    }
  }, [key]);

  const onDeleteBook = async (id: string) => {
    await BookService.deleteBook(id);
    setData((prev) => prev.filter((it) => it._id !== id));
  };

  const columns: ColumnsType<Book> = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
      render: (name) => (
        <span className="font-medium text-slate-600">{name}</span>
      ),
    },
    {
      title: "Hình ảnh",
      dataIndex: "img",
      render: (src) => (
        <Image
          src={src}
          alt=""
          width={100}
          height={100}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/static/images/no-image.jpg";
          }}
        />
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "describe",
      render: (desc) => (
        <div className="max-w-xs">{truncateString(desc, 120)}</div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (price) =>
        price && (
          <Typography.Text className="font-semibold text-sm">
            {vndCurrencyFormat(price * 1000)}
          </Typography.Text>
        ),
    },

    {
      title: "Đã bán",
      dataIndex: "sales",
      render: (sales) =>
        sales && (
          <Typography.Text className="tracking-wide text-base">
            {sales}
          </Typography.Text>
        ),
    },
    {
      title: "Tác vụ",
      dataIndex: "_id",
      key: "action",
      render: (_id, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => router.push("/book-management/" + _id)}
          ></Button>
          <Popconfirm
            title="Xóa người dùng"
            description="Bạn có chắc chắn muốn xóa người dùng này?"
            icon={null}
            onConfirm={() => {
              message.success("Xóa thành công");
              onDeleteBook(record._id);
            }}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onSearch: SearchProps["onSearch"] = (value) => setKey(value);

  return (
    <>
      <div className="flex justify-between">
        <TableSearch className="mb-4" onSearch={onSearch} />
        <Button
          type="primary"
          onClick={() => router.push("/book-management/create")}
        >
          Thêm mới sách
        </Button>
      </div>
      <CustomTable data={data} columns={columns} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const books = await BookService.getAllBook();
  return {
    props: {
      books: books.data,
    },
    revalidate: 60,
  };
};

Index.getLayout = function PageLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default Index;
