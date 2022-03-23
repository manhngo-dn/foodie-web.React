import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";

import * as S from "./styles";

const ChangePasswordTab = (activeKey) => {
  const [changePasswordForm] = Form.useForm();

  useEffect(() => {
    changePasswordForm.resetFields();
  }, [activeKey]);

  return (
    <div>
      <S.HeadingText>Thay đổi mật khẩu</S.HeadingText>
      <S.DetailContainer>
        <Form
          form={changePasswordForm}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          onFinish={() => {}}
          onFinishFailed={() => {}}
          autoComplete="off"
        >
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your current password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please input your current password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="button" onClick={() => {}}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </S.DetailContainer>
    </div>
  );
};

export default ChangePasswordTab;
