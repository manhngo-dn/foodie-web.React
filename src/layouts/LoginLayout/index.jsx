import React from "react";

import * as S from "./styles";
import Footer from "../Footer";
import { Outlet, Navigate } from "react-router-dom";

import { ROUTERS } from "../../constants/routers";

const LoginLayout = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) return <Navigate to={ROUTERS.HOME} />;
  return (
    <>
      <S.LoginWrapper>
        <S.LoginContainer>
          <Outlet />
        </S.LoginContainer>
      </S.LoginWrapper>
      <Footer />
    </>
  );
};

export default LoginLayout;
