import React, { useEffect, useState } from "react";
import OrderItemWidget from "./widgets/OrderItemWidget";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Col, DatePicker, Row, Select, Form, Button } from "antd";
import dayjs from "dayjs";
import { dateFormat } from "../../config/constants";
import PaymentRelWidget from "./widgets/PaymentRelWidget";
import {
  IBriefOrderInfo,
  ICustomerInfo,
  IFreightAgentInfo,
  IOrderItemInfo,
  IOutfitterInfo,
} from "../../config/interfaces";
import { apiGetCustomers } from "../../services/customerService";
import { useAppContext } from "../../context/AppContext";
import {
  apiCreateOrder,
  apiCreatePdf,
  apiGetItemsOfOrder,
  apiGetOrderById,
  apiUpdateOrder,
} from "../../services/orderService";
import { PrinterOutlined, SendOutlined } from "@ant-design/icons";
import { ROUTE_ORDERLISTPAGE } from "../../navigation/routes";
import { apiGetAgents } from "../../services/agentService";
import { apiGetOutfitters } from "../../services/outfitterService";
import { USERTYPE } from "../../config/types";

const NewOrderPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const is_new = id == undefined;
  const [customerList, setCustomerList] = useState<ICustomerInfo[]>([]);
  const [agentList, setAgentList] = useState<IFreightAgentInfo[]>([]);
  const [outfitterList, setOutfitterList] = useState<IOutfitterInfo[]>([]);

  const [orderInfo, setOrderInfo] = useState<IBriefOrderInfo>({
    customer_id: 0,
    customer_name: "",
    order_date: dayjs().format("YYYY-MM-DD"),
    deposit_amount: 0,
    outstanding: 0,
    vat: 0,
    currency: "R",
    discount: 0,
    notes: "",
    type: 0,
    completion_date: "",
    collection_date: "",
    paperwork: 0,
    created: "",
    is_del: 0,
    flatskin_paid: 0,
    flatskin_sent: 0,
  });
  const [itemList, setItemList] = useState<IOrderItemInfo[]>([]);

  useEffect(() => {
    apiGetCustomers()
      .then((res) => {
        setCustomerList(res as ICustomerInfo[]);

        if (!is_new) {
          apiGetOrderById(id)
            .then((res) => {
              setOrderInfo(res as IBriefOrderInfo);
            })
            .catch((err) => {
              showToast(err, "", "error");
            });
          apiGetItemsOfOrder(id)
            .then((res) => {
              setItemList(
                (res as IOrderItemInfo[]).map((x) => {
                  return {
                    ...x,
                    price: parseFloat(`${x.price}`),
                  };
                })
              );
            })
            .catch((err) => {
              showToast(err, "", "error");
            });
        }
      })
      .catch((err) => {
        showToast(err, "", "error");
      });

    apiGetAgents().then((res) => {
      setAgentList(res as IFreightAgentInfo[]);
    });
    apiGetOutfitters().then((res) => {
      setOutfitterList(res as IOutfitterInfo[]);
    });
  }, []);

  const customerInfo = customerList.find((x) => x.id == orderInfo.customer_id);
  const agentInfo = agentList.find((x) => x.id == orderInfo.agent_id);
  const outfitterInfo = outfitterList.find((x) => x.id == orderInfo?.id);

  const onChange = (date: dayjs.Dayjs | null, dateString: any) => {
    if (!date) return;
    onUpdateOrderInfo(
      "order_date",
      typeof date === "string" ? date : date.format(dateFormat)
    );
  };

  const onUpdateOrderInfo = (field: string, value: any) => {
    // console.log(field, " : ", value);
    setOrderInfo({
      ...orderInfo,
      [field]: value,
    });
  };

  const manageOrder = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      console.log(orderInfo, itemList);
      if (itemList.length == 0) {
        showToast("Warning!", "Please add at least one order item", "warning");
        reject("order empty error");
      }
      if (is_new) {
        apiCreateOrder(orderInfo, itemList)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            showToast(err, "", "error");
            reject(err);
          });
      } else {
        apiUpdateOrder(orderInfo, itemList)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            showToast(err, "", "error");
            reject(err);
          });
      }
    });
  };

  const onClickSendCustomer = () => {
    manageOrder()
      .then((res) => {
        apiCreatePdf(res["order_id"], 1).then((res) => {
          showToast("Successfully sent to the customer");
          navigate(ROUTE_ORDERLISTPAGE);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onClickCopyOrder = () => {
    manageOrder()
      .then((res) => {
        apiCreatePdf(res["order_id"], 0).then((res) => {
          window.open(res as string, "_blank");
        });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="text-center font-bold text-3xl">
        {is_new ? "New Order" : "Order information"}
      </div>
      <Form>
        <div className="mt-[20px] mb-[10px] max-w-[1000px] m-auto">
          <Row justify={"space-between"}>
            <Col>
              {is_new ? (
                <div>
                  <Form.Item
                    label="Customer"
                    name="customer_id"
                    rules={[{ required: true }]}
                  >
                    <Select
                      style={{ width: 150 }}
                      onSelect={(v, l) => {
                        setOrderInfo({
                          ...orderInfo,
                          customer_id: v,
                          customer_name: l.label,
                        });
                      }}
                      options={customerList.map((info) => {
                        return {
                          value: info.id,
                          label: info.name + " " + info.surname,
                        };
                      })}
                    />
                  </Form.Item>
                  {customerInfo?.type == 2 && (
                    <Form.Item
                      label="Freight Agent"
                      name="agent_id"
                      rules={[{ required: true }]}
                    >
                      <Select
                        style={{ width: 150 }}
                        onSelect={(v, l) => {
                          setOrderInfo({
                            ...orderInfo,
                            agent_id: v,
                            agent_name: l.label,
                          });
                        }}
                        options={agentList.map((info) => {
                          return {
                            value: info.id,
                            label: info.name,
                          };
                        })}
                      />
                    </Form.Item>
                  )}
                  <Form.Item
                    label="Outfitter"
                    name="outfitter_id"
                    rules={[{ required: true }]}
                  >
                    <Select
                      style={{ width: 150 }}
                      onSelect={(v, l) => {
                        setOrderInfo({
                          ...orderInfo,
                          outfitter_id: v,
                          outfitter_name: l.label,
                        });
                      }}
                      options={outfitterList.map((info) => {
                        return {
                          value: info.id,
                          label: info.name,
                        };
                      })}
                    />
                  </Form.Item>
                </div>
              ) : (
                <div>
                  <div>
                    Customer:{" "}
                    <strong>
                      {customerInfo?.name + " " + customerInfo?.surname}
                    </strong>
                  </div>
                  {customerInfo?.type == 2 && (
                    <div>
                      FREIGHT AGENT: <strong>{orderInfo.agent_name}</strong>
                    </div>
                  )}
                  <div>
                    Outfitter/PH: <strong>{orderInfo.outfitter_name}</strong>
                  </div>
                </div>
              )}
            </Col>
            <Col>
              {is_new ? (
                <Form.Item
                  label="Date"
                  name="order_date"
                  rules={[{ required: true }]}
                >
                  <DatePicker
                    value={dayjs(orderInfo.order_date, dateFormat)}
                    format={dateFormat}
                    onChange={onChange}
                  />
                </Form.Item>
              ) : (
                <div>
                  Order Date:{" "}
                  <strong>{orderInfo.order_date.substring(0, 10)}</strong>
                </div>
              )}
            </Col>
            <Col>
              Order Number: <strong>{is_new ? "Auto generate" : id}</strong>
            </Col>
          </Row>
        </div>
        <OrderItemWidget
          is_new={is_new}
          orderInfo={orderInfo}
          itemList={itemList}
          setOrderInfo={onUpdateOrderInfo}
          setItemList={setItemList}
        />
        <PaymentRelWidget
          is_new={is_new}
          orderInfo={orderInfo}
          itemList={itemList}
          setOrderInfo={onUpdateOrderInfo}
          setItemList={setItemList}
        />

        <Row className="mt-5" justify={"space-around"}>
          <Col>
            <Form.Item label=" " colon={false}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={onClickSendCustomer}
              >
                <SendOutlined />
                Send order to customer
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label=" " colon={false}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={onClickCopyOrder}
              >
                <PrinterOutlined />
                Print copy order
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default NewOrderPage;
