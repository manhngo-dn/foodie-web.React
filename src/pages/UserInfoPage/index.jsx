import React, { useState } from "react";
import { Space, Tabs } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  LockOutlined,
  AimOutlined,
} from "@ant-design/icons";
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import * as S from "./styles";
import { ROUTERS } from "../../constants/routers";

import ChangeUserInfoTab from "./components/ChangeUserInfoTab";
import ChangePasswordTab from "./components/ChangePasswordTab";
import ChangeLocationTab from "./components/ChangeLocationTab";

const UserInfoPage = () => {
  const [activeKey, setActiveKey] = useState("1");
  const { userInfo } = useSelector((state) => state.userReducer);

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return <Navigate to={ROUTERS.HOME} />;

  return (
    <S.Wrapper>
      <S.UserName>
        <FaUserAlt
          style={{
            width: "2em",
            height: "2em",
            marginRight: "15px",
          }}
        />
        {userInfo.data.fullName}
      </S.UserName>
      <Tabs
        onChange={(key) => {
          setActiveKey(key);
        }}
        tabPosition={"left"}
        size={"large"}
        tabBarStyle={{ width: "25%" }}
      >
        <Tabs.TabPane
          tab={
            <Space>
              <UserOutlined /> Cập nhật tài khoản
            </Space>
          }
          key="1"
        >
          <ChangeUserInfoTab activeKey />
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={
            <Space>
              <LockOutlined /> Thay đổi mật khẩu
            </Space>
          }
          key="2"
        >
          <ChangePasswordTab activeKey />
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={
            <Space>
              <AimOutlined /> Thay đổi địa chỉ
            </Space>
          }
          key="3"
        >
          <ChangeLocationTab activeKey />
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={
            <Space>
              <ShoppingCartOutlined /> Lịch sử mua hàng
            </Space>
          }
          key="4"
        >
          Content of Tab 2
        </Tabs.TabPane>
      </Tabs>
    </S.Wrapper>
  );
};
export default UserInfoPage;
