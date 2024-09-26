import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { notification, Button, Checkbox, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import AuthContainer from "../components/Containers/AuthContainer";
import { ROUTE_HOMEPAGE, ROUTE_REGISTER } from "../navigation/routes";
import { useAuthContext } from "../context/AuthContext";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { signIn, signOut } = useAuthContext();
  const { showToast, setIsBusy } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    signOut();
  }, []);

  const onFinish = (values: any) => {
    setIsBusy(true);
    const { email, password } = values;
    signIn(email, password)
      .then((res) => {
        setIsBusy(false);
        setTimeout(() => {
          navigate(ROUTE_HOMEPAGE);
        }, 100);
      })
      .catch((err) => {
        showToast(err, "", "error");
        setIsBusy(false);
      });
  };
  return (
    <AuthContainer title="LOGIN">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
            type="email"
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
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          {/* <div style={{ marginTop: 20 }}>
            Or <a href={ROUTE_REGISTER}>register now!</a>
          </div> */}
        </Form.Item>
      </Form>
    </AuthContainer>
  );
};

export default LoginPage;
