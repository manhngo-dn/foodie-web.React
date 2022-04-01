import React, { useEffect, useState } from "react";
import { Space, Tabs, Avatar } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  LockOutlined,
  AimOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

import * as S from "./styles";
import { ROUTERS } from "../../constants/routers";

import ChangeUserInfoTab from "./components/ChangeUserInfoTab";
import ChangePasswordTab from "./components/ChangePasswordTab";
import ChangeLocationTab from "./components/ChangeLocationTab";
import PurchaseHistoryTab from "./components/PurchaseHistoryTab";

import { changeBreadcrumbAction } from "../../redux/actions";

const UserInfoPage = () => {
  const [activeKey, setActiveKey] = useState("1");

  const { userInfo } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    dispatch(
      changeBreadcrumbAction([
        { name: "Trang chủ", path: ROUTERS.HOME },
        { name: "Thông tin cá nhân" },
      ])
    );
  }, []);

  if (!accessToken) return <Navigate to={ROUTERS.HOME} />;
  return (
    <S.Wrapper>
      <S.UserName>
        <Space>
          <Avatar
            style={{ backgroundColor: "#ee4d2d" }}
            icon={<UserOutlined />}
          />
          <h3>{userInfo.data.fullName}</h3>
        </Space>
      </S.UserName>
      <Tabs
        onChange={(key) => setActiveKey(key)}
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
          <ChangeUserInfoTab activeKey={activeKey} />
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={
            <Space>
              <LockOutlined /> Thay đổi mật khẩu
            </Space>
          }
          key="2"
        >
          <ChangePasswordTab activeKey={activeKey} />
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={
            <Space>
              <AimOutlined /> Thay đổi địa chỉ
            </Space>
          }
          key="3"
        >
          <ChangeLocationTab activeKey={activeKey} />
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={
            <Space>
              <ShoppingCartOutlined /> Lịch sử mua hàng
            </Space>
          }
          key="4"
        >
          <PurchaseHistoryTab activeKey={activeKey} />
        </Tabs.TabPane>
      </Tabs>
    </S.Wrapper>
  );
};
export default UserInfoPage;
