import { Col, Row, theme, Calendar, Flex, Spin } from "antd";
import Title from "antd/es/typography/Title";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { DebtorCard } from "./components/debtor-card";
import { useGetCalendar } from "./service/query/useGetCalendar";
import { Link } from "react-router-dom";
import { BackBtn } from "../../components/back-btn";

export const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const { data, isLoading } = useGetCalendar(selectedDate.format("YYYY-MM-DD"));
  const onPanelChange = (value: Dayjs) => {
    setSelectedDate(value);
  };
  const { token } = theme.useToken();

  const onDateSelect = (value: Dayjs) => {
    setSelectedDate(value);
  };
  const wrapperStyle: React.CSSProperties = {
    width: "100%",
    border: `2px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  const dateFullCellRender = (value: Dayjs) => {
    const isSelected = selectedDate && value.isSame(selectedDate, "day");

    return (
      <div
        onClick={() => onDateSelect(value)}
        style={{
          padding: "8px",
          textAlign: "center",
          borderRadius: "8px",
          background: isSelected ? "var(--primary-01)" : "transparent",
          color: isSelected ? "white" : "black",
          cursor: "pointer",
          transition: "0.3s",
        }}
      >
        {value.date()}
      </div>
    );
  };

  return (
    <>
      <Row
        style={{
          margin: " 20px  36px",
          gap: "20px",
          position: "relative",
        }}
      >
        <BackBtn />
        <Col
          style={{
            width: "40%",
          }}
        >
          <Row
            style={{
              padding: "27px 24px",
              background: "var(--primary-02)",
              borderRadius: "20px",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "0px 0px 20px 0px",
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
              Oylik jami :
            </Title>
            <Title
              level={3}
              style={{
                fontWeight: 700,
                fontSize: "22px",
                color: "var(--text)",
                margin: 0,
              }}
            >
              {data?.data?.totalAmount.toLocaleString()} so‘m
            </Title>
          </Row>
          <Col
            style={{
              padding: "27px 24px",
              background: "var(--primary-02)",
              borderRadius: "20px",
              width: "100%",
              margin: "0px 0px 20px 0px",
            }}
          >
            <div style={wrapperStyle}>
              <Calendar
                fullscreen={false}
                onSelect={(deta) => onPanelChange(deta)}
                dateFullCellRender={dateFullCellRender}
              />
            </div>
          </Col>
        </Col>
        <Col
          style={{
            width: "45%",
          }}
        >
          <Col
            style={{
              padding: "27px 24px",
              background: "var(--primary-02)",
              borderRadius: "20px",
              width: "100%",
              margin: "0px 0px 20px 0px",
            }}
          >
            <Title
              level={3}
              style={{
                fontWeight: 700,
                fontSize: "18px",
                color: "var(--text)",
                margin: "0px 0px 20px 0px",
              }}
            >
              {selectedDate.format("D MMMM")} kuni to‘lov kutilmoqda
            </Title>
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
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
                />
              </Flex>
            ) : (
              <ul
                style={{
                  listStyle: "none",
                  padding: "0 10px 0 0",
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  maxHeight: "450px",
                  overflowY: "auto",
                  scrollbarWidth: "thin",
                  scrollbarColor: "var(--brand) transparent",
                }}
              >
                {data?.data?.duePayments.length === 0 ? (
                  <Col
                    style={{
                      width: "100%",
                      padding: "25px 30px 25px 30px",
                      backgroundColor: "var(--fon-color)",
                      borderRadius: "22px",
                      cursor: "pointer",
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
                      Ushbu kunga tegishli ma'lumot topilmadi
                    </Title>
                  </Col>
                ) : (
                  data?.data?.duePayments.map((item) => (
                    <li
                      style={{
                        width: "100%",
                        padding: "25px 30px 25px 30px",
                        backgroundColor: "var(--fon-color)",
                        borderRadius: "22px",
                        cursor: "pointer",
                      }}
                      key={item.id}
                    >
                      <Link to={`/debtor/${item.id}`}>
                        <DebtorCard name={item.debtorName} sum={item.amount} />
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            )}
          </Col>
        </Col>
      </Row>
    </>
  );
};
