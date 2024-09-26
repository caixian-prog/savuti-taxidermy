import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import {
  Spin,
  Table,
  Input,
  TableColumnsType,
  Popconfirm,
  Row,
  Col,
  Button,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import PageLoading from "../../components/Containers/PageLoading";

import { IBriefOrderInfo } from "../../config/interfaces";
import { apiGetOrderList } from "../../services/orderService";
import { ROUTE_ORDERDETAILPAGE } from "../../navigation/routes";

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

const OrderListPage: React.FC = () => {
  const { showToast } = useAppContext();
  const [orderList, setOrderList] = useState<IBriefOrderInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    apiGetOrderList()
      .then((res) => {
        setLoading(false);
        const _outfitters = res as IBriefOrderInfo[];
        setOrderList(_outfitters);
      })
      .catch((err) => {
        showToast(err, "", "error");
        setLoading(false);
      });
  }, []);

  if (loading) return <PageLoading />;

  const data: DataType[] = orderList.map((info) => {
    return {
      key: `order-${info.id}`,
      id: info.id,
      customer_name: info.customer_name,
      order_date: info.order_date.substring(0, 10),
      deposit_amount: info.deposit_amount,
      currency: info.currency,
      type: `${info.type}`,
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
    // {
    //   title: "Completion Date",
    //   dataIndex: "completion_date",
    //   key: "completion_date",
    // },
    // {
    //   title: "Collection Date",
    //   dataIndex: "collection_date",
    //   key: "collection_date",
    // },
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

  const onSearch = (e: any) => {
    setKeyword(e.toLowerCase());
  };
  const onClickDelete = (item: DataType) => {
    const index = orderList.findIndex((x) => x.id == item.id);
    if (index == undefined) return;
    console.log(index, item);
    let tmpOutfitter = [...orderList];
    tmpOutfitter.splice(index, 1);
    setOrderList(tmpOutfitter);
    // if (item.id) apiDeleteOutfitter(item.id);
  };
  const onClickEdit = (item: DataType) => {
    navigate(ROUTE_ORDERDETAILPAGE + "/" + item.id);
  };
  const filtered =
    keyword == ""
      ? data
      : data.filter((info) =>
          info.customer_name?.toLowerCase()?.includes(keyword)
        );
  return (
    <div>
      <Row gutter={1} align={"middle"} className="mb-[20px]">
        <Col span={16}>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </Col>
        <Col span={8} className="text-right">
          <Button
            type={"primary"}
            onClick={() => {
              navigate(ROUTE_ORDERDETAILPAGE);
            }}
          >
            Add New Order
          </Button>
        </Col>
      </Row>

      <Table columns={columns} dataSource={filtered} />
    </div>
  );
};

export default OrderListPage;
