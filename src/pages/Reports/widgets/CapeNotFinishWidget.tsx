import React, { FC } from "react";
import OrderItemListWidget from "../../../components/OrderItemListWidget";
interface PROPS {
  start: string | null;
  end: string | null;
  data: any[];
}
const CapeNotFinishWidget: FC<PROPS> = ({
  data = [],
  start = null,
  end = null,
}) => {
  return (
    <div>
      <OrderItemListWidget dataList={data} />
    </div>
  );
};

export default CapeNotFinishWidget;
