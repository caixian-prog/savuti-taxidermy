import React from "react";
import { Outlet } from "react-router-dom";
import AuthFooter from "../layout/AuthFooter";
import { Flex, Layout } from "antd";

const { Footer, Content } = Layout;

const layoutStyle = {
  height: "100vh",
  background: "transparent",
};

const AuthCommonRoute = () => {
  return (
    <Layout style={layoutStyle}>
      <Content>
        <Outlet />
      </Content>
      <Footer style={{ background: "transparent" }}>
        <AuthFooter />
      </Footer>
    </Layout>
  );
};

export default AuthCommonRoute;
