import React, { useEffect, useState } from "react";
import { IOutfitterInfo } from "../../config/interfaces";
import { apiGetCustomers } from "../../services/customerService";
import { useAppContext } from "../../context/AppContext";
import {
  Spin,
  Table,
  Input,
  TableColumnsType,
  Popconfirm,
  Row,
  Col,
  Button,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ROUTE_ADDOUTFITTERSPHPAGE } from "../../navigation/routes";
import PageLoading from "../../components/Containers/PageLoading";
import {
  apiDeleteOutfitter,
  apiGetOutfitters,
} from "../../services/outfitterService";

const { Search } = Input;
interface DataType {
  key: string;
  id?: number;
  name: string;
  surname?: string;
  company_name?: string;
  mobile_number?: string;
  landline_number?: string;
  email: string;
  address?: string;
  created: string;
}

const OutfittersPHListPage: React.FC = () => {
  const { showToast } = useAppContext();
  const [outfitterList, setOutfitterList] = useState<IOutfitterInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    apiGetOutfitters()
      .then((res) => {
        setLoading(false);
        const _outfitters = res as IOutfitterInfo[];
        setOutfitterList(_outfitters);
      })
      .catch((err) => {
        showToast(err, "", "error");
        setLoading(false);
      });
  }, []);

  if (loading) return <PageLoading />;

  const data: DataType[] = outfitterList.map((info) => {
    return {
      key: `outfitter-${info.id}`,
      id: info.id,
      name: info.name,
      surname: info.surname,
      company_name: info.company_name,
      mobile_number: info.mobile_number,
      landline_number: info.landline_number,
      email: info.email,
      address: `${info.region}/${info.province}/${info.address}`,
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
      title: "Mobile Number",
      dataIndex: "mobile_number",
      key: "mobile_number",
      //   width: "20%",
    },
    {
      title: "Landline Number",
      dataIndex: "landline_number",
      key: "landline_number",
      //   width: "20%",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      //   width: "20%",
    },
    {
      title: "Created",
      dataIndex: "created",
      key: "created",
      sorter: (a: DataType, b: DataType) => a.created.localeCompare(b.created),
      sortDirections: ["descend", "ascend"],
    },
    {
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
    },
  ];

  const onSearch = (e: any) => {
    setKeyword(e.toLowerCase());
  };
  const onClickDelete = (item: DataType) => {
    const index = outfitterList.findIndex((x) => x.id == item.id);
    if (index == undefined) return;
    console.log(index, item);
    let tmpOutfitter = [...outfitterList];
    tmpOutfitter.splice(index, 1);
    setOutfitterList(tmpOutfitter);
    if (item.id) apiDeleteOutfitter(item.id);
  };
  const onClickEdit = (item: DataType) => {
    navigate(ROUTE_ADDOUTFITTERSPHPAGE + "/" + item.id);
  };
  const filtered =
    keyword == ""
      ? data
      : data.filter((info) => info.name?.toLowerCase()?.includes(keyword));
  return (
    <div>
      <Row gutter={1} align={"middle"} className="mb-[20px]">
        <Col span={16}>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </Col>
        <Col span={8} className="text-right">
          <Button
            type={"primary"}
            onClick={() => {
              navigate(ROUTE_ADDOUTFITTERSPHPAGE);
            }}
          >
            Add New Outfitter/PH
          </Button>
        </Col>
      </Row>

      <Table columns={columns} dataSource={filtered} />
    </div>
  );
};

export default OutfittersPHListPage;
