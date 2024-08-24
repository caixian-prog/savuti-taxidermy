import React, { FC, ReactNode } from "react";
import "./AuthContainer.css";
import { Flex, Card } from "antd";
import LogoImage from "../Images/LogoImage";
interface PROPS {
  title: string;
  children: ReactNode;
}
const AuthContainer: FC<PROPS> = ({ title, children }) => {
  return (
    <Card style={{ maxWidth: 350, margin: "auto", marginTop: "10%" }}>
      <LogoImage />
      <div
        style={{
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 30,
          margin: 10,
        }}
      >
        {title}
      </div>
      <div>{children}</div>
    </Card>
  );
};

export default AuthContainer;
