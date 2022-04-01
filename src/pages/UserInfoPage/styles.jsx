import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100% - 40px);
  margin: 16px auto;
  padding: 16px;

  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #ebebeb;
`;

export const NavigationProfile = styled.div`
  width: 100%;
  height: 100%;

  line-height: 3;
  background-color: #fff;
  border: 1px solid #ebebeb;
`;

export const UserName = styled.div`
  padding: 20px;

  & h3 {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
  }
`;

export const DetailContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;

  background-color: #fff;
  border: 1px solid #ebebeb;
`;

export const HeadingText = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: 700;
  padding: 16px;
  background-color: #f5f5f5;
  border: 1px solid #ebebeb;
`;
