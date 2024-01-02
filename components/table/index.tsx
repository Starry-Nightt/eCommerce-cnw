import React from "react";
import type { ColumnsType } from "antd/es/table";
import { Button, Popconfirm, Skeleton, Table, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface Props {
  columns: ColumnsType;
  data: any[];
  onDeleteAll?: () => void;
}

function CustomTable({ columns, data, onDeleteAll }: Props) {
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
        {new Array(8).fill(10).map((it, idx) => (
          <div className="my-4" key={idx}>
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

  const paginationOptions = {
    pageSize: 5
  };

  return (
    <div className="shadow-xl overflow-hidden rounded-md relative">
      <Table
        rowSelection={onDeleteAll && {
          type: "checkbox",
        }}
        columns={_columns}
        dataSource={_data}
        pagination={paginationOptions}
      />
      {onDeleteAll && (
        <div className="absolute bottom-4 left-2">
          <Popconfirm
            title="Xác nhận xóa tất cả"
            icon={null}
            onConfirm={() => {
              message.success("Xóa thành công");
              onDeleteAll();
            }}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <Button type="text" danger icon={<DeleteOutlined />}>
              Xóa tất cả
            </Button>
          </Popconfirm>
        </div>
      )}
    </div>
  );
}

export default CustomTable;
