import { Col, Flex, Image, Row, Spin, Upload } from "antd";
import Title from "antd/es/typography/Title";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { useGetUserProfile } from "../../layout/service/query/useGetUserProfile";

export const Profile = () => {
  const { data, isLoading } = useGetUserProfile();
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {false ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

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
        <Col
          style={{
            margin: " 20px  36px",
            gap: "25px",
          }}
        >
          <Col
            style={{
              padding: "27px 50px",
              background: "var(--primary-02)",
              borderRadius: "20px",
              width: "40%",
              margin: "0px 0px 20px 0px",
            }}
          >
            <Title
              level={3}
              style={{
                fontWeight: 600,
                fontSize: "32px",
                color: "var(--text)",
                margin: "0px",
              }}
            >
              Shaxsiy ma'lumotlar
            </Title>
          </Col>
          <Col
            style={{
              padding: "27px 50px",
              background: "var(--primary-02)",
              borderRadius: "20px",
              width: "40%",
              margin: "0px 0px 20px 0px",
            }}
          >
            <Row justify={"center"}>
              {data?.data?.image ? (
                <Image
                  width={200}
                  height={200}
                  src={data?.data?.image}
                  style={{ borderRadius: "100%" }}
                />
              ) : (
                <Upload
                  name="avatar"
                  listType="picture-circle"
                  className="avatar-uploader"
                  maxCount={1}
                >
                  {uploadButton}
                </Upload>
              )}
            </Row>
            <ul
              style={{
                listStyle: "none",
                margin: "20px",
              }}
            >
              <li>
                {" "}
                <Title
                  level={3}
                  style={{
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "var(--text)",
                    margin: "0px 0px 5px 0px",
                  }}
                >
                  Ismi familiya
                </Title>
                <Title
                  level={3}
                  style={{
                    fontWeight: 600,
                    fontSize: "18px",
                    color: "var(--text)",
                    margin: "0px 0px 20px 0px",
                  }}
                >
                  {data?.data?.fullname}
                </Title>
              </li>
              <li>
                {" "}
                <Title
                  level={3}
                  style={{
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "var(--text)",
                    margin: "0px 0px 5px 0px",
                  }}
                >
                  Telefon raqam
                </Title>
                <Title
                  level={3}
                  style={{
                    fontWeight: 600,
                    fontSize: "18px",
                    color: "var(--text)",
                    margin: "0px 0px 20px 0px",
                  }}
                >
                  {data?.data?.phone_number}
                </Title>
              </li>
              <li>
                {" "}
                <Title
                  level={3}
                  style={{
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "var(--text)",
                    margin: "0px 0px 5px 0px",
                  }}
                >
                  Elektron pochta
                </Title>
                <Title
                  level={3}
                  style={{
                    fontWeight: 600,
                    fontSize: "18px",
                    color: "var(--text)",
                    margin: "0px 0px 20px 0px",
                  }}
                >
                  {data?.data?.email}
                </Title>
              </li>
            </ul>
          </Col>
        </Col>
      )}
    </>
  );
};
