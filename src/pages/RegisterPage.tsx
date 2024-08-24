import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import AuthContainer from "../components/Containers/AuthContainer";
import { ROUTE_LOGIN } from "../navigation/routes";

const RegisterPage = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <AuthContainer title="REGISTER">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Register
          </Button>
          <div style={{ marginTop: 20 }}>
            Do you have an account? <a href={ROUTE_LOGIN}>login now!</a>
          </div>
        </Form.Item>
      </Form>
    </AuthContainer>
  );
};

export default RegisterPage;
