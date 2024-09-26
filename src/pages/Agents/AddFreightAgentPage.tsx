import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IFreightAgentInfo } from "../../config/interfaces";
import { useAppContext } from "../../context/AppContext";
import PageLoading from "../../components/Containers/PageLoading";
import { Button, Form, Input, Radio } from "antd";
import {
  BackwardOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { apiCreateAgent, apiGetAgentById, apiUpdateAgent } from "../../services/agentService";
import { ROUTE_FREIGHTAGENTLISTPAGE } from "../../navigation/routes";

const AddFreightAgentPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [agentInfo, setAgentInfo] = useState<IFreightAgentInfo>();
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useAppContext();

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    apiGetAgentById(parseInt(id))
      .then((res) => {
        setAgentInfo(res as IFreightAgentInfo);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        showToast(err, "", "error");
        setTimeout(() => {
          navigate(-1);
        }, 500);
      });
  }, [id]);

  if (isLoading) return <PageLoading />;

  const onFinish = (values: any) => {
    if (values == undefined) return;
    let _info = !agentInfo
      ? values
      : {
          ...agentInfo,
          ...values,
        };
    // setIsLoading(true);
    let func = apiCreateAgent;
    if (id) {
      func = apiUpdateAgent;
    }
    func(_info as IFreightAgentInfo)
      .then((res) => {
        showToast("Success", "", "success");
        setTimeout(() => {
          setIsLoading(false);
          navigate(ROUTE_FREIGHTAGENTLISTPAGE);
        }, 300);
      })
      .catch((err) => {
        setIsLoading(false);
        showToast(err, "", "error");
      });
  };

  return (
    <>
      <div className=" bg-gray-100">
        <main className="container mx-auto p-8">
          <div>
            <Button
              type="text"
              size="large"
              onClick={() => {
                navigate(ROUTE_FREIGHTAGENTLISTPAGE);
              }}
            >
              <BackwardOutlined /> Back
            </Button>
          </div>

          <Form
            layout="vertical"
            className="bg-white p-6 rounded shadow-md space-y-6"
            initialValues={agentInfo != undefined ? { ...agentInfo } : {}}
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input the agent's name",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter agent's name"
              />
            </Form.Item>

            <Form.Item name="contact_person" label="Contact Person">
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter Contact Person"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please input the agent's email",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Enter agent's email"
                type={"email"}
              />
            </Form.Item>

            <Form.Item
              name="mobile_number"
              label="Mobile Number"
              rules={[
                {
                  required: true,
                  message: "Please input the agent's phone number",
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Enter agent's phone number"
                type={"tel"}
              />
            </Form.Item>

            <Form.Item name="landline_number" label="Landline Number">
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Enter agent's landline number"
                type={"tel"}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                className="w-[100%]"
                htmlType="submit"
                loading={isLoading}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </main>
      </div>
    </>
  );
};

export default AddFreightAgentPage;
