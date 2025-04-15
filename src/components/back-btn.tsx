import { Button } from "antd";
import {  ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const BackBtn = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(-1)}
      style={{
        position: "absolute",
        top: "-150px",
        border: "none",
        left: "-30px",
        padding: "0px 3px",
        fontSize: "20px",
        background: "white",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.40)",
      }}
    >
      <ArrowLeftOutlined />
    </Button>
  );
};
