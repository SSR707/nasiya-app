import {
  Col,
  Row,
  Button,
  Form,
  Input,
  notification,
  Upload,
  UploadProps,
  Flex,
  Spin,
} from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { usePostDebtorImg } from "../debtor/service/mutation/usePostDebtorImg";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDebtorById } from "./service/query/useGetDebtorById";
import { useUpdateDebtor } from "./service/mutation/useUpdateDebtor";
import { useDeleteDebtorImg } from "./service/mutation/useDeleteDebtorImg";
import { client } from "../../config/query-client";
import { usePostDebtorSubmit } from "../debtor/service/mutation/usePostDebtorImgSubmit";
export interface DebtorI {
  full_name: string;
  phone_number: string;
  address: string;
  note?: string;
  image?: string;
}
export const DebtorEdit = () => {
  const { id } = useParams();
  const naviate = useNavigate();
  const { data, isLoading } = useGetDebtorById(id);
  const { mutate, isPending } = useUpdateDebtor();
  const { mutate: DeleteDebtorImg } = useDeleteDebtorImg();
  const { mutate: uploadMutateSubmit } = usePostDebtorSubmit();
  const [toggal, setToggal] = useState(false);
  const [form] = Form.useForm();
  const { mutate: uploadMutate, isPending: createImgPeading } =
    usePostDebtorImg();
  const [api, contextHolder] = notification.useNotification();
  const onFinish = (values: any) => {
    mutate(
      {
        id: id,
        data: {
          full_name: values.debtor.full_name?.trim() || "",
          phone_number: values.debtor.phone_number?.trim() || "",
          address: values.debtor.address?.trim() || "",
          note: values.debtor?.note?.trim() || "",
        },
      },
      {
        onSuccess: () => {
          api.success({
            message: "Muvaffaqiyatli saqlandi",
            description: "Debtor ma'lumotlari muvaffaqiyatli qo'shildi!",
          });
          naviate(-1);
        },
        onError: (error: any) => {
          const errorMessage = error.response?.data?.error?.message;
          form.setFields([
            {
              name: ["debtor", "phone_number"],
              errors: [errorMessage],
            },
          ]);
        },
      }
    );
  };
  const changeUpload: UploadProps["onChange"] = ({ file }) => {
    if (file.originFileObj && !createImgPeading) {
      uploadMutate(file.originFileObj, {
        onSuccess: (data) => {
          client.invalidateQueries({ queryKey: ["debtor", id] });
          uploadMutateSubmit(
            {
              debtorId: id,
              url: data.data.image_url,
            },
            {
              onError: (error) => {
                console.log(error);
              },
            }
          );
        },
      });
    }
  };

  const removeImg = (file: any) => {
    DeleteDebtorImg(file.uid, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ["debtor", id] });
      },
    });
  };
  return (
    <>
      {isLoading ? (
        <Flex
          align="center"
          justify="center"
          gap="middle"
          style={{
            margin: " 20px  36px",
            gap: "22px",
            height: "50vh",
          }}
        >
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </Flex>
      ) : (
        <Row
          style={{
            margin: " 20px  36px",
            gap: "20px",
          }}
        >
          {contextHolder}
          <Col
            style={{
              padding: "27px 50px",
              background: "var(--primary-02)",
              borderRadius: "20px",
              width: "40%",
              margin: "0px 0px 20px 0px",
            }}
          >
            <Form
              form={form}
              name="nest-messages"
              layout="vertical"
              onFinish={onFinish}
              initialValues={{ debtor: data?.debtor }}
              style={{ width: "100%", maxWidth: 600 }}
            >
              <Form.Item
                name={["debtor", "full_name"]}
                label={
                  <Title
                    level={3}
                    style={{
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "var(--text)",
                      margin: 0,
                    }}
                  >
                    Ism
                  </Title>
                }
                rules={[{ required: true, message: "Ismni kiriting" }]}
              >
                <Input
                  style={{ padding: "10px 15px" }}
                  placeholder="Ismini kiriting"
                />
              </Form.Item>
              <Form.Item
                name={["debtor", "phone_number"]}
                label={
                  <Title
                    level={3}
                    style={{
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "var(--text)",
                      margin: 0,
                    }}
                  >
                    Telefon raqami
                  </Title>
                }
                rules={[
                  { required: true, message: "Telefon raqamini kiriting" },
                ]}
              >
                <Input
                  style={{ padding: "10px 15px" }}
                  placeholder="Telefon raqami"
                />
              </Form.Item>

              <Form.Item
                name={["debtor", "address"]}
                label={
                  <Title
                    level={3}
                    style={{
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "var(--text)",
                      margin: 0,
                    }}
                  >
                    Yashash manzili
                  </Title>
                }
                rules={[{ required: true, message: "Address kiriting" }]}
              >
                <Input
                  style={{ padding: "10px 15px" }}
                  placeholder="Yashash manzilini kiriting"
                />
              </Form.Item>
              {toggal ? (
                <Form.Item
                  name={["debtor", "note"]}
                  label={
                    <Title
                      level={3}
                      style={{
                        fontWeight: 600,
                        fontSize: "14px",
                        color: "var(--text)",
                        margin: 0,
                      }}
                    >
                      Eslatma
                    </Title>
                  }
                  rules={[{ message: "Eslatmani kiriting" }]}
                >
                  <Input.TextArea placeholder="Eslatma kiriting" />
                </Form.Item>
              ) : (
                <Button
                  style={{
                    width: "100%",
                    padding: "20px 15px",
                    marginBottom: "20px",
                  }}
                  onClick={() => setToggal(!toggal)}
                >
                  Eslatma qo‘shish
                </Button>
              )}
              <Form.Item label={null}>
                <Button
                  loading={isPending}
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "100%",
                    padding: "20px 15px",
                  }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col>
            <Col
              style={{
                padding: "27px 40px",
                background: "var(--primary-02)",
                borderRadius: "20px",
                border: "2px solid #eee",
              }}
            >
              <Title
                level={3}
                style={{
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "var(--text)",
                  margin: "0px 0px 20px 0px",
                }}
              >
                Rasm biriktirish
              </Title>
              <Upload
                listType="picture-card"
                onChange={changeUpload}
                onRemove={removeImg}
                maxCount={2}
                fileList={data?.debtor?.images?.map((item, index) => ({
                  uid: item?.id,
                  name: `image-${index}`,
                  status: "done",
                  url: item?.image,
                }))}
              >
                {data?.debtor?.images ? (
                  data?.debtor?.images.length < 2 ? (
                    <button
                      style={{
                        color: "inherit",
                        cursor: "inherit",
                        border: 0,
                        background: "none",
                      }}
                      type="button"
                    >
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Rasm qo‘shish</div>
                    </button>
                  ) : null
                ) : null}
              </Upload>
            </Col>
          </Col>
        </Row>
      )}
    </>
  );
};
