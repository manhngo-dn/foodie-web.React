import styled from "styled-components";

export const FooterContainer = styled.div`
  padding: 16px;
  margin: 0 auto;
  min-height: 372px;
  max-width: 1200px;
  display: block;
  background-color: #f2f2f2;
`;

export const FooterBlock = styled.div`
  display: block;
`;

export const MiddleFooterBlock = styled.div`
  display: block;
  text-align: center;
  color: #959595;
  line-height: 4;

  @media (max-width: 992px) {
    text-align: right;
  }
`;

export const LastFooterBlock = styled.div`
  display: block;
  text-align: right;
`;

export const MenuFooter = styled.div`
  line-height: 2;
`;

export const TitleBlock = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 20px;
`;

export const Download = styled.div`
  width: 100%;
  height: 75px;
`;

export const AppDownload = styled.img`
  width: 122px;
  height: 40px;
`;

export const FooterLogo = styled.img`
  height: 100px;
`;

export const SocialMedia = styled.div`
  width: 100%;
  height: 75px;
`;

export const Address = styled.div`
  line-height: 1;
`;

export const Registered = styled.img`
  width: 177px;
  height: 68px;
`;
