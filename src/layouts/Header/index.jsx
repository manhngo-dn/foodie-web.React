import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Menu, Dropdown, Avatar, Space, Drawer } from "antd";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";

import logo from "../../foodie-logo.png";
import * as S from "./styles";
import { ROUTERS } from "../../constants/routers";
import { PAGING } from "../../constants/paging";
import {
  getCategoryListAction,
  getShopListAction,
  signOutAction,
} from "../../redux/actions";

const Header = () => {
  const [isShowSidebar, setIsShowSidebar] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { serviceList } = useSelector((state) => state.serviceReducer);

  const { userInfo } = useSelector((state) => state.userReducer);

  const renderNavbarItems = () => {
    return serviceList.data.map((item, index) => {
      return (
        <div key={index}>
          {location.pathname === item.path ? (
            <S.NavbarActiveItem>{item.name}</S.NavbarActiveItem>
          ) : (
            <S.NavbarItem
              onClick={() => {
                navigate(item.path);
                dispatch(
                  getCategoryListAction({
                    path: item.path,
                  })
                );
                dispatch(
                  getShopListAction({
                    path: item.path,
                    page: 1,
                    limit: PAGING.PRODUCT_LIST,
                  })
                );
              }}
            >
              {item.name}
            </S.NavbarItem>
          )}
        </div>
      );
    });
  };

  const renderSidebarItems = () => {
    return serviceList.data.map((item, index) => {
      return (
        <div key={index}>
          {location.pathname === item.path ? (
            <S.SidebarActiveItem>{item.name}</S.SidebarActiveItem>
          ) : (
            <S.SidebarItem
              onClick={() => {
                navigate(item.path);
                dispatch(
                  getCategoryListAction({
                    path: item.path,
                  })
                );
                dispatch(
                  getShopListAction({
                    path: item.path,
                    page: 1,
                    limit: PAGING.PRODUCT_LIST,
                  })
                );
                setIsShowSidebar(false);
              }}
            >
              {item.name}
            </S.SidebarItem>
          )}
        </div>
      );
    });
  };

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    dispatch(signOutAction());
  };

  return (
    <S.HeaderWrapper>
      <S.HeaderContainer>
        <S.HeaderContent>
          <S.LogoWrapper>
            <Space size={16}>
              <S.MenuButton>
                <Button
                  type="primary"
                  ghost
                  icon={<MenuOutlined />}
                  onClick={() => setIsShowSidebar(true)}
                ></Button>
              </S.MenuButton>
              <S.Logo
                src={logo}
                alt="logo"
                onClick={() => {
                  navigate(ROUTERS.HOME);
                }}
              />
            </Space>
          </S.LogoWrapper>
          <S.MainNavbar>{renderNavbarItems()}</S.MainNavbar>

          <S.userAccount>
            {userInfo.data.id ? (
              <Dropdown
                trigger={["click"]}
                overlay={
                  <Menu>
                    <Menu.Item
                      key={"userInfo"}
                      onClick={() => navigate(ROUTERS.USER_INFO)}
                    >
                      Thông tin cá nhân
                    </Menu.Item>
                    <Menu.Item key={"signOut"} onClick={() => handleSignOut()}>
                      Đăng xuất
                    </Menu.Item>
                  </Menu>
                }
              >
                <S.UserButton>
                  <Space>
                    <Avatar
                      size={36}
                      style={{ backgroundColor: "#ee4d2d" }}
                      icon={<UserOutlined />}
                    />
                    <S.UserName>{userInfo.data.fullName}</S.UserName>
                  </Space>
                </S.UserButton>
              </Dropdown>
            ) : (
              <Button
                type="default"
                style={{
                  color: "#ee4d2d",
                  border: "1px solid #ee4d2d",
                  borderRadius: "4px",
                }}
                size="large"
                onClick={() => navigate(ROUTERS.SIGN_IN)}
              >
                Đăng nhập
              </Button>
            )}
          </S.userAccount>
        </S.HeaderContent>
      </S.HeaderContainer>
      <Drawer
        width={250}
        placement="left"
        closable={false}
        onClose={() => setIsShowSidebar(false)}
        visible={isShowSidebar}
      >
        {renderSidebarItems()}
      </Drawer>
    </S.HeaderWrapper>
  );
};
export default Header;
