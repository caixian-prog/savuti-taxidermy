import React from "react";
import { SITE_BASE } from "../../config/constants";

const LogoImage = () => {
  console.log(process.env.ROUTER_BASE)
  return (
    <div style={{textAlign:'center'}}>
      <img
        src={SITE_BASE+"/logo.png"}
        className="App-logo"
        style={{ width: 70, height: 70, margin: "auto" }}
        alt="logo"
      />
    </div>
  );
};

export default LogoImage;
