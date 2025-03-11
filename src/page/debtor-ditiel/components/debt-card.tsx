import { Flex, Progress, Row } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
interface DebtCardI {
  date: string;
  debt_sum: string;
  next_pay_date: string;
  next_pay_sum: string;
  paidPercentage: number;
}

export const DebtCard = ({
  date,
  debt_sum,
  next_pay_date,
  next_pay_sum,
  paidPercentage,
}: DebtCardI) => {

  return (
    <>
      <Row
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Title
          level={4}
          style={{
            fontWeight: 600,
            fontSize: "18px",
            color: "var(--text)",
            margin: "0px 0px 3px 0px",
          }}
        >
          {date}
        </Title>
        <Title
          level={4}
          style={{
            fontWeight: 700,
            fontSize: "22px",
            color: "var(--brand)",
            margin: "0px 0px 3px 0px",
          }}
        >
          {debt_sum} so‘m
        </Title>
      </Row>
      <Title
        level={4}
        style={{
          fontWeight: 600,
          fontSize: "18px",
          color: "var(--text)",
          margin: "0px 0px 3px 0px",
        }}
      >
        Keyingi to‘lov: {next_pay_date}
      </Title>
      <Title
        level={4}
        style={{
          fontWeight: 700,
          fontSize: "28px",
          color: "var(--secondary-color)",
          margin: "0px 0px 3px 0px",
        }}
      >
        {next_pay_sum}{" "}
        <span
          style={{
            fontWeight: 400,

            fontSize: "20px",
            color: "var(--text)",
          }}
        >
          so‘m
        </span>
      </Title>
      <Flex vertical gap="small" style={{ marginTop: "25px" }}>
        <Progress size={{ height: 13 }} percent={+paidPercentage?.toFixed(0)} type="line" />
      </Flex>
    </>
  );
};
