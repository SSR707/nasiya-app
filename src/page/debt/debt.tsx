import {
  Button,
  Col,
  Drawer,
  Dropdown,
  Flex,
  Image,
  List,
  MenuProps,
  Modal,
  notification,
  Result,
  Row,
  Space,
  Spin,
} from "antd";
import Title from "antd/es/typography/Title";
import {
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
  CloseOutlined,
  RightOutlined,
} from "@ant-design/icons";
import MenuIcon from "../../assets/svg/menu.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDebtById } from "./service/query/useGetDebtById";
import dayjs from "dayjs";
import { useDeleteDebt } from "./service/mutation/useDeleteDebt";
import { useState } from "react";
import { client } from "../../config/query-client";
import { usePostPayment } from "./service/mutation/usePostPayment";
const PaymentManu = [
  "1 oyga so‘ndirish",
  "Har qanday miqdorda so‘ndirish",
  "To‘lov muddatini tanlash",
];
export const Debt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetDebtById(id);
  
  const { mutate } = useDeleteDebt();
  const { mutate: PaymenetMutate } = usePostPayment();
  const [api, contextHolder] = notification.useNotification();
  const [modal3Open, setModal3Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const debtDate = dayjs(data?.data?.debt_date);
  const newMonthIndex =
    data?.data?.initial_debt_period - data?.data?.debt_period;
  const newMonthName = debtDate.subtract(newMonthIndex, "month").format("MMMM");

  const [open, setOpen] = useState(false);
  const deleteDebt = () => {
    mutate(id, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ["debt"] });
        setModal2Open(false);
        api.success({
          message: "Muvaffaqiyatli ochirildi",
          description: "Debtor ma'lumoti muvaffaqiyatli Ochirildi!",
        });
        setTimeout(() => {
          navigate(-1);
        }, 200);
      },
      onError: () => {
        api.error({
          message: "Error",
          description: "Xatolik Yuz berdi!",
        });
      },
    });
  };
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "2") {
      setModal2Open(true);
    }
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Row className="menu-item" style={{ gap: "7px" }}>
          <EditOutlined className="menu-icon" />
          <span className="menu-title_sub">Edit</span>
        </Row>
      ),
    },
    {
      key: "2",
      label: (
        <Row className="menu-item" style={{ gap: "7px" }}>
          <DeleteOutlined className="menu-icon" />
          <span className="menu-title_sub menu-title_sub_denger">Delete</span>
        </Row>
      ),
    },
  ];
  const [selectModel, setSlecetModel] = useState(0);
  const [sum, setSum] = useState(1);

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const onClickList = (item: string) => {
    console.log(item);
    if (item === PaymentManu[0]) {
      setSlecetModel(1);
    } else if (item === PaymentManu[1]) {
      setSlecetModel(2);
    } else if (item === PaymentManu[2]) {
      setSlecetModel(3);
    }
    setModal3Open(true);
  };

  const clickPay = (type: string) => {
    const date = new Date();
    PaymenetMutate(
      { debt_id: id, sum, type, date: date.toISOString() },
      {
        onSuccess: () => {
          setIsSuccess(true);
          setModal3Open(false);
          setOpen(false);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
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
      ) : isSuccess ? (
        <Result
          style={{ marginTop: "80px" }}
          status="success"
          title={
            <Title
              level={3}
              style={{
                fontWeight: 700,
                fontSize: "28px",
                color: "var(--text)",
                margin: 0,
              }}
            >
              Ajoyib!
            </Title>
          }
          subTitle={
            <Title
              level={3}
              style={{
                fontWeight: 600,
                fontSize: "17px",
                color: "var(--text)",
                margin: 0,
              }}
            >
              Muvaffaqiyatli so‘ndirildi
            </Title>
          }
          extra={[
            <Button
              onClick={() => setIsSuccess(false)}
              type="primary"
              key="console"
              style={{
                padding: "20px 50px",
                borderRadius: "14px",
                fontSize: "18px",
              }}
            >
              Ortga
            </Button>,
          ]}
        />
      ) : (
        <Row
          style={{
            margin: " 20px  36px",
            gap: "25px",
            position: "relative",
          }}
        >
          {contextHolder}
          <Col
            style={{
              padding: "27px 50px",
              background: "var(--primary-02)",
              borderRadius: "20px",
              width: "45%",
              margin: "0px 0px 20px 0px",
            }}
          >
            <Row justify={"space-between"}>
              <Button
                style={{ border: "none", fontSize: "24px", padding: 0 }}
                onClick={() => navigate(-1)}
              >
                <ArrowLeftOutlined />
              </Button>
              <Title
                level={3}
                style={{
                  fontWeight: 700,
                  fontSize: "24px",
                  color: "var(--text)",
                  margin: 0,
                }}
              >
                Batafsil
              </Title>
              <Dropdown menu={menuProps} overlayClassName="custom-dropdown">
                <Button
                  style={{
                    padding: 0,
                    border: "none",
                    textAlign: "center",
                    marginTop: "4px",
                  }}
                >
                  <Space>
                    <img src={MenuIcon} alt="" />
                  </Space>
                </Button>
              </Dropdown>
            </Row>
            <Row
              style={{
                alignItems: "center",
                gap: "15px",
                marginTop: "30px",
              }}
            >
              <Title
                level={3}
                style={{
                  fontWeight: 700,
                  fontSize: "18px",
                  color: "var(--text)",
                  margin: 0,
                }}
              >
                Maxsulot Nomi :
              </Title>
              <Title
                level={3}
                style={{
                  fontWeight: 600,
                  fontSize: "18px",
                  color: "var(--text)",
                  margin: 0,
                }}
              >
                {data.data.debt_name}
              </Title>
            </Row>
            <Row
              style={{ alignItems: "center", gap: "20px", marginTop: "25px" }}
            >
              <Row style={{ gap: "10px" }}>
                <Title
                  level={3}
                  style={{
                    fontWeight: 700,
                    fontSize: "18px",
                    color: "var(--text)",
                    margin: 0,
                  }}
                >
                  Sana :
                </Title>
                <Title
                  level={3}
                  style={{
                    fontWeight: 600,
                    fontSize: "18px",
                    color: "var(--text)",
                    margin: 0,
                  }}
                >
                  {dayjs(data.data.debt_date).format("YYYY-MM-DD")}
                </Title>
              </Row>
              <Row style={{ gap: "10px" }}>
                <Title
                  level={3}
                  style={{
                    fontWeight: 700,
                    fontSize: "18px",
                    color: "var(--text)",
                    margin: 0,
                  }}
                >
                  Soat :
                </Title>
                <Title
                  level={3}
                  style={{
                    fontWeight: 600,
                    fontSize: "18px",
                    color: "var(--text)",
                    margin: 0,
                  }}
                >
                  {dayjs(data.data.debt_date).format("HH:mm:ss")}
                </Title>
              </Row>
            </Row>
            <Row
              style={{
                alignItems: "center",
                gap: "15px",
                marginTop: "25px",
              }}
            >
              <Title
                level={3}
                style={{
                  fontWeight: 700,
                  fontSize: "18px",
                  color: "var(--text)",
                  margin: 0,
                }}
              >
                Mudat :
              </Title>
              <Title
                level={3}
                style={{
                  fontWeight: 600,
                  fontSize: "18px",
                  color: "var(--text)",
                  margin: 0,
                }}
              >
                {data.data.initial_debt_period}
              </Title>
            </Row>
            <Row
              style={{
                alignItems: "center",
                gap: "15px",
                marginTop: "25px",
              }}
            >
              <Title
                level={3}
                style={{
                  fontWeight: 700,
                  fontSize: "18px",
                  color: "var(--text)",
                  margin: 0,
                }}
              >
                Summa miqdori :
              </Title>
              <Title
                level={3}
                style={{
                  fontWeight: 600,
                  fontSize: "18px",
                  color: "var(--text)",
                  margin: 0,
                }}
              >
                {data.data.debt_sum} som
              </Title>
            </Row>
            <Row
              style={{
                alignItems: "center",
                gap: "15px",
                marginTop: "25px",
              }}
            >
              <Title
                level={3}
                style={{
                  fontWeight: 700,
                  fontSize: "18px",
                  color: "var(--text)",
                  margin: 0,
                }}
              >
                Eslatma :
              </Title>
              <Title
                level={3}
                style={{
                  fontWeight: 600,
                  fontSize: "18px",
                  color: "var(--text)",
                  margin: 0,
                }}
              >
                {data.data.description}
              </Title>
            </Row>
          </Col>
          <Col
            style={{
              padding: "27px 30px",
              background: "var(--primary-02)",
              borderRadius: "20px",
              width: "53%",
              margin: "0px 0px 20px 0px",
            }}
          >
            <Row style={{ gap: "20px" }}>
              <Image
                width={290}
                height={330}
                style={{ objectFit: "cover" }}
                src={`${data.data?.images[0]?.image}`}
              />
              <Image
                width={290}
                height={330}
                style={{ objectFit: "cover" }}
                src={`${data.data?.images[1]?.image}`}
              />
            </Row>
          </Col>
          <Button
            style={{
              position: "absolute",
              right: 10,
              bottom: "-150px",
              borderRadius: "10px",
              padding: "25px 30px",
              fontWeight: 600,
              fontSize: "18px",
              color: "var( --neutral-05)",
              backgroundColor: "var(--brand)",
            }}
            onClick={() => setOpen(!open)}
          >
            Nasiyani so‘ndirish
          </Button>
          <Modal
            centered
            open={modal2Open}
            onOk={() => deleteDebt()}
            onCancel={() => {
              setModal2Open(false);
            }}
          >
            <Title
              level={3}
              style={{
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "157%",
                color: "var(--text)",
                marginBottom: "20px",
              }}
            >
              O'chirishni tasdiqlaysizmi?
            </Title>
          </Modal>
          <Drawer
            title={
              <Title
                level={3}
                style={{
                  fontWeight: 700,
                  fontSize: "18px",
                  color: "var(--text)",
                  margin: 0,
                }}
              >
                Nasiyani so‘ndirish
              </Title>
            }
            placement="left"
            closable={false}
            onClose={() => setOpen(!open)}
            open={open}
            key="left"
            extra={
              <Button
                type="text"
                style={{ fontSize: "20px" }}
                icon={<CloseOutlined />}
                onClick={() => setOpen(false)}
              />
            }
          >
            <List
              size="large"
              dataSource={PaymentManu}
              renderItem={(item) => (
                <List.Item
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                  onClick={() => onClickList(item)}
                >
                  {" "}
                  <Title
                    level={3}
                    style={{
                      fontWeight: 600,
                      fontSize: "16px",
                      color: "var(--text)",
                      margin: 0,
                    }}
                  >
                    {item}
                  </Title>
                  <RightOutlined />
                </List.Item>
              )}
            />
            <Modal
              title={
                <Title
                  level={3}
                  style={{
                    fontWeight: 700,
                    fontSize: "17px",
                    color: "var(--text)",
                    margin: 0,
                  }}
                >
                  {PaymentManu[selectModel - 1]}
                </Title>
              }
              centered
              open={modal3Open}
              closable={false}
              onOk={() => clickPay("one_month")}
              onCancel={() => setModal3Open(false)}
            >
              {selectModel === 1 ? (
                <Col
                  style={{
                    padding: "20px",
                    borderRadius: "16px",
                    backgroundColor: "#DDE9FE",
                    margin: "20px 0px 30px 0px",
                  }}
                >
                  <Title
                    level={3}
                    style={{
                      fontWeight: 700,
                      fontSize: "18px",
                      color: "var(--brand)",
                      margin: 0,
                    }}
                  >
                    {data?.data?.month_sum}
                  </Title>
                  <Title
                    level={3}
                    style={{
                      fontWeight: 600,
                      fontSize: "16px",
                      color: "var(--text)",
                      margin: "10px 0px 0px 0px",
                    }}
                  >
                    {newMonthName} oyi uchun so‘ndiriladi
                  </Title>
                </Col>
              ) : null}
            </Modal>
          </Drawer>
        </Row>
      )}
    </>
  );
};
