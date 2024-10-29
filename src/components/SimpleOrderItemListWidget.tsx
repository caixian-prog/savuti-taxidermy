import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_ORDERDETAILPAGE } from "../navigation/routes";
import { Table, TableColumnsType } from "antd";
import { EditOutlined } from "@ant-design/icons";
import PrintableTable from "./PrintableTable";

interface PROPS {
  dataList: any[];
}

interface DataType {
  key: number;
  id: number;
  quantity: number;
  specie: string;
  item_name: string;
  instruction: string;
  price: number;
  currency: string;
  collection_date: string;
  completion_date: string;
  order_id: string;
}

const SimpleOrderItemListWidget: FC<PROPS> = ({ dataList = [] }) => {
  const navigate = useNavigate();
  const onClickEdit = (item: DataType) => {
    navigate(ROUTE_ORDERDETAILPAGE + "/" + item.order_id);
  };

  const data: DataType[] = dataList.map((info) => {
    return {
      key: info.id,
      id: info.id,
      quantity: info.quantity,
      specie: info.specie,
      item_name: info.item_name,
      instruction: info.instruction,
      price: info.price,
      currency: info.currency,
      collection_date: info.collection_date.substring(0, 10),
      completion_date: info.completion_date.substring(0, 10),
      order_id: info.order_id,
      customer_name: info.customer_name,
    };
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
      render: (v) => v.toUpperCase(),
    },
    {
      title: "Customer",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    {
      title: "Collected At",
      dataIndex: "collection_date",
      key: "collection_date",
      sorter: (a: DataType, b: DataType) =>
        a.collection_date.localeCompare(b.collection_date),
      sortDirections: ["descend", "ascend"],
    },
  ];
  return (
    <div>
      <PrintableTable columns={columns} dataSource={data} />
    </div>
  );
};

export default SimpleOrderItemListWidget;
