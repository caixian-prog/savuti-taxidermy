import React, { FC, useEffect, useState } from "react";
import CustomerListWidget from "../../../components/CustomerListWidget";
import { IOutfitterInfo } from "../../../config/interfaces";
import { apiGetOutfitters } from "../../../services/outfitterService";
import { Col, Row, Select } from "antd";

interface PROPS {
  start: string | null;
  end: string | null;
  data: any[];
}
const { Option } = Select;
const CustomerAllWidget: FC<PROPS> = ({
  data = [],
  start = null,
  end = null,
}) => {
  const [outfitterList, setOutfitterList] = useState<IOutfitterInfo[]>([]);
  const [selOutfitter, setSelOutfitter] = useState(-1);
  useEffect(() => {
    apiGetOutfitters().then((res) => {
      setOutfitterList(res as IOutfitterInfo[]);
    });
  }, []);
  const filtered =
    selOutfitter == -1
      ? data
      : data.filter((x) => x.outfitter == selOutfitter || x.ph == selOutfitter);
  return (
    <div>
      <Row>
        <Col>
          Select Outfitter :{" "}
          <Select
            className="w-[150px]"
            defaultValue={-1}
            onChange={(e) => {
              setSelOutfitter(e);
            }}
          >
            <Option value={-1} key={`outfitter-all`}>
              Select all
            </Option>
            {outfitterList.map((x, index) => {
              return (
                <Option value={x.id} key={`outfitter-${x.id}`}>
                  {x.company_name}
                </Option>
              );
            })}
          </Select>
        </Col>
        <Col></Col>
      </Row>
      <CustomerListWidget customerList={filtered} canEdit={false} />
    </div>
  );
};

export default CustomerAllWidget;
