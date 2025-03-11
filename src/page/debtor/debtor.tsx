import {
  AutoComplete,
  AutoCompleteProps,
  Button,
  Col,
  Image,
  Input,
  notification,
  Row,
  Table,
} from "antd";

import { useState } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import { useGetAllDebtors } from "./service/query/useGetAllDebtors";
import { useNavigate } from "react-router-dom";

export const Debtor = () => {
  const [options] = useState<AutoCompleteProps["options"]>([]);
  const [_, contextHolder] = notification.useNotification();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllDebtors(search);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Full name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Imges",
      dataIndex: "image",
      key: "image",
      render: (images: any) => {
        return (
          <Row style={{ gap: "5px" }}>
            <Image width={70} height={80} src={`${images[0]?.image}`} />
            <Image width={70} height={80} src={`${images[1]?.image}`} />
          </Row>
        );
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Show",
      render: (data: any) => {
        return (
          <Row>
            <Button
              onClick={() => navigate(`/debtor/${data.key}`)}
              type="primary"
              style={{
                padding: "20px 30px",
              }}
            >
              Show
            </Button>
          </Row>
        );
      },
    },
  ];
  const dataSource = data?.data?.debtors.map((Item, index) => ({
    key: Item.id,
    id: index + 1,
    full_name: Item.full_name,
    phone_number: Item.phone_number,
    image: Item.images,
    address: Item.address,
    note: Item.note,
  }));
  const Search = (value: string) => {
    setSearch(value);
  };

  return (
    <Col
      style={{
        margin: " 30px  36px",
        gap: "20px",
      }}
    >
      {contextHolder}
      <Row
        style={{
          marginBottom: "20px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <AutoComplete
          popupMatchSelectWidth={252}
          style={{ width: 300 }}
          options={options}
          onChange={Search}
          size="large"
        >
          <Input.Search size="large" placeholder="Qidirish..." enterButton />
        </AutoComplete>
        <Button
          style={{ padding: "20px 25px", fontSize: "18px" }}
          type="primary"
          onClick={() => navigate("/debtors/add")}
        >
          <UserAddOutlined />
          Yaratish
        </Button>
      </Row>
      <Table
        scroll={{ y: "calc(108vh - 250px)" }}
        loading={isLoading}
        columns={columns}
        dataSource={dataSource}
      />
    </Col>
  );
};
