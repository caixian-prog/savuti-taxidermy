import {
  BackwardOutlined,
  FlagOutlined,
  MailOutlined,
  PhoneOutlined,
  SolutionOutlined,
  TruckOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Radio } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  apiCreateCustomer,
  apiGetCustomerById,
  apiUpdateCustomer,
} from "../../services/customerService";
import { ICustomerInfo } from "../../config/interfaces";
import { useAppContext } from "../../context/AppContext";
import PageLoading from "../../components/Containers/PageLoading";
import { ROUTE_CUSTOMER_LIST_PAGE } from "../../navigation/routes";

const AddNewCustomerPage: React.FC = () => {
  const navigate = useNavigate();
  const [customerType, setCustomerType] = useState(1);
  const { customerId } = useParams();
  const [customerInfo, setCustomerInfo] = useState<ICustomerInfo>();
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useAppContext();
  useEffect(() => {
    if (!customerId) return;
    setIsLoading(true);
    apiGetCustomerById(parseInt(customerId))
      .then((res) => {
        setCustomerInfo(res as ICustomerInfo);
        const _customerType = (res as ICustomerInfo).type;
        setCustomerType(
          parseInt(_customerType !== undefined ? _customerType.toString() : "0")
        );
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        showToast(err, "", "error");
        setTimeout(() => {
          navigate(-1);
        }, 500);
      });
  }, [customerId]);

  if (isLoading) {
    return <PageLoading />;
  }
  const onFinish = (values: any) => {
    if (values == undefined) return;
    let _info = !customerInfo
      ? values
      : {
          ...customerInfo,
          ...values,
        };
    _info["type"] = customerType;
    // setIsLoading(true);
    let func = apiCreateCustomer;
    if (customerId) {
      func = apiUpdateCustomer;
    }
    func(_info as ICustomerInfo)
      .then((res) => {
        showToast("Success", "", "success");
        setTimeout(() => {
          setIsLoading(false);
          navigate(ROUTE_CUSTOMER_LIST_PAGE);
        }, 300);
      })
      .catch((err) => {
        setIsLoading(false);
        showToast(err, "", "error");
      });
  };
  return (
    <div className=" bg-gray-100">
      <main className="container mx-auto p-8">
        <div>
          <Button
            type="text"
            size="large"
            onClick={() => {
              navigate(ROUTE_CUSTOMER_LIST_PAGE);
            }}
          >
            <BackwardOutlined /> Back
          </Button>
        </div>
        <Form
          layout="vertical"
          className="bg-white p-6 rounded shadow-md space-y-6"
          initialValues={
            customerInfo != undefined
              ? { ...customerInfo, type: customerType }
              : { type: customerType }
          }
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input the customer's name",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter customer's name"
            />
          </Form.Item>

          <Form.Item name="surname" label="Surname Name">
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter customer's surname"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input the customer's email",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Enter customer's email"
              type={"email"}
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Mobile Number"
            rules={[
              {
                required: true,
                message: "Please input the customer's phone number",
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Enter customer's phone number"
              type={"tel"}
            />
          </Form.Item>

          <Form.Item name="phone_alt" label="Alternative Contact Number">
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Enter customer's alternative contact number"
              type={"tel"}
            />
          </Form.Item>

          <Form.Item name="type" label="Customer Type">
            <Radio.Group
              onChange={(e) => setCustomerType(e.target.value)}
              value={customerType}
            >
              <Radio value={1}>Local</Radio>
              <Radio value={2}>Export</Radio>
            </Radio.Group>
          </Form.Item>

          {customerType == 2 && (
            <div>
              <Form.Item name="outfitter" label="Outfitter">
                <Input
                  prefix={<SolutionOutlined />}
                  placeholder="Enter customer's Outfitter"
                />
              </Form.Item>
              <Form.Item name="ph" label="PH">
                <Input
                  prefix={<SolutionOutlined />}
                  placeholder="Enter customer's PH"
                />
              </Form.Item>
              <Form.Item name="residing_country" label="Residing Country">
                <Input
                  prefix={<FlagOutlined />}
                  placeholder="Enter customer's Residing Country"
                />
              </Form.Item>
              <Form.Item name="freight_agent" label="Freight Agent">
                <Input
                  prefix={<TruckOutlined />}
                  placeholder="Enter customer's Freight Agent"
                />
              </Form.Item>
            </div>
          )}

          <Form.Item>
            <Button
              type="primary"
              className="w-[100%]"
              htmlType="submit"
              loading={isLoading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </main>
    </div>
  );
};

export default AddNewCustomerPage;
