import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_ORDERDETAILPAGE } from "../navigation/routes";
import { Table, TableColumnsType } from "antd";
import { EditOutlined } from "@ant-design/icons";

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

const OrderItemListWidget: FC<PROPS> = ({ dataList = [] }) => {
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
    };
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "Qty",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Specie",
      dataIndex: "specie",
      key: "specie",
      sorter: (a: DataType, b: DataType) => a.specie.localeCompare(b.specie),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Items",
      dataIndex: "item_name",
      key: "item_name",
      sorter: (a: DataType, b: DataType) =>
        a.item_name.localeCompare(b.item_name),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Instruction",
      dataIndex: "instruction",
      key: "instruction",
      sorter: (a: DataType, b: DataType) =>
        a.instruction.localeCompare(b.instruction),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Price",
      dataIndex: "instruction",
      key: "instruction",
      render: (item, data) => {
        return data["currency"] + " " + data["price"];
      },
    },
    {
      title: "Collected At",
      dataIndex: "collection_date",
      key: "collection_date",
      sorter: (a: DataType, b: DataType) =>
        a.collection_date.localeCompare(b.collection_date),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Completed At",
      dataIndex: "completion_date",
      key: "completion_date",
      sorter: (a: DataType, b: DataType) =>
        a.completion_date.localeCompare(b.completion_date),
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

export default OrderItemListWidget;
