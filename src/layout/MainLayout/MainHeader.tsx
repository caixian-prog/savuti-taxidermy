import React from "react";
import { Layout, Button, Typography, Space, Row, Col } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ROUTE_HOMEPAGE, ROUTE_LOGIN } from "../../navigation/routes";
import { menuItems } from "../../config/constants";
import Icon from "@ant-design/icons";

const { Text } = Typography;

const { Header, Content, Footer, Sider } = Layout;

interface HeaderProps {
  username?: string;
  pathname: string;
}

const MainHeader: React.FC<HeaderProps> = ({ username, pathname }) => {
  const navigate = useNavigate();
  const onSignOut = () => [navigate(ROUTE_LOGIN)];
  let pageInfo = menuItems.find(
    (x) => x.key != ROUTE_HOMEPAGE && pathname.includes(x.key)
  );
  pageInfo = !pageInfo ? menuItems[0] : pageInfo;
  return (
    <Header className="bg-[#1e1e1e] flex justify-between items-center p-4">
      <Row gutter={5}>
        <Col className="text-white text-2xl font-semibold">
          {pageInfo && React.createElement(pageInfo.icon)}
        </Col>
        <Col className="text-white text-2xl font-semibold">
          {pageInfo?.label}
        </Col>
      </Row>

      <div className="flex items-center space-x-4">
        <Text className="text-white text-lg">
          <UserOutlined />
          {username}
        </Text>
        <Button
          type="primary"
          shape="round"
          icon={<LogoutOutlined />}
          onClick={onSignOut}
        >
          Sign Out
        </Button>
      </div>
    </Header>
  );
};

export default MainHeader;
