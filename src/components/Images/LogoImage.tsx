import React from "react";

const LogoImage = () => {
  return (
    <div style={{textAlign:'center'}}>
      <img
        src={"logo.png"}
        className="App-logo"
        style={{ width: 70, height: 70, margin: "auto" }}
        alt="logo"
      />
    </div>
  );
};

export default LogoImage;
