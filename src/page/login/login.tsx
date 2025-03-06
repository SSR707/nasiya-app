import { Row, Form, Input, Button } from "antd";
import { Content } from "antd/es/layout/layout";
import type { FormProps } from "antd";
import LoginLogo from "../../assets/svg/login-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { usePostLoginUser } from "./service/mutation/usePostLoginUser";
import { loadState, saveState } from "../../config/storage";
import { useEffect } from "react";
import { useGetUserCheck } from "./service/query/useGetUserCheck";

export interface FieldType {
  login?: string;
  password?: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetUserCheck();
  const token = loadState("AccessToken");
  useEffect(() => {
    if (token) {
      if (!isLoading && data) {
        navigate("/", { replace: true });
      }
    }
  }, [navigate, data, isLoading]);

  const [form] = Form.useForm();
  const { mutate, isPending } = usePostLoginUser();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    mutate(
      { login: values.login?.trim(), password: values.password?.trim() },
      {
        onSuccess: (data) => {
          const { accessToken, access_token_expire } = data.data;
          saveState("AccessToken", { accessToken, access_token_expire });
          navigate("/", { replace: true });
        },
        onError: (error: any) => {
          const errorMessage = error.response?.data?.message || "Login xatosi";

          form.setFields([
            {
              name: "login",
              errors: [errorMessage],
            },
            {
              name: "password",
              errors: [errorMessage],
            },
          ]);
        },
      }
    );
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--neutral-05)" }}>
      <Content
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <Row style={{ paddingTop: "64px", gap: "76px " }} align={"middle"}>
          <Row>
            <img src={LoginLogo} alt="" />
          </Row>
          <Row
            style={{
              boxShadow: "0 50px 100px 0 rgba(56, 131, 146, 0.2)",
              borderRadius: "24px",
              padding: "80px 48px 50px 48px",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <Title
              level={2}
              style={{
                fontWeight: 700,
                fontSize: "32px",
                color: "var(--text)",
                marginBottom: "32px",
              }}
            >
              {" "}
              Xush kelibsiz
            </Title>

            <Form
              name="basic"
              style={{
                maxWidth: "400px",
                width: "100%",
              }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
              requiredMark={false}
            >
              <Form.Item<FieldType>
                label="Login"
                name="login"
                style={{
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "14px",
                  lineHeight: "129%",
                  letterSpacing: "0.02em",
                  color: "var(--text)",
                }}
                rules={[{ required: true, message: "Please input your Login" }]}
              >
                <Input
                  style={{
                    padding: "12px 16px 12px 16px",
                    fontWeight: "400",
                    fontSize: "17px",
                    lineHeight: "150%",
                    letterSpacing: "0.01em",
                    color: "var(--text)",
                  }}
                />
              </Form.Item>

              <Form.Item<FieldType>
                label="Password"
                name="password"
                style={{
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "14px",
                  lineHeight: "129%",
                  letterSpacing: "0.02em",
                  color: "var(--text)",
                }}
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  style={{
                    padding: "12px 16px 12px 16px",
                    fontWeight: "400",
                    fontSize: "16px",
                    lineHeight: "150%",
                    letterSpacing: "0.01em",
                    color: "var(--text)",
                  }}
                />
              </Form.Item>
              <Row
                style={{ width: "100%", marginBottom: "40px" }}
                justify={"end"}
              >
                {" "}
                <Link to={"/"}>Parolni unutdingizmi?</Link>
              </Row>
              <Form.Item label={null}>
                <Button
                  type="primary"
                  loading={isPending}
                  htmlType="submit"
                  style={{
                    padding: "22px 50px",
                    fontWeight: "600",
                    fontSize: "18px",
                    textAlign: "center",
                    color: "var(--primary-02)",
                    width: "100%",
                  }}
                >
                  Kirish
                </Button>
              </Form.Item>
              <Title
                level={5}
                style={{
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "var(--text)",
                  marginTop: "10px",
                }}
              >
                {" "}
                <a href="">do'kon administratori </a>bilan bog'lanish
              </Title>
            </Form>
          </Row>
        </Row>
      </Content>
    </div>
  );
};
