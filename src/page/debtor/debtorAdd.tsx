import { Col, Row, Button, Form, Input, notification } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { usePostDebtorCreate } from "./service/mutation/usePostDebtorCreate";
export interface DebtorI {
  full_name: string;
  phone_number: string;
  address: string;
  note?: string;
  image?: string;
}
export const DebtorAdd = () => {
  const [toggal, setToggal] = useState(false);
  const { mutate, isPending } = usePostDebtorCreate();
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
        onSuccess: () => {
          api.success({
            message: "Muvaffaqiyatli saqlandi",
            description: "Debtor ma'lumotlari muvaffaqiyatli qo'shildi!",
          });
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };
  return (
    <Row
      style={{
        margin: " 36px  36px",
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
          name="nest-messages"
          layout="vertical"
          onFinish={onFinish}
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
    </Row>
  );
};
