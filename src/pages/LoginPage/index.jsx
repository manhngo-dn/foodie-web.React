import React, { useEffect, useState } from "react";
import { Tabs, Form, Input, Button } from "antd";
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
      <img src={banner} alt="banner" />
      <S.LoginForm>
        <Tabs
          centered={true}
          size="large"
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key);
          }}
        >
          <Tabs.TabPane tab="Đăng nhập" key="signIn">
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
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ" },
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
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Mật khẩu"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  block
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đăng ký" key="signUp">
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
                label="Họ và tên"
                name="fullName"
                rules={[
                  { required: true, message: "Vui lòng nhập họ và tên!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input type="password" placeholder="Mật khẩu" />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Xác nhận mật khẩu"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng xác nhận mật khẩu!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "Hai mật khẩu không khớp nhau, vui lòng nhập lại!"
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
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
        </Tabs>
        <S.BackToHome onClick={() => navigate(ROUTERS.HOME)}>
          <HomeOutlined /> Quay lại trang chủ
        </S.BackToHome>
      </S.LoginForm>
    </S.LoginPageContent>
  );
};

export default LoginPage;
