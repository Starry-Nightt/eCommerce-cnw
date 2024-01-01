import LayoutAdmin from "@/layouts/admin/layout-admin";
import { Bill, BillStatus } from "@/models/bill.model";
import BillService from "@/services/bill.service";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import {
  Button,
  Popconfirm,
  Radio,
  RadioChangeEvent,
  Space,
  Tag,
  Tooltip,
  Typography,
  message,
} from "antd";
import { convertDateFormat, getLabelBillStatus } from "@/utils/helper";
import {
  EyeOutlined,
  DeleteOutlined,
  CheckOutlined,
  LogoutOutlined,
  CheckCircleOutlined,
  SendOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import router from "next/router";
import CustomTable from "@/components/table";

interface Props {
  bills: Bill[];
}

const Index = ({ bills }: Props) => {
  const [originalData, setOriginalData] = useState<Bill[]>(bills);
  const [data, setData] = useState<Bill[]>(bills);
  const [filterKey, setFilterKey] = useState<BillStatus | null>(null);
  const columns: ColumnsType<Bill> = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
      render: (name) => (
        <span className="font-medium text-slate-600">{name}</span>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      render: (phone) =>
        phone && (
          <Typography.Text copyable className="tracking-wide text-base">
            {phone}
          </Typography.Text>
        ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      render: (address) => <span className="capitalize">{address}</span>,
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "date",
      render: (date) => <span>{convertDateFormat(date)}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "issend",
      render: (issend: BillStatus) => {
        const color =
          issend === BillStatus.SENDING
            ? "geekblue"
            : issend === BillStatus.CHECK
            ? "green"
            : "crimson";
        return <Tag color={color}>{getLabelBillStatus(issend)}</Tag>;
      },
    },
    {
      title: "Tác vụ",
      dataIndex: "_id",
      key: "action",
      render: (_id, record) => (
        <Space size="middle">
          {record.issend === BillStatus.SENDING && (
            <>
              <Tooltip title="Gửi hàng về">
                <Button
                  type="dashed"
                  icon={<RollbackOutlined />}
                  onClick={() => onUpdateStatus(_id, BillStatus.UNCHECK)}
                ></Button>
              </Tooltip>
              <Tooltip title="Đã xác nhận hàng">
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={() => onUpdateStatus(_id, BillStatus.CHECK)}
                ></Button>
              </Tooltip>
            </>
          )}
          {record.issend === BillStatus.UNCHECK && (
            <>
              <Tooltip title="Vận chuyển hàng">
                <Button
                  icon={<SendOutlined />}
                  onClick={() => onUpdateStatus(_id, BillStatus.SENDING)}
                ></Button>
              </Tooltip>
            </>
          )}
          {record.issend === BillStatus.CHECK && (
            <Tooltip title="Hàng đã được nhận">
              <CheckCircleOutlined type="primary" />
            </Tooltip>
          )}
          <Popconfirm
            title="Hủy đơn hàng"
            description="Bạn có chắc chắn muốn hủy đơn hàng này?"
            icon={null}
            onConfirm={() => onDeleteBill(_id)}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleFilter = (e: RadioChangeEvent) => {
    setFilterKey(e.target.value);
  };

  const onUpdateStatus = (billId: string, status: BillStatus) => {
    const _data = data.map((it) => {
      if (it._id === billId) return { ...it, issend: status };
      else return it;
    });
    const _originalData = originalData.map((it) => {
      if (it._id === billId) return { ...it, issend: status };
      else return it;
    });
    setData(_data);
    setOriginalData(_originalData)
  };

  const onDeleteBill = (billId: string) => {
    setOriginalData((prev) => prev.filter((it) => it._id !== billId));
  };

  useEffect(() => {
    if (filterKey) {
      setData(originalData.filter((it) => it.issend == filterKey));
    } else setData(originalData);
  }, [filterKey, originalData]);

  return (
    <div>
      <p className="font-medium text-sm mb-4">Lọc theo trạng thái đơn hàng</p>
      <Radio.Group value={filterKey} onChange={handleFilter} className="mb-5">
        <Radio.Button value={null}>{"Tất cả"}</Radio.Button>
        <Radio.Button value={BillStatus.CHECK}>
          {getLabelBillStatus(BillStatus.CHECK)}
        </Radio.Button>
        <Radio.Button value={BillStatus.SENDING}>
          {getLabelBillStatus(BillStatus.SENDING)}
        </Radio.Button>
        <Radio.Button value={BillStatus.UNCHECK}>
          {getLabelBillStatus(BillStatus.UNCHECK)}
        </Radio.Button>
      </Radio.Group>
      <CustomTable data={data} columns={columns} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const bills = await BillService.getAllBill();
  return {
    props: {
      bills,
    },
  };
};

Index.getLayout = function PageLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default Index;
