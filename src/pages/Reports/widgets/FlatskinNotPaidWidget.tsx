import React, { FC } from "react";
import OrderListWidget from "../../../components/OrderListWidget";
interface PROPS {
  start: string | null;
  end: string | null;
  data: any[];
}
const FlatskinNotPaidWidget: FC<PROPS> = ({
  data = [],
  start = null,
  end = null,
}) => {
  return (
    <div>
      <OrderListWidget dataList={data} />
    </div>
  );
};

export default FlatskinNotPaidWidget;