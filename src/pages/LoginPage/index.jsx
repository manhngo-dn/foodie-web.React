import React, { useEffect, useState } from "react";
import { Tabs, Form, Input, Button, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined, HomeOutlined } from "@ant-design/icons";

import { signUpAction, signInAction } from "../../redux/actions";
import { ROUTERS } from "../../constants/routers";

import * as S from "./styles";
import banner from "../../assets/images/banner.jpg";

const LoginPage = () => {
  const [activeKey, setActiveKey] = useState("signIn");

  const [signInForm] = Form.useForm();
  const [signUpForm] = Form.useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signUpData } = useSelector((state) => state.userReducer);
  const { signInData } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (signInData.errors) {
      signInForm.setFields([
        {
          name: "email",
          errors: [""],
        },
        {
          name: "password",
          errors: [signInData.errors],
        },
      ]);
    }
  }, [signInData.errors]);

  useEffect(() => {
    if (signUpData.errors) {
      signUpForm.setFields([
        {
          name: "email",
          errors: [signUpData.errors],
        },
      ]);
    }
  }, [signUpData.errors]);

  const handleSignIn = (values) => {
    dispatch(
      signInAction({
        data: {
          email: values.email,
          password: values.password,
        },
        callback: {
          redirectHome: () => {
            navigate(ROUTERS.HOME);
          },
        },
      })
    );
  };

  const handleSignUp = (values) => {
    dispatch(
      signUpAction({
        data: {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
        },
        callback: {
          redirectSignIn: () => {
            setActiveKey("signIn");
          },
        },
      })
    );
  };

  return (
    <S.LoginPageContent>
      <Row gutter={[16, 16]} align="middle">
        <Col xl={16} lg={14} md={12} sm={10} xs={24}>
          <img src={banner} alt="banner" width="100%" height="auto" />
        </Col>
        <Col xl={8} lg={10} md={12} sm={14} xs={24}>
          <S.LoginForm>
            <Tabs
              centered={true}
              size="large"
              activeKey={activeKey}
              onChange={(key) => {
                setActiveKey(key);
              }}
            >
              <Tabs.TabPane tab="????ng nh???p" key="signIn">
                <Form
                  form={signInForm}
                  name="signInForm"
                  layout="vertical"
                  initialValues={{ remember: true }}
                  autoComplete="off"
                  onFinish={(values) => {
                    handleSignIn(values);
                  }}
                  style={{ padding: "0 2px" }}
                >
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Vui l??ng nh???p email!" },
                      { type: "email", message: "Email kh??ng h???p l???" },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      type="email"
                      placeholder="Email"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: "Vui l??ng nh???p m???t kh???u!" },
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="M???t kh???u"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      block
                    >
                      ????ng nh???p
                    </Button>
                  </Form.Item>
                </Form>
              </Tabs.TabPane>
              <Tabs.TabPane tab="????ng k??" key="signUp">
                <Form
                  form={signUpForm}
                  name="signUpForm"
                  layout="vertical"
                  initialValues={{ remember: true }}
                  autoComplete="off"
                  onFinish={(values) => {
                    handleSignUp(values);
                  }}
                  style={{ padding: "0 2px" }}
                >
                  <Form.Item
                    label="H??? v?? t??n"
                    name="fullName"
                    rules={[
                      { required: true, message: "Vui l??ng nh???p h??? v?? t??n!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Vui l??ng nh???p email!" },
                      { type: "email", message: "Email kh??ng h???p l???" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="M???t kh???u"
                    name="password"
                    rules={[
                      { required: true, message: "Vui l??ng nh???p m???t kh???u!" },
                    ]}
                  >
                    <Input type="password" placeholder="M???t kh???u" />
                  </Form.Item>

                  <Form.Item
                    name="confirm"
                    label="X??c nh???n m???t kh???u"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Vui l??ng x??c nh???n m???t kh???u!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "Hai m???t kh???u kh??ng kh???p nhau, vui l??ng nh???p l???i!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      block
                      loading={signUpData.loading}
                    >
                      ????ng k??
                    </Button>
                  </Form.Item>
                </Form>
              </Tabs.TabPane>
            </Tabs>
            <S.BackToHome onClick={() => navigate(ROUTERS.HOME)}>
              <HomeOutlined /> Quay l???i trang ch???
            </S.BackToHome>
          </S.LoginForm>
        </Col>
      </Row>
    </S.LoginPageContent>
  );
};

export default LoginPage;
