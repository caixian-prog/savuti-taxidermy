import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IUserInfo } from "../../config/interfaces";
import { useAppContext } from "../../context/AppContext";
import { apiGetUserById } from "../../services/userService";
import PageLoading from "../../components/Containers/PageLoading";
import { ROUTE_USERLISTPAGE } from "../../navigation/routes";
import {
  BackwardOutlined,
  KeyOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import { apiCreateCustomer } from "../../services/customerService";
import { apiRegister } from "../../services/authService";

const AddUserPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useAppContext();

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    apiGetUserById(parseInt(id))
      .then((res) => {
        setUserInfo(res as IUserInfo);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        showToast(err, "", "error");
        setTimeout(() => {
          navigate(-1);
        }, 500);
      });
  }, [id]);

  if (isLoading) return <PageLoading />;
  const onFinish = (values: any) => {
    // console.log(values);
    const { name, email, phone, password, role } = values;
    apiRegister(name, email, phone, password, role)
      .then((res) => {
        showToast("Success", "", "success");
        setTimeout(() => {
          setIsLoading(false);
          navigate(ROUTE_USERLISTPAGE);
        }, 300);
      })
      .catch((err) => {
        setIsLoading(false);
        showToast(err, "", "error");
      });
  };
  return (
    <>
      <div className=" bg-gray-100">
        <main className="container mx-auto p-8">
          <div>
            <Button
              type="text"
              size="large"
              onClick={() => {
                navigate(ROUTE_USERLISTPAGE);
              }}
            >
              <BackwardOutlined /> Back
            </Button>
          </div>

          <Form
            layout="vertical"
            className="bg-white p-6 rounded shadow-md space-y-6"
            initialValues={userInfo != undefined ? { ...userInfo } : {}}
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input the user's name",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter user's name"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please input the user's email",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Enter user's email"
                type={"email"}
              />
            </Form.Item>

            <Form.Item name="phone" label="Phone number">
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Enter user's phone number"
                type={"tel"}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input the user's password",
                },
              ]}
            >
              <Input
                prefix={<KeyOutlined />}
                placeholder="Enter user's password"
              />
            </Form.Item>

            <Form.Item
              name="role"
              label="Role"
              rules={[
                {
                  required: true,
                  message: "Please input the user's role",
                },
              ]}
            >
              <Select
                optionFilterProp="label"
                placeholder="Select a role"
                options={[
                  { label: "employee", value: 1 },
                  { label: "manager", value: 5 },
                  { label: "admin", value: 10 },
                ]}
              ></Select>
            </Form.Item>

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
    </>
  );
};

export default AddUserPage;
