import React, { FC, useEffect, useState } from "react";
import { Table, Input, Button, Select, DatePicker, Popconfirm } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import {
  apiDeleteOrderItem,
  apiGenerateItemId,
  apiGetSpecieList,
} from "../../../services/orderService";
import dayjs from "dayjs";
import { dateFormat } from "../../../config/constants";
import { IBriefOrderInfo, IOrderItemInfo } from "../../../config/interfaces";
const { Option } = Select;

interface PROPS {
  is_new: boolean;
  orderInfo: IBriefOrderInfo;
  itemList: IOrderItemInfo[];
  setOrderInfo: Function;
  setItemList: Function;
}
const OrderItemWidget: FC<PROPS> = ({
  is_new,
  orderInfo,
  itemList,
  setOrderInfo,
  setItemList,
}) => {
  // const [dataSource, setDataSource] = useState<IOrderItemInfo[]>([]);
  const [specieList, setSpecieList] = useState<string[]>([]);

  useEffect(() => {
    apiGetSpecieList().then((res) => {
      setSpecieList(res as string[]);
    });
  }, []);

  const handleAddRow = () => {
    const newRow: IOrderItemInfo = {
      id: itemList.length == 0 ? 1 : Math.max(...itemList.map((o) => o.id)) + 1,
      specie: "",
      item_name: "",
      instruction: "",
      quantity: 1,
      price: 0,
      currency: orderInfo.currency,
      completion_date: "",
      collection_date: "",
      is_new: true,
    };
    setItemList([...itemList, newRow]);
  };
  const handleDeleteRow = (id: number) => {
    setItemList(itemList.filter((row) => row.id !== id));

    apiDeleteOrderItem(id);
  };

  const handleSelectChange = (id: number, field: string, value: any) => {
    const newData = [...itemList];
    const index = newData.findIndex((item) => item.id === id);
    if (index > -1) {
      newData[index] = { ...newData[index], [field]: value };
      setItemList(newData);
    }
  };

  const columns = [
    {
      title: "Qty",
      dataIndex: "quantity",
      key: "quantity",
      render: (text: number, record: IOrderItemInfo) => (
        <Input
          type="number"
          value={text}
          onChange={(e) =>
            handleSelectChange(
              record.id,
              "quantity",
              parseFloat(e.target.value)
            )
          }
          className="w-full"
        />
      ),
    },
    {
      title: "Specie",
      dataIndex: "specie",
      key: "specie",
      render: (text: string, record: IOrderItemInfo) => (
        <Select
          value={text}
          onChange={(value) => handleSelectChange(record.id, "specie", value)}
          className="w-full min-w-[150px]"
          placeholder="Select Specie"
        >
          {specieList.map((specie) => (
            <Option key={specie} value={specie}>
              {specie}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Item received",
      dataIndex: "item_name",
      key: "item_name",
      render: (text: string, record: IOrderItemInfo) => (
        <Input
          onChange={(e) =>
            handleSelectChange(record.id, "item_name", e.target.value)
          }
          value={text}
          placeholder="Enter items"
        />
      ),
    },
    {
      title: "Instruction",
      dataIndex: "instruction",
      key: "instruction",
      render: (text: string, record: IOrderItemInfo) => (
        <Input
          value={text}
          onChange={(e) =>
            handleSelectChange(record.id, "instruction", e.target.value)
          }
          placeholder="Enter instruction"
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text: string, record: IOrderItemInfo) => (
        <Input
          type="number"
          prefix={orderInfo.currency}
          required={true}
          value={parseFloat(text)}
          onChange={(e) =>
            handleSelectChange(record.id, "price", parseFloat(e.target.value))
          }
          className="w-full"
        />
      ),
    },
    {
      title: "Collected At",
      dataIndex: "collection_date",
      key: "collection_date",
      render: (text: string, record: IOrderItemInfo) => (
        <DatePicker
          format={dateFormat}
          defaultValue={text ? dayjs(text, dateFormat) : ""}
          onChange={(value, label) => {
            if (!value) return;
            handleSelectChange(
              record.id,
              "collection_date",
              typeof value === "string" ? value : value.format(dateFormat)
            );
          }}
        />
      ),
    },
    {
      title: "Completed At",
      dataIndex: "completion_date",
      key: "completion_date",
      render: (text: string, record: IOrderItemInfo) => (
        <DatePicker
          format={dateFormat}
          defaultValue={text ? dayjs(text, dateFormat) : ""}
          onChange={(value, label) => {
            if (!value) return;
            handleSelectChange(
              record.id,
              "completion_date",
              typeof value === "string" ? value : value.format(dateFormat)
            );
          }}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: IOrderItemInfo) =>
        itemList.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => {
              handleDeleteRow(record.id);
            }}
          >
            <Button type="link" icon={<MinusOutlined />} />
          </Popconfirm>
        ) : null,
    },
  ];

  return (
    <div className="p-4">
      <Table
        dataSource={itemList.map((x) => ({ ...x, key: x.id }))}
        columns={columns}
        pagination={false}
        rowKey="key"
      />
      <Button
        type="dashed"
        onClick={handleAddRow}
        icon={<PlusOutlined />}
        className="mt-4"
      >
        Add Item
      </Button>
    </div>
  );
};

export default OrderItemWidget;
