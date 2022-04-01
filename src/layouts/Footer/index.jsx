import React from "react";
import { Space, Row, Col } from "antd";
import * as S from "./styles";

import appStore from "../../assets/images/download-ios-badge.jpg";
import googlePlay from "../../assets/images/download-android-badge.jpg";
import appGallery from "../../assets/images/download-app-gallery-badge.png";
import registered from "../../assets/images/registered.jpg";
import footerLogo from "../../assets/images/foodie-logo-2.png";

import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  const menuFooter = [
    {
      name: "Giới thiệu",
      path: "/",
    },

    {
      name: "Trung tâm Trợ giúp",
      path: "/",
    },
    {
      name: "Quy chế",
      path: "/",
    },
    {
      name: "Điều khoản sử dụng",
      path: "/",
    },
    {
      name: "Bảo mật thông tin",
      path: "/",
    },
    {
      name: "Giải quyết khiếu nại",
      path: "/",
    },
    {
      name: "Liên hệ",
      path: "/",
    },
    {
      name: "Hợp tác nhân viên giao nhận",
      path: "/",
    },
    {
      name: "Đăng ký quán",
      path: "/",
    },
    {
      name: "ShopeeFood Uni",
      path: "/",
    },
  ];

  const RenderMenuFooter = () => {
    return menuFooter.map((item, index) => {
      return (
        <S.MenuFooter key={index}>
          <a href="/">{item.name}</a>
        </S.MenuFooter>
      );
    });
  };

  return (
    <S.FooterContainer>
      <Row gutter={[16, 16]}>
        <Col
          lg={{ span: 6, order: 1 }}
          sm={{ span: 12, order: 1 }}
          xs={{ span: 12, order: 1 }}
        >
          <S.FooterBlock>
            <S.TitleBlock>Công ty</S.TitleBlock>
            <div>{RenderMenuFooter()}</div>
          </S.FooterBlock>
        </Col>
        <Col
          lg={{ span: 5, order: 2 }}
          sm={{ span: 6, order: 2 }}
          xs={{ span: 12, order: 3 }}
        >
          <S.FooterBlock>
            <S.TitleBlock>Ứng dụng ShopeeFood</S.TitleBlock>
            <S.Download>
              <a href="/">
                <S.AppDownload src={appStore} alt="appStore" />
              </a>
            </S.Download>
            <S.Download>
              <a href="/">
                <S.AppDownload src={googlePlay} alt="googlePlay" />
              </a>
            </S.Download>
            <S.Download>
              <a href="/">
                <S.AppDownload src={appGallery} alt="appGallery" />
              </a>
            </S.Download>
          </S.FooterBlock>
        </Col>
        <Col
          lg={{ span: 4, order: 3 }}
          sm={{ span: 6, order: 3 }}
          xs={{ span: 12, order: 4 }}
        >
          <S.MiddleFooterBlock>
            <S.FooterLogo src={footerLogo} alt="footerLogo" />

            <p>© 2022 ShopeeFood</p>
            <div className="social-media">
              <Space>
                <a href="/">
                  <FaFacebookSquare className="facebook-icon social-icon" />
                </a>
                <a href="/">
                  <FaInstagramSquare className="instagram-icon social-icon" />
                </a>
              </Space>
            </div>
          </S.MiddleFooterBlock>
        </Col>
        <Col
          lg={{ span: 9, order: 4 }}
          sm={{ span: 24, order: 4 }}
          xs={{ span: 12, order: 2 }}
        >
          <S.LastFooterBlock>
            <S.TitleBlock>Địa chỉ công ty</S.TitleBlock>
            <S.Address>
              <p>Công Ty Cổ Phần Foody </p>
              <p>Lầu G, Tòa nhà Jabes 1,</p>
              <p>số 244 đường Cống Quỳnh, phường Phạm Ngũ Lão, Quận 1, TPHCM</p>
              <p>Giấy CN ĐKDN số: 0311828036</p>
              <p>do Sở Kế hoạch và Đầu tư TP.HCM cấp ngày 11/6/2012,</p>
              <p>sửa đổi lần thứ 23, ngày 10/12/2020</p>
              <p>Số điện thoại: 1900 2042 </p>
              <p>
                Email: <a href="/">info@shopeefood.vn</a>
              </p>
              <div>
                <a href="/">
                  <S.Registered src={registered} alt="registered" />
                </a>
              </div>
            </S.Address>
          </S.LastFooterBlock>
        </Col>
      </Row>
    </S.FooterContainer>
  );
};

export default Footer;
