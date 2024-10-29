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
import CustomerListWidget from "../../components/CustomerListWidget";

const { Search } = Input;

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

  const onSearch = (e: any) => {
    setKeyword(e.toLowerCase());
  };

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
      <CustomerListWidget
        customerList={customerList}
        setCustomerList={setCustomerList}
        keyword={keyword}
      />
    </div>
  );
};

export default CustomerListPage;
