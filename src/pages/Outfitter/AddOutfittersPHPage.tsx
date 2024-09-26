import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IOutfitterInfo } from "../../config/interfaces";
import { useAppContext } from "../../context/AppContext";
import {
  apiCreateOutfitter,
  apiGetOutfitterById,
  apiUpdateOutfitter,
} from "../../services/outfitterService";
import PageLoading from "../../components/Containers/PageLoading";
import { Button, Form, Input, Radio } from "antd";
import { ROUTE_OUTFITTERSLISTPAGE } from "../../navigation/routes";
import {
  BackwardOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";

const AddOutfittersPHPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [outfitterType, setOutfitterType] = useState(0);
  const [outfitterInfo, setOutfitterInfo] = useState<IOutfitterInfo>();
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useAppContext();

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    apiGetOutfitterById(parseInt(id))
      .then((res) => {
        setOutfitterInfo(res as IOutfitterInfo);
        setOutfitterType((res as IOutfitterInfo).type);
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
    let _info = !outfitterInfo
      ? values
      : {
          ...outfitterInfo,
          ...values,
        };
    _info["type"] = outfitterType;
    // setIsLoading(true);
    let func = apiCreateOutfitter;
    if (id) {
      func = apiUpdateOutfitter;
    }
    func(_info as IOutfitterInfo)
      .then((res) => {
        showToast("Success", "", "success");
        setTimeout(() => {
          setIsLoading(false);
          navigate(ROUTE_OUTFITTERSLISTPAGE);
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
                navigate(ROUTE_OUTFITTERSLISTPAGE);
              }}
            >
              <BackwardOutlined /> Back
            </Button>
          </div>

          <Form
            layout="vertical"
            className="bg-white p-6 rounded shadow-md space-y-6"
            initialValues={
              outfitterInfo != undefined
                ? { ...outfitterInfo, type: outfitterType }
                : { type: outfitterType }
            }
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input the outfitter/ph's name",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter outfitter/ph's name"
              />
            </Form.Item>

            <Form.Item name="surname" label="Surname Name">
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter outfitter/ph's surname"
              />
            </Form.Item>

            <Form.Item name="company_name" label="Company Name">
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter Company Name"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please input the outfitter/ph's email",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Enter outfitter/ph's email"
                type={"email"}
              />
            </Form.Item>

            <Form.Item
              name="mobile_number"
              label="Mobile Number"
              rules={[
                {
                  required: true,
                  message: "Please input the outfitter/ph's phone number",
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Enter outfitter/ph's phone number"
                type={"tel"}
              />
            </Form.Item>

            <Form.Item name="landline_number" label="Landline Number">
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Enter outfitter/ph's landline number"
                type={"tel"}
              />
            </Form.Item>

            <Form.Item name="type" label="Outfitter or PH ?">
              <Radio.Group
                onChange={(e) => setOutfitterType(e.target.value)}
                value={outfitterType}
              >
                <Radio value={1}>Outfitter</Radio>
                <Radio value={2}>PH</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="region" label="Region">
              <Input
                prefix={<EnvironmentOutlined />}
                placeholder="Enter Region"
              />
            </Form.Item>

            <Form.Item name="province" label="Province">
              <Input
                prefix={<EnvironmentOutlined />}
                placeholder="Enter Province"
              />
            </Form.Item>

            <Form.Item name="address" label="Address">
              <Input
                prefix={<EnvironmentOutlined />}
                placeholder="Enter Address"
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

export default AddOutfittersPHPage;
