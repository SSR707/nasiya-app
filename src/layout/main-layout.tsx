import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Button, Col, Layout, Menu, Row } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useGetUserCheck } from "../page/login/service/query/useGetUserCheck";
import { loadState } from "../config/storage";
import Title from "antd/es/typography/Title";
import EssyCeditLogo from "../assets/svg/Easycredit-logo.svg";
import UserImg from "../assets/svg/defaultUserimg.jpg";
import Calendar from "../assets/svg/kalendar.svg";

const { Header, Sider, Content } = Layout;
const MainLayout: React.FC = () => {
  const { isLoading, error, data } = useGetUserCheck();
  const location = useLocation();
  const locationPath: Record<string, string> = {
    "/": "Bosh sahifa",
    "/debtors": "Mijozlar",
    "/debtors/add": "Mijoz Yaratish",
  };

  const locationNum: Record<string, string> = {
    "/": "1",
    "/debtors": "2-1",
    "/debtors/add": "2-2",
  };
  const pagesNum: string = location.pathname.startsWith("/debtor/")
    ? "0"
    : locationNum[location.pathname] || "1";
  const pagesName: string = location.pathname.startsWith("/debtor/")
    ? "Mijoz"
    : locationPath[location.pathname] || "Sahifa Topilmadi";
  const navigate = useNavigate();
  const token = loadState("AccessToken");
  useEffect(() => {
    if ((!isLoading && error) || !token) {
      navigate("/login", { replace: true });
    }
  }, [navigate, error, isLoading]);

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout
      style={{ minHeight: "100vh", backgroundColor: "var(--neutral-05)" }}
      className="main-layout"
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: "var(--neutral-05)" }}
      >
        <div
          className="demo-logo-vertical"
          style={{ textAlign: "center", padding: "16px" }}
        >
          <img src={EssyCeditLogo} alt="Logo" style={{ width: "80%" }} />
        </div>
        <Menu
          style={{ backgroundColor: "var(--neutral-05)" }}
          mode="inline"
          defaultSelectedKeys={[pagesNum]}
          items={[
            {
              key: "1",
              icon: <MenuFoldOutlined />,
              label: (
                <Link
                  to="/"
                  style={{
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "157%",
                    color: "var(--text)",
                  }}
                >
                  Bosh sahifa
                </Link>
              ),
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: (
                <Title
                  level={3}
                  style={{
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "157%",
                    color: "var(--text)",
                  }}
                >
                  MIjozlar
                </Title>
              ),
              children: [
                {
                  key: "2-1",
                  icon: <UserOutlined />,
                  label: (
                    <Link
                      to="/debtors"
                      style={{
                        fontWeight: 600,
                        fontSize: "14px",
                        lineHeight: "157%",
                        color: "var(--text)",
                      }}
                    >
                      MIjozlar
                    </Link>
                  ),
                },
                {
                  key: "2-2",
                  icon: <UserAddOutlined />,
                  label: (
                    <Link
                      to="/debtors/add"
                      style={{
                        fontWeight: 600,
                        fontSize: "14px",
                        lineHeight: "157%",
                        color: "var(--text)",
                      }}
                    >
                      Mijoz Yaratish
                    </Link>
                  ),
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0px 40px 0px 0px",
            background: "var(--primary-02)",
          }}
        >
          <Row align={"middle"} justify={"space-between"}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Row align={"middle"} style={{ gap: "15px" }}>
              <Title
                level={4}
                style={{
                  fontWeight: 700,
                  fontSize: "16px",
                  lineHeight: "122%",
                  color: "var(--text)",
                  margin: 0,
                }}
              >
                {data?.data?.fullname}
              </Title>
              <Row
                style={{
                  width: "36px",
                  height: "33px",
                  borderRadius: "100%",
                  overflow: "hidden",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={UserImg}
                  alt=""
                  width="100%"
                  height="100%"
                  style={{ objectFit: "cover" }}
                />
              </Row>
            </Row>
          </Row>
        </Header>
        <Content
          style={{
            margin: 0,
            padding: 0,
            background: "var(--primary-02)",
            borderRadius: "2px",
            backgroundColor: "#F2F5FA",
          }}
        >
          <Row
            style={{
              margin: "20px 36px",
              padding: "22px 24px",
              background: "var(--primary-02)",
              borderRadius: "20px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Col>
              <Title
                level={3}
                style={{
                  fontWeight: 700,
                  fontSize: "18px",
                  lineHeight: "122%",
                  color: "var(--text)",
                  margin: 0,
                }}
              >
                Dashboard
              </Title>
              <Title
                level={3}
                style={{
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "157%",
                  color: "var(--text)",
                }}
              >
                {pagesName}
              </Title>
            </Col>
            {location.pathname === "/" ? (
              <Button style={{ padding: "25px 15px", borderRadius: "15px" }}>
                <img src={Calendar} alt="" width={"35px"} height={"35px"} />
              </Button>
            ) : null}
          </Row>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
