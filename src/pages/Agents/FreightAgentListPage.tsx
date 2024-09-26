import React, { useEffect, useState } from "react";
import { IFreightAgentInfo } from "../../config/interfaces";
import { useAppContext } from "../../context/AppContext";
import {
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
import {
  ROUTE_ADDFREIGHTAGENTSPAGE,
} from "../../navigation/routes";
import PageLoading from "../../components/Containers/PageLoading";
import { apiDeleteAgent, apiGetAgents } from "../../services/agentService";

const { Search } = Input;
interface DataType {
  key: string;
  id?: number;
  name: string;
  contact_person?: string;
  mobile_number?: string;
  landline_number?: string;
  email: string;
  created: string;
}

const FreightAgentListPage: React.FC = () => {
  const { showToast } = useAppContext();
  const [agentList, setAgentList] = useState<IFreightAgentInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    apiGetAgents()
      .then((res) => {
        setLoading(false);
        const _outfitters = res as IFreightAgentInfo[];
        setAgentList(_outfitters);
      })
      .catch((err) => {
        showToast(err, "", "error");
        setLoading(false);
      });
  }, []);

  if (loading) return <PageLoading />;

  const data: DataType[] = agentList.map((info) => {
    return {
      key: `outfitter-${info.id}`,
      id: info.id,
      name: info.name,
      contact_person: info.contact_person,
      mobile_number: info.mobile_number,
      landline_number: info.landline_number,
      email: info.email,
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
      title: "Contact Person",
      dataIndex: "contact_person",
      key: "contact_person",
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
    const index = agentList.findIndex((x) => x.id == item.id);
    if (index == undefined) return;
    console.log(index, item);
    let tmpAgents = [...agentList];
    tmpAgents.splice(index, 1);
    setAgentList(tmpAgents);
    if (item.id) apiDeleteAgent(item.id);
  };
  const onClickEdit = (item: DataType) => {
    navigate(ROUTE_ADDFREIGHTAGENTSPAGE + "/" + item.id);
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
              navigate(ROUTE_ADDFREIGHTAGENTSPAGE);
            }}
          >
            Add New Freight Agent
          </Button>
        </Col>
      </Row>

      <Table columns={columns} dataSource={filtered} />
    </div>
  );
};

export default FreightAgentListPage;
