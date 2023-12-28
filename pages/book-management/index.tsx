import LayoutAdmin from "@/layouts/admin/layout-admin";
import { Book } from "@/models/book.model";
import BookService from "@/services/book.service";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import Image from "next/image";
import { Button, Popconfirm, Space, Typography, message } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import TableSearch from "@/components/table/table-search";
import CustomTable from "@/components/table";
import { SearchProps } from "antd/es/input";


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
          src={
            "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          }
          alt=""
          width={100}
          height={100}
        />
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "describe",
      render: (desc) => <span className="capitalize">{desc}</span>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (price) =>
        price && (
          <Typography.Text copyable className="tracking-wide text-base">
            {price}
          </Typography.Text>
        ),
    },

    {
      title: "Đã bán",
      dataIndex: "sales",
      render: (sales) =>
        sales && (
          <Typography.Text copyable className="tracking-wide text-base">
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
            icon={<EyeOutlined />}
            onClick={() => router.push("/admin-profile/" + _id)}
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
      <div className="flex justify-end">
        <TableSearch className="mb-4 ml-auto" onSearch={onSearch} />
      </div>
      <CustomTable data={data} columns={columns} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const books = await BookService.getAllBook();
  return {
    props: {
      books: books.data,
    },
  };
};

Index.getLayout = function PageLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default Index;
