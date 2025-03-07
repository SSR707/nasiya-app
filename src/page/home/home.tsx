import { Button, Card, Col, Modal, Row, Statistic } from "antd";
import Title from "antd/es/typography/Title";
import EyesOn from "../../assets/svg/eyes-on.svg";
import EyesOff from "../../assets/svg/eyes-off.svg";
import Kashelok from "../../assets/svg/kashelok.svg";
import { useState } from "react";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useGetUserStatistik } from "./service/query/useGetUserStatistik";
import { useGetUserStatistikLate } from "./service/query/useGetUserStatistikLate";
export const Home = () => {
  const [eyesToggal, setEyesToggal] = useState(true);
  const { data: userStatistik } = useGetUserStatistik();
  const { data: userStatistikLate } = useGetUserStatistikLate();
  const [modal2Open, setModal2Open] = useState(false);

  return (
    <>
      <Row
        style={{
          margin: " 36px  36px",
          gap: "20px",
        }}
      >
        <Col
          style={{
            width: "49%",
          }}
        >
          <Row
            style={{
              padding: "27px 24px",
              background: "var(--primary-02)",
              borderRadius: "20px",
              width: "100%",
              alignItems: "center",
              margin: "0px 0px 20px 0px",
            }}
          >
            <Col flex="auto" style={{ textAlign: "center" }}>
              <Title
                level={3}
                style={{
                  fontWeight: "700",
                  fontSize: "26px",
                  lineHeight: "140%",
                  color: "var(--fon-color)",
                  margin: 0,
                }}
              >
                {eyesToggal
                  ? `${(
                      userStatistik?.data?.total_debts ?? 0
                    ).toLocaleString()} so‘m`
                  : "******"}
              </Title>
              <Title
                level={3}
                style={{
                  fontWeight: 600,
                  fontSize: "15px",
                  lineHeight: "157%",
                  color: "var(--text)",
                  margin: "10px 0px 0px 0px",
                }}
              >
                Umumiy nasiya
              </Title>
            </Col>
            <Button
              onClick={() => setEyesToggal(!eyesToggal)}
              style={{ border: "none", padding: 0 }}
            >
              {eyesToggal ? (
                <img src={EyesOn} alt="" width={"24px"} height={"24px"} />
              ) : (
                <img src={EyesOff} alt="" width={"24px"} height={"24px"} />
              )}
            </Button>
          </Row>
          <Row
            style={{
              width: "100%",
              gap: "20px",
            }}
          >
            <Row
              style={{
                background: "var(--primary-02)",
                borderRadius: "20px",
                padding: "20px 15px",
                width: "48%",
                justifyContent: "center",
              }}
            >
              <Col style={{ width: "100%" }}>
                <Card
                  variant="borderless"
                  style={{ border: "none", boxShadow: "none" }}
                >
                  <Statistic
                    title={
                      <p
                        style={{
                          fontWeight: 600,
                          fontSize: "17px",
                          lineHeight: "157%",
                          color: "var(--text)",
                          marginBottom: "8px",
                        }}
                      >
                        Kechiktirilgan to‘lovlar
                      </p>
                    }
                    value={userStatistikLate?.lateDebts ?? 0}
                    valueStyle={{
                      color: "#cf1322",
                      fontWeight: 600,
                      fontSize: "30px",
                    }}
                    prefix={<ArrowDownOutlined />}
                  />
                </Card>
              </Col>
            </Row>
            <Row
              style={{
                background: "var(--primary-02)",
                borderRadius: "20px",
                width: "48%",
                padding: "20px 15px",
                justifyContent: "center",
              }}
            >
              <Col style={{ width: "100%" }}>
                <Card
                  variant="borderless"
                  style={{ border: "none", boxShadow: "none" }}
                >
                  <Statistic
                    title={
                      <p
                        style={{
                          fontWeight: 600,
                          fontSize: "17px",
                          lineHeight: "157%",
                          color: "var(--text)",
                          marginBottom: "8px",
                        }}
                      >
                        Mijozlar soni
                      </p>
                    }
                    value={userStatistik?.data?.debtors_count ?? 0}
                    valueStyle={{
                      color: "#3f8600",
                      fontWeight: 600,
                      fontSize: "30px",
                    }}
                    prefix={<ArrowUpOutlined />}
                  />
                </Card>
              </Col>
            </Row>
          </Row>
        </Col>
        <Col
          style={{
            width: "49%",
          }}
        >
          <Col
            style={{
              padding: "25px 24px 28px 24px",
              background: "var(--primary-02)",
              borderRadius: "20px",
              width: "100%",
              flex: "0 0 100%",
              marginBottom: "15px",
            }}
          >
            <Title
              level={3}
              style={{
                fontWeight: 600,
                fontSize: "18px",
                lineHeight: "157%",
                color: "var(--text)",
                margin: "0px 0px 20px 0px",
              }}
            >
              Hamyoningiz
            </Title>
            <Row align={"middle"} style={{ gap: "20px" }}>
              <Col
                style={{
                  padding: "12px 14px 10px 14px",
                  borderRadius: "100%",
                  backgroundColor: "rgba(115, 92, 216, 0.1)",
                  alignItems: "center",
                }}
              >
                <img src={Kashelok} alt="" />
              </Col>
              <Col>
                <Title
                  level={4}
                  style={{
                    fontWeight: 400,
                    fontSize: "15px",
                    lineHeight: "157%",
                    color: "var(--text)",
                    margin: "0px",
                  }}
                >
                  Hisobingizda
                </Title>
                <Title
                  level={3}
                  style={{
                    fontWeight: 700,
                    fontSize: "24px",
                    lineHeight: "157%",
                    color: "var(--text)",
                    margin: "0px",
                  }}
                >
                  {(userStatistik?.data?.wallet ?? 0).toLocaleString()} so‘m
                </Title>
              </Col>
              <Col style={{ marginLeft: "auto" }}>
                {" "}
                <Button
                  style={{
                    padding: "20px 14px",
                    borderRadius: "100%",
                    backgroundColor: "var(--brand)",
                  }}
                  onClick={() => setModal2Open(true)}
                >
                  <PlusOutlined style={{ color: "#fff" }} />
                </Button>
                <Modal
                  title="Hisob"
                  centered
                  open={modal2Open}
                  onOk={() => setModal2Open(false)}
                  onClose={() => setModal2Open(false)}
                  cancelButtonProps={{ style: { display: "none" } }}
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
                    Hisobizgizni toldirish uchun adminisratorlar bilan boglaning
                  </Title>
                </Modal>
              </Col>
            </Row>
          </Col>
          <Row
            style={{
              padding: "20px  24px",
              background: "var(--primary-02)",
              borderRadius: "20px",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Title
              level={4}
              style={{
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "157%",
                color: "var(--text)",
                margin: "0px",
              }}
            >
              Bu oy uchun to‘lov:
            </Title>
            <Title
              level={4}
              style={{
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "157%",
                color: userStatistik?.data?.wallet > 200000 ? "green" : "red",
                margin: "0px",
              }}
            >
              {userStatistik?.data?.wallet > 200000
                ? "To‘lov qilingan"
                : "To‘lov qilinmagan"}
            </Title>
          </Row>
        </Col>
      </Row>
    </>
  );
};
