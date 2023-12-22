import React from "react";
import type { ColumnsType } from "antd/es/table";
import { Button, Skeleton, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface Props {
  columns: ColumnsType;
  data: any[];
}

function CustomTable({ columns, data }: Props) {
  if (!data)
    return (
      <>
        <div className="flex gap-3 mt-4">
          <Skeleton.Input
            active
            block
            className="flex-1 w-1/4"
          ></Skeleton.Input>
          <Skeleton.Input
            active
            block
            className="flex-1 w-1/4"
          ></Skeleton.Input>
          <Skeleton.Input
            active
            block
            className="flex-1 w-1/4"
          ></Skeleton.Input>
          <Skeleton.Input
            active
            block
            className="flex-1 w-1/4"
          ></Skeleton.Input>
          <Skeleton.Input
            active
            block
            className="flex-1 w-1/4"
          ></Skeleton.Input>
          <Skeleton.Input
            active
            block
            className="flex-1 w-1/4"
          ></Skeleton.Input>
        </div>
        {new Array(8).fill(10).map((it) => (
          <div className="my-4">
            <Skeleton.Input active block></Skeleton.Input>
          </div>
        ))}
        <div className="flex justify-end">
          <Skeleton.Input active></Skeleton.Input>
        </div>
      </>
    );
  const _data = data.map((it, index) => ({
    ...it,
    key: `${it._id}`,
    index: index + 1,
    id: it._id,
  }));
  const _columns = [
    {
      title: "STT",
      dataIndex: "index",
    },
    ,
    ...columns,
  ];
  return (
    <div className="shadow-xl overflow-hidden rounded-md relative">
      <Table
        rowSelection={{
          type: "checkbox",
        }}
        columns={_columns}
        dataSource={_data}
      />
      <div className="absolute bottom-4 left-2">
        <Button type="text" danger icon={<DeleteOutlined />}>
          Xóa tất cả
        </Button>
      </div>
    </div>
  );
}

export default CustomTable;
