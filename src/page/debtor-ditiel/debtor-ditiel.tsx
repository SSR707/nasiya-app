import {
  Button,
  Col,
  Dropdown,
  Flex,
  MenuProps,
  Modal,
  notification,
  Rate,
  Row,
  Space,
  Spin,
} from "antd";
import Title from "antd/es/typography/Title";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import MenuIcon from "../../assets/svg/menu.svg";
import "./style/style.css";
import { useGetDebtorById } from "./service/query/useGetDebtorById";
import dayjs from "dayjs";
import { DebtCard } from "./components/debt-card";
import { useGetDebtorLIke } from "./service/mutation/useGetDebtorLIke";
import { client } from "../../config/query-client";
import { useState } from "react";
import { useDeleteDebtor } from "./service/mutation/useDeleteDebtor";
import { useGetDebtsNextPay } from "./service/query/useGetDebtNextPay";
import { BackBtn } from "../../components/back-btn";
export const DebtorDitiel = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetDebtorById(id);
  const debts = data?.debtor.debts;
  const [api, contextHolder] = notification.useNotification();
  const [modal2Open, setModal2Open] = useState(false);
  const { mutate: deleteMutate } = useDeleteDebtor();
  const nextPaymentsData = useGetDebtsNextPay(debts || []);
  const nextPay = nextPaymentsData.map((items) => items.data).filter(Boolean);
  console.log(nextPay);
  const navigate = useNavigate();
  const { mutate } = useGetDebtorLIke();
  const deleteDebtor = () => {
    deleteMutate(id, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ["debtors"] });
        setModal2Open(false);
        api.success({
          message: "Muvaffaqiyatli ochirildi",
          description: "Debtor ma'lumoti muvaffaqiyatli Ochirildi!",
        });
        setTimeout(() => {
          navigate("/debtors", { replace: true });
        }, 200);
      },
      onError: (error) => {
        console.log(error);
        api.error({
          message: "Error",
          description: `Xatolik Yuz berdi! ${error}`,
        });
      },
    });
  };
  const LikeOnUnLike = () => {
    mutate(id, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ["debtor", id] });
      },
    });
  };
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "1") {
      navigate(`/debtors/edit/${id}`);
    }
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
  const menuProps = {
    items,
    onClick: handleMenuClick,
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
      ) : (
        <Row
          style={{
            margin: " 20px  36px",
            gap: "22px",
            height: "64vh",
            position: "relative",
          }}
        >
          {contextHolder}
          <BackBtn />
          <Col
            style={{
              width: "40%",
            }}
          >
            <Row
              style={{
                padding: "27px 30px",
                background: "var(--primary-02)",
                borderRadius: "20px",
                width: "100%",
                margin: "0px 0px 20px 0px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Title
                level={3}
                style={{
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "var(--text)",
                  margin: 0,
                }}
              >
                {data?.debtor?.full_name}
              </Title>
              <Row style={{ gap: "10px", alignItems: "center" }}>
                <Rate
                  count={1}
                  value={data?.debtor?.likes?.length === 1 ? 1 : 0}
                  onChange={() => {
                    LikeOnUnLike();
                  }}
                  style={{ fontSize: "25px" }}
                />
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
            </Row>
            <Col
              style={{
                padding: "25px 30px",
                background: "var(--primary-02)",
                borderRadius: "20px",
                width: "100%",
                margin: "0px 0px 20px 0px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Title
                level={4}
                style={{
                  fontWeight: 700,
                  fontSize: "15px",
                  color: "var(--text)",
                  margin: "0px 0px 3px 0px",
                }}
              >
                Umumiy nasiya:
              </Title>
              <Title
                level={3}
                style={{
                  fontWeight: 800,
                  fontSize: "30px",
                  color: "var(--text)",
                  margin: 0,
                }}
              >
                {(data?.total_debts.data.total_debt ?? 0).toLocaleString()}{" "}
                <span style={{ fontWeight: 400, fontSize: "25px" }}>so‘m</span>
              </Title>
            </Col>
          </Col>
          <Col
            style={{
              padding: "35px 45px",
              background: "var(--primary-02)",
              borderRadius: "20px",
              width: "58%",
              margin: "0px 0px 20px 0px",
            }}
          >
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
              {debts && debts.length > 0 ? (
                debts.map((item) => {
                  const result = nextPay?.find(
                    (items) => items.debtId === item.id
                  );
                  return (
                    <li key={item.id} className="list_item-debtor">
                      <Link to={`/debt/${item.id}`}>
                        <DebtCard
                          date={dayjs(item.debt_date).format(
                            "MMM D, YYYY HH:mm"
                          )}
                          debt_sum={item.debt_sum}
                          next_pay_date={dayjs(result?.next_pay_date).format(
                            "MMM D, YYYY HH:mm"
                          )}
                          next_pay_sum={
                            typeof result?.nextMonth === "number"
                              ? item?.month_sum
                              : result?.nextMonth
                          }
                          paidPercentage={result?.paidPercentage}
                        />
                      </Link>
                    </li>
                  );
                })
              ) : (
                <Col
                  style={{
                    height: "100%",
                    width: "100%",
                    textAlign: "center",
                    marginTop: "20%",
                  }}
                >
                  <Title
                    level={4}
                    style={{
                      fontWeight: 700,
                      fontSize: "20px",
                      color: "var(--text)",
                      margin: "0px 0px 10px 0px",
                    }}
                  >
                    Mijozda hali nasiya mavjud emas
                  </Title>
                  <Title
                    level={4}
                    style={{
                      fontWeight: 600,
                      fontSize: "15px",
                      color: "var(--text)",
                      margin: "0px auto 3px auto",
                      maxWidth: "240px",
                    }}
                  >
                    Nasiya yaratish uchun pastdagi “+” tugmasini bosing
                  </Title>
                </Col>
              )}
            </ul>
          </Col>
          <Button
            style={{
              position: "absolute",
              right: 10,
              bottom: "-40px",
              borderRadius: "10px",
              padding: "25px 30px",
              fontWeight: 600,
              fontSize: "18px",
              color: "var( --neutral-05)",
              backgroundColor: "var(--brand)",
            }}
            onClick={() => navigate(`/debtor/${id}/debt/add`)}
          >
            <PlusOutlined />
            Qoshish
          </Button>
          <Modal
            centered
            open={modal2Open}
            onOk={() => deleteDebtor()}
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
        </Row>
      )}
    </>
  );
};
