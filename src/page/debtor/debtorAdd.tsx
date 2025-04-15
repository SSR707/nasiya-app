import {
  Col,
  Row,
  Button,
  Form,
  Input,
  notification,
  Upload,
  UploadProps,
} from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { usePostDebtorCreate } from "./service/mutation/usePostDebtorCreate";
import { PlusOutlined } from "@ant-design/icons";
import { usePostDebtorImg } from "./service/mutation/usePostDebtorImg";
import { useDispatch, useSelector } from "react-redux";
import {
  addDdebtor,
  deleteDebtorImg,
  deleteDebtor,
} from "../../store/slices/debtor-reducer";
import { RootState } from "../../store/store";
import { usePostDebtorSubmit } from "./service/mutation/usePostDebtorImgSubmit";
import { BackBtn } from "../../components/back-btn";
export interface DebtorI {
  full_name: string;
  phone_number: string;
  address: string;
  note?: string;
  image?: string;
}
export const DebtorAdd = () => {
  const [toggal, setToggal] = useState(false);
  const [form] = Form.useForm();
  const { debtor } = useSelector((state: RootState) => state.debtor);
  const dispatch = useDispatch();
  const { mutate, isPending } = usePostDebtorCreate();
  const { mutate: uploadMutate, isPending: createImgPeading } =
    usePostDebtorImg();
  const { mutate: uploadMutateSubmit } = usePostDebtorSubmit();
  const [api, contextHolder] = notification.useNotification();
  const onFinish = (values: any) => {
    mutate(
      {
        full_name: values.debtor.full_name?.trim() || "",
        phone_number: values.debtor.phone_number?.trim() || "",
        address: values.debtor.address?.trim() || "",
        note: values.debtor?.note?.trim() || "",
        image: "",
      },
      {
        onSuccess: (data) => {
          api.success({
            message: "Muvaffaqiyatli saqlandi",
            description: "Debtor ma'lumotlari muvaffaqiyatli qo'shildi!",
          });
          uploadMutateSubmit(
            { debtorId: data?.data.id, url: debtor.images[0] },
            {
              onSuccess: () => {
                uploadMutateSubmit({
                  debtorId: data?.data.id,
                  url: debtor.images[1],
                });
              },
            }
          );
          resetForm();
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
          dispatch(
            addDdebtor({ images: [...debtor.images, data.data.image_url] })
          );
        },
      });
    }
  };
  const changeForm = (changedValues: any) => {
    if (changedValues.debtor) {
      dispatch(addDdebtor(changedValues.debtor));
    }
  };

  const removeImg = (file: any) => {
    dispatch(deleteDebtorImg(file.uid));
  };
  const resetForm = () => {
    dispatch(deleteDebtor());
    setTimeout(() => {
      form.resetFields();
    }, 100);
  };
  return (
    <Row
      style={{
        margin: " 20px  36px",
        gap: "20px",
        position: "relative",
      }}
    >
      {contextHolder}
      <BackBtn />
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
          initialValues={{ debtor }}
          onValuesChange={changeForm}
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
            rules={[{ required: true, message: "Telefon raqamini kiriting" }]}
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
              disabled={debtor.images.length === 2 ? false : true}
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
          <Form.Item label={null} style={{ textAlign: "center" }}>
            <Button
              loading={isPending}
              onClick={resetForm}
              htmlType="reset"
              style={{
                width: "50%",
                padding: "20px 15px",
              }}
            >
              Rest
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
            fileList={debtor.images.map((url, index) => ({
              uid: index.toString(),
              name: `image-${index}`,
              status: "done",
              url: url,
            }))}
          >
            {debtor.images.length < 2 && (
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
            )}
          </Upload>
        </Col>
      </Col>
    </Row>
  );
};
