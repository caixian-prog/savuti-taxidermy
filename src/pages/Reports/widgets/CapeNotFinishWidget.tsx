import React, { FC, useEffect, useState } from "react";
import OrderItemListWidget from "../../../components/OrderItemListWidget";
import { Col, Divider, Row, Select } from "antd";
import { apiGetSpecieList } from "../../../services/orderService";
import { getUniqStringList } from "../../../helpers/functions";
import SimpleOrderItemListWidget from "../../../components/SimpleOrderItemListWidget";
interface PROPS {
  start: string | null;
  end: string | null;
  data: any[];
  total_orders: any[];
}

const { Option } = Select;
const CapeNotFinishWidget: FC<PROPS> = ({
  data = [],
  total_orders = [],
  start = null,
  end = null,
}) => {
  const [specieList, setSpecieList] = useState<string[]>([]);
  const [selSpecie, setSelSpecie] = useState("");
  const [filtered, setFiltered] = useState<any[]>([]);
  useEffect(() => {
    const extract = data.map((x) => x.specie);
    const uniqueList = getUniqStringList(extract);
    // console.log(total_orders);
    setSpecieList(uniqueList);
  }, [data]);

  const onSelectSpecie = (specie_name: string) => {
    setSelSpecie(specie_name);
  };

  // console.log(data);
  useEffect(() => {
    let _filtered = data.filter((x) => x.specie == selSpecie);
    for (let i = 0; i < _filtered.length; i++) {
      const order = total_orders.find((x) => x.id == _filtered[i].order_id);

      if (!order) {
        _filtered[i].customer_name = "";
      } else {
        _filtered[i].customer_name = order["customer_name"];
      }
    }
    setFiltered(_filtered);
  }, [selSpecie]);
  console.log(filtered);
  return (
    <div>
      <Row align={"middle"} gutter={20}>
        <Col>Specie:</Col>
        <Col>
          <Select
            value={selSpecie}
            onChange={(value) => {
              onSelectSpecie(value);
            }}
            className="w-full min-w-[150px]"
            placeholder="Select Specie"
          >
            {specieList.map((specie) => (
              <Option key={specie} value={specie}>
                {specie}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Divider />
      <SimpleOrderItemListWidget dataList={filtered} />
    </div>
  );
};

export default CapeNotFinishWidget;
