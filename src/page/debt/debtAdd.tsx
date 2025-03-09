import {
  Button,
  notification,
  Upload,
  Form,
  Row,
  Col,
  Input,
  DatePicker,
  Checkbox,
  Select,
} from "antd";
import Title from "antd/es/typography/Title";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

export const DebtAdd = () => {
  const [toggal, setToggal] = useState(false);
  const [chekBoxToggal, setchekBoxToggal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (chekBoxToggal) {
      setSelectedDate(dayjs());
    }
  }, [chekBoxToggal]);
  const [api, contextHolder] = notification.useNotification();
  const changeDate = (date: any) => {
    setSelectedDate(date);
    if (date) setchekBoxToggal(false);
  };
  const onFinish = (values: any) => {};
  return (
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
                Sana
              </Title>
            }
          >
            <DatePicker
              value={selectedDate}
              disabled={chekBoxToggal}
              onChange={(date) => changeDate(date)}
              style={{
                padding: "10px 20px",
                width: "70%",
                marginRight: "20px",
              }}
              placeholder="Sanani kiriting"
            />
            <Checkbox
              checked={chekBoxToggal}
              onChange={(e) => setchekBoxToggal(e.target.checked)}
              style={{
                fontWeight: 600,
                fontSize: "16px",
                color: "var(--text)",
              }}
            >
              Bugun
            </Checkbox>
          </Form.Item>

          <Form.Item
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
                Muddat
              </Title>
            }
          >
            <Select
              placeholder="Qarz muddatini tanlang"
              style={{
                height: "45px",
                fontWeight: 600,
                fontSize: "16px",
                color: "var(--text)",
              }}
            >
              <Select.Option
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "var(--text)",
                }}
                value="1oy"
              >
                1 oy
              </Select.Option>
              <Select.Option
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "var(--text)",
                }}
                value="2oy"
              >
                2 oy
              </Select.Option>
              <Select.Option
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "var(--text)",
                }}
                value="3oy"
              >
                3 oy
              </Select.Option>
              <Select.Option
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "var(--text)",
                }}
                value="6oy"
              >
                6 oy
              </Select.Option>
              <Select.Option
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "var(--text)",
                }}
                value="9oy"
              >
                9 oy
              </Select.Option>
            </Select>
          </Form.Item>
          {toggal ? (
            <Form.Item
              name={["debt", "description"]}
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
              onClick={() => {}}
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
            onChange={() => {}}
            onRemove={() => {}}
            maxCount={2}
          >
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
          </Upload>
        </Col>
      </Col>
    </Row>
  );
};
