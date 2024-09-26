import { Spin } from "antd";
import React from "react";

const PageLoading = () => {
  return (
    <div className="w-[100%]">
      <div className="m-auto pt-[30%] text-center">
        <Spin size={"large"} />
      </div>
    </div>
  );
};

export default PageLoading;
