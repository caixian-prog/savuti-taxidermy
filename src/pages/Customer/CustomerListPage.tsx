import React, { useEffect, useState } from "react";
import { ICustomerInfo } from "../../config/interfaces";
import {
  apiDeleteCustomer,
  apiGetCustomers,
} from "../../services/customerService";
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
import { ROUTE_ADDNEWCUSTOMERPAGE } from "../../navigation/routes";
import PageLoading from "../../components/Containers/PageLoading";

const { Search } = Input;
interface DataType {
  key: string;
  id?: number;
  name: string;
  surname?: string;
  email: string;
  phone?: string;
  country?: string;
  created: string;
}
const CustomerListPage = () => {
  const { showToast } = useAppContext();
  const [customerList, setCustomerList] = useState<ICustomerInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    apiGetCustomers()
      .then((res) => {
        setLoading(false);
        const _customers = res as ICustomerInfo[];
        setCustomerList(_customers);
      })
      .catch((err) => {
        showToast(err, "", "error");
        setLoading(false);
      });
  }, []);

  if (loading) return <PageLoading />;

  const data: DataType[] = customerList.map((info) => {
    return {
      key: `customer-${info.id}`,
      id: info.id,
      name: info.name,
      surname: info.surname,
      email: info.email,
      phone: info.phone,
      country: info.residing_country,
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: DataType, b: DataType) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      //   width: "20%",
      sorter: (a: DataType, b: DataType) => a.email.localeCompare(b.email),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      //   width: "20%",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      //   width: "20%",
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
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => {
                onClickDelete(data);
              }}
            >
              <div className="text-red-600 custom-button">
                <DeleteOutlined /> &nbsp; Delete{" "}
              </div>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const onSearch = (e: any) => {
    setKeyword(e.toLowerCase());
  };
  const onClickDelete = (item: DataType) => {
    const index = customerList.findIndex((x) => x.id == item.id);
    if (!index) return;
    let tmpCustomer = [...customerList];
    tmpCustomer.splice(index, 1);
    setCustomerList(tmpCustomer);
    if (item.id) apiDeleteCustomer(item.id);
  };
  const onClickEdit = (item: DataType) => {
    navigate(ROUTE_ADDNEWCUSTOMERPAGE + "/" + item.id);
  };
  const filtered =
    keyword == ""
      ? data
      : data.filter((info) => info.name?.toLowerCase()?.includes(keyword));
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
              navigate(ROUTE_ADDNEWCUSTOMERPAGE);
            }}
          >
            Add New Customer
          </Button>
        </Col>
      </Row>

      <Table columns={columns} dataSource={filtered} />
    </div>
  );
};

export default CustomerListPage;
