import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";
import TopWrapper from "../TopWrapper";

import * as S from "./styles";

const PrimaryLayout = (props) => {
  return (
    <S.Wrapper>
      <Header />
      <TopWrapper />
      <S.MainContainer>
        <S.MainContent>
          <Outlet />
        </S.MainContent>
      </S.MainContainer>
      <Footer />
    </S.Wrapper>
  );
};

export default PrimaryLayout;
