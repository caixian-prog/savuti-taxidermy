import { EditOutlined } from "@ant-design/icons";
import { Table, TableColumnsType } from "antd";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_ORDERDETAILPAGE } from "../navigation/routes";

interface PROPS {
  dataList: any[];
}

interface DataType {
  key: string;
  id?: string;
  customer_name: string;
  order_date: string;
  deposit_amount?: number;
  currency: string;
  type?: string;
  completion_date?: string;
  collection_date?: string;
  created: string;
}

const OrderListWidget: FC<PROPS> = ({ dataList = [] }) => {
  const navigate = useNavigate();
  const onClickEdit = (item: DataType) => {
    navigate(ROUTE_ORDERDETAILPAGE + "/" + item.id);
  };

  const data: DataType[] = dataList.map((info) => {
    return {
      key: `order-${info.id}`,
      id: info.id,
      customer_name: info.customer_name,
      order_date: info.order_date.substring(0, 10),
      deposit_amount: info.deposit_amount,
      currency: info.currency,
      type: info.type == 10 ? "Finished" : "",
      completion_date: info.completion_date?.substring(0, 10),
      collection_date: info.collection_date?.substring(0, 10),
      created: info.created.substring(0, 10),
    };
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer Name",
      dataIndex: "customer_name",
      key: "customer_name",
      sorter: (a: DataType, b: DataType) =>
        a.customer_name.localeCompare(b.customer_name),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Ordered at",
      dataIndex: "order_date",
      key: "order_date",
      sorter: (a: DataType, b: DataType) =>
        a.order_date.localeCompare(b.order_date),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Deposit",
      dataIndex: "deposit_amount",
      key: "deposit_amount",
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
      sorter: (a: DataType, b: DataType) =>
        a.currency.localeCompare(b.currency),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Finished",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Created",
      dataIndex: "created",
      key: "created",
      sorter: (a: DataType, b: DataType) => a.created.localeCompare(b.created),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (item, data) => {
        return (
          <div>
            <div
              className="text-blue-600 custom-button"
              onClick={() => {
                onClickEdit(data);
              }}
            >
              <EditOutlined /> &nbsp; Edit{" "}
            </div>
            {/* <Popconfirm
              title="Sure to delete?"
              onConfirm={() => {
                onClickDelete(data);
              }}
            >
              <div className="text-red-600 custom-button">
                <DeleteOutlined /> &nbsp; Delete{" "}
              </div>
            </Popconfirm> */}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default OrderListWidget;
