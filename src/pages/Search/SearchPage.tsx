import React, { useState } from "react";
import { Button, Input, Radio, Table, TableColumnsType } from "antd";
import { apiSearchOrders } from "../../services/searchService";
import { useAppContext } from "../../context/AppContext";
import { EditOutlined } from "@ant-design/icons";
import { IBriefOrderInfo } from "../../config/interfaces";
import { ROUTE_ORDERDETAILPAGE } from "../../navigation/routes";
import { useNavigate } from "react-router-dom";

const { Search } = Input;
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
const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [orderList, setOrderList] = useState<IBriefOrderInfo[]>([]);

  const [searchType, setSearchType] = useState<1 | 2>(1);
  const [keyword, setKeyword] = useState("");
  const onChangeSearchType = (v: any) => {
    setSearchType(v);
  };
  const onClickSearch = () => {
    console.log(keyword);
    setLoading(true);
    apiSearchOrders(keyword, searchType)
      .then((res) => {
        setOrderList(res as IBriefOrderInfo[]);
        setLoading(false);
      })
      .catch((err) => {
        showToast(err);
        setLoading(false);
      });
  };

  const data: DataType[] = orderList.map((info) => {
    return {
      key: `order-${info.id}`,
      id: info.id,
      customer_name: info.customer_name,
      order_date: info.order_date,
      deposit_amount: info.deposit_amount,
      currency: info.currency,
      type: `${info.type}`,
      completion_date: info.completion_date?.substring(0, 10),
      collection_date: info.collection_date?.substring(0, 10),
      created: info.created.substring(0, 10),
    };
  });

  const onClickEdit = (item: DataType) => {
    navigate(ROUTE_ORDERDETAILPAGE + "/" + item.id);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      //   width: "5%",
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
      title: "Status",
      dataIndex: "type",
      key: "type",
      //   width: "20%",
    },
    {
      title: "Completion Date",
      dataIndex: "completion_date",
      key: "completion_date",
    },
    {
      title: "Collection Date",
      dataIndex: "collection_date",
      key: "collection_date",
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
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-[20px]">
      <div>
        <Radio.Group
          onChange={(e) => onChangeSearchType(e.target.value)}
          value={searchType}
        >
          <Radio value={1}>Name/Surname/Contact Mobile</Radio>
          <Radio value={2}>Order Number</Radio>
        </Radio.Group>
      </div>

      <div className="mt-[20px]">
        <Search
          className="max-w-[700px]"
          placeholder={
            searchType == 1
              ? "Input keyword for Name/Surname/Contact Mobile"
              : "Input keyword for Order number"
          }
          allowClear
          enterButton="Search"
          size="large"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onPressEnter={onClickSearch}
          onSearch={onClickSearch}
          loading={loading}
        />
      </div>

      <div>
      <div className="mt-[20px]">
          <Button
            type={"primary"}
            onClick={() => {
              navigate(ROUTE_ORDERDETAILPAGE);
            }}
          >
            Add New Order
          </Button>
        </div>
        <div className="mt-[10px]">
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
