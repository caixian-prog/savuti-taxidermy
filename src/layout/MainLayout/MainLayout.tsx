import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UpOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { FloatButton, Layout, Menu, theme } from "antd";
import MainSidebar from "./MainSidebar";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import { Outlet, useLocation } from "react-router-dom";
import { BackTop } from "antd";
import { useAppContext } from "../../context/AppContext";
import { useAuthContext } from "../../context/AuthContext";

const { Header, Content, Footer, Sider } = Layout;

function MainLayout() {
  const [pathname, setPathname] = useState<string>("/");
  const { userInfo } = useAuthContext();
  const location = useLocation();
  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);
  return (
    <Layout hasSider>
      <MainSidebar pathname={pathname} />

      <Layout style={{ marginInlineStart: 200, minHeight:"100vh" }}>
        <MainHeader username={userInfo?.name} pathname={pathname} />
        <Content style={{ margin: "24px 16px 0", overflow: "initial"}}>
          <Outlet />

          <FloatButton.BackTop
            visibilityHeight={400}
            className="custom-backtop"
            icon={<UpOutlined style={{ fontSize: "16px", color: "white" }} />}
          />
        </Content>
        <MainFooter />
      </Layout>
    </Layout>
  );
}

export default MainLayout;
