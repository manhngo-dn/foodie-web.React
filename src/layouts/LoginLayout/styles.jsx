import styled from "styled-components";

export const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ee4d2d;

  min-height: calc(100vh - 372px);
  width: 100%;
`;

export const LoginContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 16px;
  background-color: #ee4d2d;

  display: flex;
  flex-direction: column;
`;

export const LoginHeader = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;

  width: 100%;
  padding-top: 20px;
`;
