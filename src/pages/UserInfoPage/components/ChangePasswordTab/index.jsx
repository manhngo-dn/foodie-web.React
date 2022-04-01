import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { changePasswordAction } from "../../../../redux/actions";

import * as S from "./styles";

const ChangePasswordTab = ({ activeKey }) => {
  const [changePasswordForm] = Form.useForm();

  const dispatch = useDispatch();
  const { userInfo, changePasswordData } = useSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    changePasswordForm.resetFields();
  }, [activeKey]);

  useEffect(() => {
    if (changePasswordData.errors) {
      changePasswordForm.setFields([
        {
          name: "oldPassword",
          errors: [changePasswordData.errors],
        },
      ]);
    }
  }, [changePasswordData.errors]);

  const handleChangePassword = (values) => {
    dispatch(
      changePasswordAction({
        id: userInfo.data.id,
        data: {
          ...values,
          email: userInfo.data.email,
        },
        callback: {
          clearForm: () => changePasswordForm.resetFields(),
        },
      })
    );
  };

  return (
    <div>
      <S.HeadingText>Thay đổi mật khẩu</S.HeadingText>
      <S.DetailContainer>
        <Form
          form={changePasswordForm}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          onFinish={(values) => handleChangePassword(values)}
        >
          <Form.Item
            label="Mật khẩu cũ"
            name="oldPassword"
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
            label="Mật khẩu mới"
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
            label="Xác nhận mật khẩu"
            name="confirmPassword"
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
            <Button type="primary" htmlType="submit">
              Thay đổi
            </Button>
          </Form.Item>
        </Form>
      </S.DetailContainer>
    </div>
  );
};

export default ChangePasswordTab;
