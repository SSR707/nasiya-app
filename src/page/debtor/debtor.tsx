import {
  AutoComplete,
  AutoCompleteProps,
  Button,
  Col,
  Image,
  Input,
  Row,
  Table,
} from "antd";
import { useState } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import { useGetAllDebtors } from "./service/query/useGetAllDebtors";
import { useNavigate } from "react-router-dom";
export const columns = [
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
    title: "Imge",
    dataIndex: "image",
    key: "image",
    render: (url: string) => {
      return <Image width={80} height={80} src={url} />;
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
];

export const Debtor = () => {
  const [options] = useState<AutoCompleteProps["options"]>([]);

  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllDebtors(search);
  const dataSource = data?.data?.debtors.map((Item, index) => ({
    key: Item.id,
    id: index + 1,
    full_name: Item.full_name,
    phone_number: Item.phone_number,
    image: Item.image,
    address: Item.address,
    title: Item.note,
  }));
  const Search = (value: string) => {
    setSearch(value);
  };

  return (
    <Col
      style={{
        margin: " 36px  36px",
        gap: "20px",
      }}
    >
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
        scroll={{ y: "calc(88vh - 250px)" }}
        loading={isLoading}
        columns={columns}
        dataSource={dataSource}
      />
    </Col>
  );
};
