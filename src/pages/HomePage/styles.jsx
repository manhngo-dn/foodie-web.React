import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const MainContainer = styled.div`
  min-height: calc(100vh - 442px);
  width: 100%;
`;

export const MainBanner = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  background-image: url("http://localhost:3000/main-banner.jpg");
  background-size: cover;
`;

export const MainBannerContainer = styled.div`
  max-width: 1200px;
  height: 100%;

  padding: 0;
  margin: 0 auto;
`;

export const MainBannerTitle = styled.div`
  font-size: 24px;
  font-weight: 700;

  color: #fff;
`;

export const ServiceButtonGroup = styled.div`
  padding-top: 40px;
`;

export const ServiceButton = styled.button`
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  padding: 10px 20px;
  margin: 10px;

  &:hover {
    color: #fa541c;
    border: 1px solid #fa541c;
  }
`;

export const ShopListContainer = styled.div`
  width: 100%;
  height: calc(100vh - 110px);

  padding: 20px 0;
`;

export const ShopListContent = styled.div`
  position: relative;
  max-height: 50%;
  background-color: #fff;
  border-radius: 5px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border: 1px solid #ebebeb;

  overflow-y: scroll;
  overflow-x: hidden;
`;
export const ShopListTittle = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: 700;

  padding: 20px;
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: #fff;
`;

export const ShopList = styled.div`
  padding: 20px;
  max-height: 50%;
  overflow-y: hidden;
  overflow-x: hidden;
`;

export const ShopsName = styled.div`
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const ShopsAddress = styled.div`
  font-size: 14px;
  color: #8e8e8e;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const ShopsKind = styled.div`
  width: 100%;
  padding-top: 10px;

  font-size: 14px;
  color: #8e8e8e;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const DeliveryContainer = styled.div`
  max-width: 1200px;
  height: 100%;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  padding: 50px 150px;
  background-color: #fff;
`;

export const Heading = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

export const DeliveryContent = styled.div`
  font-size: 16px;
  color: #8e8e8e;
`;

export const DeliveryImage = styled.img`
  width: 100%;
  height: auto;

  margin: 30px 0;
`;

export const AppContainer = styled.div`
  max-width: 1200px;
  height: 100%;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  padding: 50px 150px;
  background-color: #fff;
  line-height: 1.5;

  position: relative;
`;

export const AppContent = styled.div`
  font-size: 16px;
  color: #8e8e8e;
  padding-right: 200px;
`;

export const AppImage = styled.img`
  position: absolute;
  bottom: 0;
  height: calc(100% + 20px);
  right: 50px;
`;
