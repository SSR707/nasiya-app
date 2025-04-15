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
  InputNumber,
  UploadProps,
} from "antd";
import Title from "antd/es/typography/Title";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  addDebt,
  deleteDebt,
  deleteDebtImg,
} from "../../store/slices/debt-reducer";
import { RootState } from "../../store/store";
import { usePostDebtImg } from "./service/mutation/usePostDebtImg";
import { usePostDebtCreate } from "./service/mutation/usePostDebtCreate";
import { useNavigate, useParams } from "react-router-dom";
import { usePostDebtUploadImg } from "./service/mutation/usePostDebtUploadImg";
import "./style/debt.css";
import { BackBtn } from "../../components/back-btn";

export const DebtAdd = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toggal, setToggal] = useState(false);
  const [chekBoxToggal, setchekBoxToggal] = useState(false);
  const { debt } = useSelector((state: RootState) => state.debt);
  const { mutate, isPending } = usePostDebtImg();
  const { mutate: UploadImg } = usePostDebtUploadImg();
  const { mutate: DebtCreate, isPending: isPendingDebtCreate } =
    usePostDebtCreate();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    debt.debt_date ? dayjs(debt.debt_date).add(5, "hour") : null
  );
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (chekBoxToggal) {
      setSelectedDate(dayjs().add(5, "hour"));
    }
  }, [chekBoxToggal]);
  const [api, contextHolder] = notification.useNotification();
  const changeDate = (date: any) => {
    setSelectedDate(date);
    if (date) setchekBoxToggal(false);
  };
  const onFinish = (values: any) => {
    values.debt.debt_date = selectedDate ? selectedDate.toISOString() : null;
    values.debt.debt_period = +values.debt.debt_period;
    DebtCreate(
      {
        debtor_id: id,
        debt_name: values.debt.debt_name?.trim() || "",
        debt_date: values.debt.debt_date?.trim() || "",
        debt_sum: values.debt.debt_sum || 0,
        debt_period: values.debt.debt_period || 0,
        description: values.debt?.description?.trim() || "",
      },
      {
        onSuccess: (data) => {
          api.success({
            message: "Muvaffaqiyatli saqlandi",
            description: "Debt ma'lumotlari muvaffaqiyatli qo'shildi!",
          });
          UploadImg(
            { debt_id: data.data.id, url: debt.images[0] },
            {
              onSuccess: () =>
                UploadImg({ debt_id: data.data.id, url: debt.images[1] }),
            }
          );
          resetForm();
          navigate(`/debtor/${id}`);
        },
        onError: (error) => {
          api.error({
            message: "Error",
            description: `${error}`,
          });
        },
      }
    );
  };
  const ChangeForm = (changedValues: any) => {
    if (changedValues.debt) {
      changedValues.debt.debt_date = selectedDate
        ? selectedDate.toISOString()
        : null;
      dispatch(addDebt(changedValues.debt));
    }
  };
  const changeImg: UploadProps["onChange"] = ({ file }) => {
    if (file.originFileObj && !isPending) {
      mutate(file.originFileObj, {
        onSuccess: (data) => {
          dispatch(addDebt({ images: [...debt.images, data.data.image_url] }));
        },
      });
    }
  };
  const removeImg = (file: any) => {
    dispatch(deleteDebtImg(file.uid));
  };
  const resetForm = () => {
    dispatch(deleteDebt());
    setchekBoxToggal(false);
    setSelectedDate(null);
    setTimeout(() => {
      form.resetFields();
    }, 100);
  };
  return (
    <Row
      style={{
        margin: " 20px  36px",
        gap: "20px",
        position: 'relative'
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
          onValuesChange={ChangeForm}
          initialValues={{ debt }}
          style={{ width: "100%", maxWidth: 600 }}
        >
          <Form.Item
            name={["debt", "debt_name"]}
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
                Mahsulot nomi
              </Title>
            }
            rules={[{ required: true, message: "Mahsulot nomi kiriting" }]}
          >
            <Input
              style={{ padding: "10px 15px" }}
              placeholder="Mahsulot nomi"
            />
          </Form.Item>
          <Form.Item
            name={["debt", "debt_date"]}
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
            name={["debt", "debt_sum"]}
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
                Mahsulot Narxi
              </Title>
            }
            rules={[
              { required: true, message: "Mahsulot Narxini kiriting" },
              { pattern: /^\d+$/, message: "Faqat raqam kiriting" },
            ]}
          >
            <InputNumber
              style={{ width: "100%", padding: "5px 10px" }}
              placeholder="Mahsulot Narxi"
              min={0}
              controls={false}
            />
          </Form.Item>
          <Form.Item
            name={["debt", "debt_period"]}
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
            rules={[{ required: true, message: "Qarz muddatini tanlang" }]}
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
                value={1}
              >
                1 oy
              </Select.Option>
              <Select.Option
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "var(--text)",
                }}
                value={2}
              >
                2 oy
              </Select.Option>
              <Select.Option
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "var(--text)",
                }}
                value={3}
              >
                3 oy
              </Select.Option>
              <Select.Option
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "var(--text)",
                }}
                value={6}
              >
                6 oy
              </Select.Option>
              <Select.Option
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "var(--text)",
                }}
                value={9}
              >
                9 oy
              </Select.Option>
              <Select.Option
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "var(--text)",
                }}
                value={12}
              >
                12 oy
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
              <Input.TextArea placeholder="Izoh qoshish" />
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
              Izoh qoshish
            </Button>
          )}
          <Form.Item label={null}>
            <Button
              disabled={debt.images.length === 2 ? false : true}
              loading={isPendingDebtCreate}
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
              loading={isPendingDebtCreate}
              onClick={() => resetForm()}
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
            onChange={changeImg}
            onRemove={removeImg}
            maxCount={2}
            fileList={debt.images.map((url, index) => ({
              uid: index.toString(),
              name: `image-${index}`,
              status: "done",
              url: url,
            }))}
          >
            {debt.images.length < 2 ? (
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
            ) : null}
          </Upload>
        </Col>
      </Col>
    </Row>
  );
};
