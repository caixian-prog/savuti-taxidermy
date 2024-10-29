import React, { FC, useEffect, useRef, useState } from "react";
import { IBriefOrderInfo } from "../../../config/interfaces";
import { Button, Col, Popconfirm, Row } from "antd";
import { DeleteOutlined, EyeOutlined, UploadOutlined } from "@ant-design/icons";
import {
  apiDeleteOrderFile,
  apiUploadOrder,
} from "../../../services/orderService";
import { useAppContext } from "../../../context/AppContext";
interface PROPS {
  orderInfo: IBriefOrderInfo;
  onUpdateOrderInfo: Function;
}
const OrderFileViewWidget: FC<PROPS> = ({ orderInfo, onUpdateOrderInfo }) => {
  const fileList = orderInfo.order_files
    ? orderInfo.order_files.split(",").filter((x) => x != "")
    : [];
  const { showToast } = useAppContext();
  const [isBusy, setIsBusy] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const backendBaseUrl = process.env.REACT_APP_API_URL;
  //   console.log(orderInfo.order_files, { fileList });
  const onClickDelete = (url: string) => {
    if (!orderInfo.id) return;

    const newFile = fileList.filter((x) => x != url);
    onUpdateOrderInfo("order_files", newFile.join(","));
    apiDeleteOrderFile(orderInfo.id, url);
  };

  const onClickLink = (url: string) => {
    window.open(url, "_blank");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (!orderInfo.id) return;
      setIsBusy(true);
      apiUploadOrder(orderInfo.id, e.target.files[0])
        .then((res) => {
          console.log({ res });
          onUpdateOrderInfo("order_files", [...fileList, res].join(","));
          setIsBusy(false);
        })
        .catch((err) => {
          setIsBusy(false);
          showToast(err);
        });
    }
  };
  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Programmatically click the hidden input element
  };
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: 10,
        borderRadius: 10,
      }}
    >
      <Row gutter={10}>
        <Col>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }} // Hide the input element
            accept=".pdf, image/*" // Accept PDF and all image files
            onChange={handleFileChange}
          />
          <Button type="default" onClick={handleButtonClick} loading={isBusy}>
            <UploadOutlined />
            Upload Order File
          </Button>
        </Col>
        <Col>
          <div>
            {fileList.map((info, index) => {
              let fileText = info;
              fileText = fileText.replace(
                backendBaseUrl ? backendBaseUrl + "/uploads/images/" : "",
                ""
              );
              return (
                <Row
                  key={`${index}-${info}`}
                  align={"middle"}
                  gutter={5}
                  style={{
                    borderBottom: "1px dotted gray",
                    paddingBottom: 5,
                    marginTop: 10,
                  }}
                >
                  <Col className="custom-button">
                    <div
                      onClick={() => {
                        onClickLink(info);
                      }}
                    >
                      {fileText}
                    </div>
                  </Col>
                  <Col>
                    <EyeOutlined
                      style={{
                        marginLeft: 30,
                        marginRight: 20,
                        color: "blue",
                        fontSize: 20,
                      }}
                      className="custom-button"
                      onClick={() => {
                        onClickLink(info);
                      }}
                    />
                  </Col>
                  <Col>
                    <Popconfirm
                      title="Sure to delete?"
                      onConfirm={() => {
                        onClickDelete(info);
                      }}
                    >
                      <DeleteOutlined
                        className="custom-button"
                        style={{ color: "red", fontSize: 20 }}
                      />
                    </Popconfirm>
                  </Col>
                </Row>
              );
            })}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default OrderFileViewWidget;
