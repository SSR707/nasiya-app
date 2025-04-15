import { Col } from "antd";
import Title from "antd/es/typography/Title";

export const DebtorCard = ({ name, sum }: { name: string; sum: string }) => {
  return (
    <>
      <Col>
        <Title
          level={3}
          style={{
            fontWeight: 700,
            fontSize: "18px",
            color: "var(--text)",
            margin: "0px 0px 5px 0px",
          }}
        >
          {name}
        </Title>
        <Title
          level={3}
          style={{
            fontWeight: 700,
            fontSize: "18px",
            color: "var(--text)",
            margin: 0,
          }}
        >
          UZS {sum}
        </Title>
      </Col>
    </>
  );
};
