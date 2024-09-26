import React, { useEffect, useState } from "react";
import { Button, Col, DatePicker, Row, Space } from "antd";
import moment, { Moment } from "moment";
import dayjs, { Dayjs } from "dayjs";
import { SearchOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import type { CollapseProps } from "antd";
import OutstandingWidget from "./widgets/OutstandingWidget";
import OutstandingDepositWidget from "./widgets/OutstandingDepositWidget";
import IncompletedOrderWidget from "./widgets/IncompletedOrderWidget";
import FlatskinPaidWidget from "./widgets/FlatskinPaidWidget";
import FlatskinNotPaidWidget from "./widgets/FlatskinNotPaidWidget";
import CapeNotFinishWidget from "./widgets/CapeNotFinishWidget";
import CapeAllWidget from "./widgets/CapeAllWidget";
import { apiGetReport } from "../../services/reportService";

const { RangePicker } = DatePicker;

type NoUndefinedRangeValueType<T> = [T | null, T | null];

const ReportsMenuPage: React.FC = () => {
  // State to store the start and end date strings
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [data, setData] = useState<any>({
    completed_orders: [],
    outstanding_orders: [],
    incompleted_orders: [],
    flatskin_paid: [],
    not_paid_flatskin: [],
    list_capes: [],
    list_all_capes: [],
  });

  const onDateChange = (
    dates: NoUndefinedRangeValueType<Dayjs> | null,
    dateStrings: [string, string]
  ): void => {
    setStartDate(dateStrings[0]);
    setEndDate(dateStrings[0]);
  };

  useEffect(() => {
    apiGetReport(startDate, endDate)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {});
  }, []);

  console.log(data);

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Completed orders (" + data["completed_orders"].length + ")",
      children: (
        <div>
          <OutstandingWidget
            start={startDate}
            end={endDate}
            data={data["completed_orders"]}
          />
        </div>
      ),
    },
    {
      key: "2",
      label:
        "Outstanding deposit payment (" +
        data["outstanding_orders"].length +
        ")",
      children: (
        <div>
          <OutstandingDepositWidget
            start={startDate}
            end={endDate}
            data={data["outstanding_orders"]}
          />
        </div>
      ),
    },
    {
      key: "3",
      label: "Incompleted orders (" + data["incompleted_orders"].length + ")",
      children: (
        <div>
          <IncompletedOrderWidget
            start={startDate}
            end={endDate}
            data={data["incompleted_orders"]}
          />
        </div>
      ),
    },
    {
      key: "4",
      label: "Flatskins paid (" + data["flatskin_paid"].length + ")",
      children: (
        <div>
          <FlatskinPaidWidget
            start={startDate}
            end={endDate}
            data={data["flatskin_paid"]}
          />
        </div>
      ),
    },
    {
      key: "5",
      label: "Flatskins - not paid (" + data["not_paid_flatskin"].length + ")",
      children: (
        <div>
          <FlatskinNotPaidWidget
            start={startDate}
            end={endDate}
            data={data["not_paid_flatskin"]}
          />
        </div>
      ),
    },
    {
      key: "6",
      label:
        "List of capes for each specie (" + data["list_capes"].length + ")",
      children: (
        <div>
          <CapeNotFinishWidget
            start={startDate}
            end={endDate}
            data={data["list_capes"]}
          />
        </div>
      ),
    },
    {
      key: "7",
      label: "List all capes (" + data["list_all_capes"].length + ")",
      children: (
        <div>
          <CapeAllWidget
            start={startDate}
            end={endDate}
            data={data["list_all_capes"]}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-5">
      <Row gutter={3}>
        <Col>
          Select Date Range: <RangePicker onChange={onDateChange} />
        </Col>
        <Col>
          <Button type="primary">
            <SearchOutlined /> Search
          </Button>
        </Col>
      </Row>

      <div className="mt-[20px]">
        <Collapse items={items} defaultActiveKey={["1"]} />
      </div>
    </div>
  );
};

export default ReportsMenuPage;
