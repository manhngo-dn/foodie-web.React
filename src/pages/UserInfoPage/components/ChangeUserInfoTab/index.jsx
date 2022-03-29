import React, { useState, useMemo, useEffect } from "react";
import { Button, Col, Row, Space, Form, Input, notification } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfoAction } from "../../../../redux/actions";

import * as S from "./styles";

const ChangeUserInfoTab = (activeKey) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const { userInfo } = useSelector((state) => state.userReducer);

  useEffect(() => {
    setIsEdit(false);
  }, [activeKey]);

  const renderUserInfo = useMemo(() => {
    return (
      <Space direction="vertical" size="large">
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <S.LabelText>Họ và tên:</S.LabelText>
          </Col>
          <Col span={16}>{userInfo.data.fullName}</Col>
          <Col span={8}>
            <S.LabelText>Email:</S.LabelText>
          </Col>
          <Col span={16}>{userInfo.data.email}</Col>
          <Col span={8}>
            <S.LabelText>Số điện thoại:</S.LabelText>
          </Col>
          {userInfo.data.phoneNumber ? (
            <Col span={16}>(+84) {userInfo.data.phoneNumber}</Col>
          ) : (
            <Col span={16}>Chưa cập nhật</Col>
          )}
        </Row>
        <Button type="primary" size="large" onClick={() => setIsEdit(true)}>
          Sửa
        </Button>
      </Space>
    );
  }, [userInfo]);

  const renderEditUserInfo = useMemo(() => {
    return (
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{
          fullName: userInfo.data.fullName,
          email: userInfo.data.email,
          phoneNumber: userInfo.data.phoneNumber,
        }}
        onFinish={(values) => handleChangeUserInfo(values)}
        onFinishFailed={() => setIsEdit(false)}
        autoComplete="off"
      >
        <Form.Item
          label="Họ và tên"
          name="fullName"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
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

        <Form.Item label="Số điện thoại" name="phoneNumber" rules={[]}>
          <Input addonBefore="+84" />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
          <Button htmlType="submit" type="primary">
            Thay đổi
          </Button>
          <Button
            htmlType="button"
            style={{ margin: "0 8px" }}
            onClick={() => setIsEdit(false)}
          >
            Hủy bỏ
          </Button>
        </Form.Item>
      </Form>
    );
  }, [userInfo.data]);

  const handleChangeUserInfo = (values) => {
    notification.success({
      message: "Thay đổi thành công",
      description: "Thông tin cá nhân của bạn đã được thay đổi!",
    });
    dispatch(
      updateUserInfoAction({
        id: userInfo.data.id,
        fullName: values.fullName,
        email: values.email,
        phoneNumber: values.phoneNumber,
      })
    );

    setIsEdit(false);
  };

  return (
    <div>
      <S.HeadingText>Thông tin người dùng</S.HeadingText>
      <S.DetailContainer>
        {isEdit ? renderEditUserInfo : renderUserInfo}
      </S.DetailContainer>
    </div>
  );
};

export default ChangeUserInfoTab;
