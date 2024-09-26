import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { ROUTE_DASHBOARD, ROUTE_HOMEPAGE } from "../../navigation/routes";
import { useNavigate } from "react-router-dom";
import { menuItems } from "../../config/constants";

const { Header, Content, Footer, Sider } = Layout;
const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarColor: "unset",

  background: "#1e1e1e",
};

const menuList: MenuProps["items"] = menuItems.map((value) => ({
  ...value,
  icon: React.createElement(value.icon),
}));
interface SiderProps {
  pathname: string;
}

const MainSidebar: React.FC<SiderProps> = ({ pathname }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  let selKey = menuItems.find(
    (x) => x.key != ROUTE_HOMEPAGE && pathname.includes(x.key)
  )?.key;

  return (
    <Sider
      style={siderStyle}
      // collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="custom-sider"
    >
      <div className="pb-7">
        <img
          src="/logo192.png"
          className="w-[80px] h-[80px] mt-7 m-auto cursor-pointer"
          onClick={() => {
            navigate(ROUTE_HOMEPAGE);
          }}
        />
      </div>
      <Menu
        className="custom-menu"
        // theme="dark"
        style={{ backgroundColor: "#1e1e1e" }}
        mode="inline"
        defaultSelectedKeys={[selKey ? selKey : ROUTE_HOMEPAGE]}
        selectedKeys={[selKey ? selKey : ROUTE_HOMEPAGE]}
        items={menuList}
        onClick={(itemInfo) => {
          navigate(itemInfo.key);
        }}
      />
    </Sider>
  );
};

export default MainSidebar;
