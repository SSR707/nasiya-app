import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Col, Layout, Menu, Row } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetUserCheck } from "../page/login/service/query/useGetUserCheck";
import { loadState } from "../config/storage";
import Title from "antd/es/typography/Title";
import EssyCeditLogo from "../assets/svg/Easycredit-logo.svg";
import UserImg from "../assets/svg/defaultUserimg.jpg";

const { Header, Sider, Content } = Layout;
const MainLayout: React.FC = () => {
  const { isLoading, error, data } = useGetUserCheck();
  console.log(data);
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
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <MenuFoldOutlined />,
              label: "Bosh sahifa",
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
          <Col
            style={{
              margin: "16px 36px",
              padding: "22px 24px",
              background: "var(--primary-02)",
              borderRadius: "20px",
            }}
          >
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
              Bosh sahifa
            </Title>
          </Col>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
