import React, { FC, useState } from "react";
import { ICustomerInfo } from "../config/interfaces";
import { Input, Popconfirm, Table, TableColumnsType } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { apiDeleteCustomer } from "../services/customerService";
import { ROUTE_ADDNEWCUSTOMERPAGE } from "../navigation/routes";
import PrintableTable from "./PrintableTable";
interface DataType {
  key: string;
  id?: number;
  name: string;
  surname?: string;
  email: string;
  phone?: string;
  country?: string;
  created: string;
}
interface PROPS {
  customerList: ICustomerInfo[];
  setCustomerList?: (v: ICustomerInfo[]) => void;
  keyword?: string;
  canEdit?: boolean;
}
const CustomerListWidget: FC<PROPS> = ({
  customerList = [],
  setCustomerList = null,
  keyword = "",
  canEdit = true,
}) => {
  const navigate = useNavigate();

  const data: DataType[] = customerList.map((info) => {
    return {
      key: `customer-${info.id}`,
      id: info.id,
      name: info.name,
      surname: info.surname,
      email: info.email,
      phone: info.phone,
      country: info.residing_country,
      created: info.created.substring(0, 10),
    };
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      //   width: "5%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: DataType, b: DataType) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      //   width: "20%",
      sorter: (a: DataType, b: DataType) => a.email.localeCompare(b.email),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      //   width: "20%",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      //   width: "20%",
    },
    {
      title: "Created",
      dataIndex: "created",
      key: "created",
      sorter: (a: DataType, b: DataType) => a.created.localeCompare(b.created),
      sortDirections: ["descend", "ascend"],
    },
    canEdit == true
      ? {
          title: "Action",
          dataIndex: "",
          key: "x",
          render: (item, data) => {
            return (
              <div>
                <div
                  className="text-blue-600 custom-button"
                  onClick={() => {
                    onClickEdit(data);
                  }}
                >
                  <EditOutlined /> &nbsp; Edit{" "}
                </div>
                <Popconfirm
                  title="Sure to delete?"
                  onConfirm={() => {
                    onClickDelete(data);
                  }}
                >
                  <div className="text-red-600 custom-button">
                    <DeleteOutlined /> &nbsp; Delete{" "}
                  </div>
                </Popconfirm>
              </div>
            );
          },
        }
      : {},
  ];

  const onClickDelete = (item: DataType) => {
    if (!setCustomerList) return;
    const index = customerList.findIndex((x) => x.id == item.id);
    if (!index) return;
    let tmpCustomer = [...customerList];
    tmpCustomer.splice(index, 1);
    setCustomerList(tmpCustomer);
    if (item.id) apiDeleteCustomer(item.id);
  };
  const onClickEdit = (item: DataType) => {
    navigate(ROUTE_ADDNEWCUSTOMERPAGE + "/" + item.id);
  };
  const filtered =
    keyword == ""
      ? data
      : data.filter((info) => info.name?.toLowerCase()?.includes(keyword));
  return (
    <div>
      <PrintableTable columns={columns} dataSource={filtered} />
    </div>
  );
};

export default CustomerListWidget;
