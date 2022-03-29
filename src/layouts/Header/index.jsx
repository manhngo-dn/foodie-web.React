import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUserAlt } from "react-icons/fa";

import logo from "../../foodie-logo.png";
import * as S from "./styles";
import { ROUTERS } from "../../constants/routers";
import { PAGING } from "../../constants/paging";
import {
  getCategoryListAction,
  getShopListAction,
  signOutAction,
} from "../../redux/actions";

import { Button, Menu, Dropdown } from "antd";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { serviceList } = useSelector((state) => state.serviceReducer);

  const { userInfo } = useSelector((state) => state.userReducer);

  const RenderNavbarItems = () => {
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

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    dispatch(signOutAction());
  };

  return (
    <S.HeaderWrapper>
      <S.HeaderContainer>
        <S.HeaderContent>
          <S.LogoWrapper>
            <S.Logo
              src={logo}
              alt="logo"
              onClick={() => {
                navigate(ROUTERS.HOME);
              }}
            />
          </S.LogoWrapper>
          <S.Navbar>
            <S.MainNavbar>{RenderNavbarItems()}</S.MainNavbar>

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
                      <Menu.Item
                        key={"signOut"}
                        onClick={() => handleSignOut()}
                      >
                        Đăng xuất
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <S.userButton>
                    <FaUserAlt
                      style={{
                        width: "2em",
                        height: "2em",
                        marginRight: "5px",
                      }}
                    />
                    {userInfo.data.fullName}
                  </S.userButton>
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
          </S.Navbar>
        </S.HeaderContent>
      </S.HeaderContainer>
    </S.HeaderWrapper>
  );
};
export default Header;
