import React, { FC } from "react";
import { IBriefOrderInfo, IOrderItemInfo } from "../../../config/interfaces";
import { Checkbox, Col, Input, Row } from "antd";

const { TextArea } = Input;

interface PROPS {
  is_new: boolean;
  orderInfo: IBriefOrderInfo;
  itemList: IOrderItemInfo[];
  setOrderInfo: Function;
  setItemList: Function;
}
const EtcRelWidget: FC<PROPS> = ({
  is_new,
  orderInfo,
  itemList,
  setOrderInfo,
  setItemList,
}) => {
  return (
    <div>
      <div>
        <div className="font-semibold">Write your notes about this order:</div>

        <TextArea
          className="w-[100%]"
          placeholder="Enter your notes"
          autoSize={{ minRows: 2, maxRows: 6 }}
          maxLength={1024}
          showCount={true}
          value={orderInfo.notes}
          onChange={(e) => setOrderInfo("notes", e.target.value)}
        />
      </div>

      <div className="mt-[20px]">
        <div className="font-bold">Flatskin status:</div>
        <Row justify={"space-around"}>
          <Col>
            <Checkbox
              checked={orderInfo.flatskin_paid == 1}
              onChange={(e) => setOrderInfo("flatskin_paid", e.target.checked)}
            >
              Flatskins Paid
            </Checkbox>
          </Col>
          <Col>
            <Checkbox
              checked={orderInfo.flatskin_sent == 1}
              onChange={(e) => setOrderInfo("flatskin_sent", e.target.checked)}
            >
              Flatskins Send to Tannery
            </Checkbox>
          </Col>
        </Row>
      </div>

      <div className="mt-[20px]">
        <Checkbox
          checked={orderInfo.paperwork == 1}
          onChange={(e) => setOrderInfo("paperwork", e.target.checked)}
        >
          <div className="font-bold">Paper work received:</div>
        </Checkbox>
      </div>
    </div>
  );
};

export default EtcRelWidget;
