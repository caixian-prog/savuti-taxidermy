import { Checkbox, Col, Input, Row, Select, Typography } from "antd";
import React, { FC, useEffect } from "react";
import { IBriefOrderInfo, IOrderItemInfo } from "../../../config/interfaces";
import EtcRelWidget from "./EtcRelWidget";
import { useAppContext } from "../../../context/AppContext";
const { Text } = Typography;
const { Option } = Select;
interface PROPS {
  is_new: boolean;
  orderInfo: IBriefOrderInfo;
  itemList: IOrderItemInfo[];
  setOrderInfo: Function;
  setItemList: Function;
}

const PaymentRelWidget: FC<PROPS> = ({
  is_new,
  orderInfo,
  itemList,
  setOrderInfo,
  setItemList,
}) => {
  const { showToast } = useAppContext();
  const subTotal = itemList.reduce(
    (a: number, b: IOrderItemInfo) => a + b.price,
    0
  );
  const vat = (subTotal / 100) * 15;
  const total = subTotal + vat;
  const outstanding =
    orderInfo.deposit_amount - total + parseFloat(`${orderInfo.discount}`);
  useEffect(() => {
    console.log("outstanding:", outstanding);
    setOrderInfo("outstanding", outstanding);
  }, [itemList, orderInfo.deposit_amount, orderInfo.discount]);
  console.log(orderInfo.deposit_amount - total, outstanding);
  return (
    <div>
      <Row gutter={5} justify={"space-between"}>
        <Col xs={23} sm={11} md={7}>
          <EtcRelWidget
            is_new={is_new}
            orderInfo={orderInfo}
            itemList={itemList}
            setOrderInfo={setOrderInfo}
            setItemList={setItemList}
          />
        </Col>
        <Col xs={23} sm={11} md={7}>
          <Row align={"middle"}>
            <Col xs={13}>Currency:</Col>
            <Col xs={10}>
              <Select
                value={orderInfo.currency}
                className="w-[120px]"
                onChange={(e) => setOrderInfo("currency", e)}
              >
                <Option value="R">ZAR (R)</Option>
                <Option value="$">USD ($)</Option>
              </Select>
            </Col>
          </Row>
          <Row align={"middle"}>
            <Col xs={13}>Deposit Recieved: </Col>
            <Col xs={10}>
              <Input
                prefix={orderInfo.currency}
                className="w-[120px]"
                type="number"
                value={orderInfo.deposit_amount}
                onChange={(e) =>
                  setOrderInfo("deposit_amount", parseFloat(e.target.value))
                }
              />
            </Col>
          </Row>
          <Row align={"middle"}>
            <Col xs={13}>Outstanding Balance: </Col>
            <Col xs={10}>
              <Input
                prefix={orderInfo.currency}
                className="w-[120px]"
                type="number"
                value={outstanding}
                disabled
              />
            </Col>
          </Row>
        </Col>
        <Col xs={23} sm={11} md={7}>
          <Row align={"middle"}>
            <Col xs={14}>Subtotal</Col>
            <Col xs={10}>
              <Input
                type="number"
                prefix={orderInfo.currency}
                disabled
                value={subTotal}
              />
            </Col>
          </Row>
          <Row align={"middle"}>
            <Col xs={14}>15% VAT</Col>
            <Col xs={10}>
              <Input
                type="number"
                disabled
                prefix={orderInfo.currency}
                value={vat}
              />
            </Col>
          </Row>
          <Row align={"middle"}>
            <Col xs={14}>Total</Col>
            <Col xs={10}>
              <Input
                type="number"
                prefix={orderInfo.currency}
                value={total.toFixed(2)}
                disabled
              />
            </Col>
          </Row>
          <Row align={"middle"}>
            <Col xs={14}>Less discount</Col>
            <Col xs={10}>
              <Input
                prefix={orderInfo.currency}
                value={orderInfo.discount}
                type="number"
                onChange={(e) =>
                  setOrderInfo("discount", parseFloat(e.target.value))
                }
              />
            </Col>

            <Col xs={24}>
              <div className="mt-[40px] text-right">
                <Checkbox
                  checked={orderInfo.type == 10}
                  onChange={(e) => {
                    let error = "";
                    // check order has items
                    if (itemList.length == 0) error = "There's no items.";

                    // check all items are completed
                    if (
                      itemList.find(
                        (x) =>
                          !x.completion_date ||
                          x.completion_date.substring(0, 10) == "0000-00-00"
                      )
                    ) {
                      error = "All items should be completed.";
                    }

                    // check flatskin completed
                    if (orderInfo.flatskin_sent != 1) {
                      error = "Flatskin is not finished yet.";
                    }

                    // check balance
                    if (outstanding < 0) {
                      error = "Please check outstanding payment.";
                    }

                    if (error != "") {
                      showToast("Error!", error, "error");
                      return;
                    }
                    setOrderInfo("type", 10);
                  }}
                >
                  <div className="font-bold text-2xl text-green-700">
                    Set Order Paid
                  </div>
                </Checkbox>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default PaymentRelWidget;
