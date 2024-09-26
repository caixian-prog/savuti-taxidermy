import React, { useEffect, useState } from "react";
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
import PageLoading from "../../components/Containers/PageLoading";

import { IUserInfo } from "../../config/interfaces";
import { apiDeleteUser, apiGetUserList } from "../../services/userService";
import { ROUTE_ADDUSERPAGE } from "../../navigation/routes";
import { USERTYPE } from "../../config/types";

const { Search } = Input;

interface DataType {
  key: string;
  id?: number;
  name: string;
  email: string;
  phone?: string;
  password?: string;
  role: string;
  created: string;
}

const UserListPage: React.FC = () => {
  const { showToast } = useAppContext();
  const [userList, setUserList] = useState<IUserInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    apiGetUserList()
      .then((res) => {
        setLoading(false);
        const _outfitters = res as IUserInfo[];
        setUserList(_outfitters);
      })
      .catch((err) => {
        showToast(err, "", "error");
        setLoading(false);
      });
  }, []);

  if (loading) return <PageLoading />;

  const data: DataType[] = userList.map((info) => {
    const _role = Object.keys(USERTYPE).find((x) => USERTYPE[x] == info.role);
    return {
      key: `outfitter-${info.id}`,
      id: info.id,
      name: info.name,
      email: info.email,
      phone: info.phone,
      role: _role ? _role.toUpperCase() : "",
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
      title: "Role",
      dataIndex: "role",
      key: "role",
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
            {/* <div
              className="text-blue-600 custom-button"
              onClick={() => {
                onClickEdit(data);
              }}
            >
              <EditOutlined /> &nbsp; Edit{" "}
            </div> */}
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
    const index = userList.findIndex((x) => x.id == item.id);
    if (index == undefined) return;
    console.log(index, item);
    let tmpUsers = [...userList];
    tmpUsers.splice(index, 1);
    setUserList(tmpUsers);
    if (item.id) apiDeleteUser(item.id);
  };
  const onClickEdit = (item: DataType) => {
    navigate(ROUTE_ADDUSERPAGE + "/" + item.id);
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
              navigate(ROUTE_ADDUSERPAGE);
            }}
          >
            Add New User
          </Button>
        </Col>
      </Row>

      <Table columns={columns} dataSource={filtered} />
    </div>
  );
};

export default UserListPage;
