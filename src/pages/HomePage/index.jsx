import React, { useEffect, useMemo } from "react";
import { Row, Col, Card, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as S from "./styles";
import {
  getTopShopListAction,
  getNewShopListAction,
  getShopDetailAction,
} from "../../redux/actions";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTopShopListAction());
    dispatch(getNewShopListAction());
  }, []);

  const { serviceList } = useSelector((state) => state.serviceReducer);
  const { topShopList, newShopList } = useSelector(
    (state) => state.shopListReducer
  );
  console.log(newShopList.data);

  const renderServiceListButton = () => {
    return serviceList.data.map((service) => {
      return (
        <S.ServiceButton
          key={service.id}
          type="default"
          size="large"
          onClick={() => navigate(service.path)}
        >
          {service.name}
        </S.ServiceButton>
      );
    });
  };

  const renderTopShopList = useMemo(() => {
    if (topShopList.loading) return <Skeleton />;
    return topShopList.data.shops?.map((shop) => (
      <Col span={8} key={shop.id}>
        <Card
          size="small"
          hoverable
          cover={<img alt={shop.name} src={shop.image} />}
          onClick={() => {
            navigate(`/shop/${shop.id}`);
            dispatch(getShopDetailAction({ id: shop.id }));
          }}
        >
          <S.ShopsName title={shop.name}>{shop.name}</S.ShopsName>
          <S.ShopsAddress title={shop.address}>{shop.address}</S.ShopsAddress>
          <S.ShopsKind>{shop.kind}</S.ShopsKind>
        </Card>
      </Col>
    ));
  }, [topShopList.data]);

  const renderNewShopList = useMemo(() => {
    if (newShopList.loading) return <Skeleton />;
    return newShopList.data.shops?.map((shop) => (
      <Col span={8} key={shop.id}>
        <Card
          size="small"
          hoverable
          cover={<img alt={shop.name} src={shop.image} />}
          onClick={() => {
            navigate(`/shop/${shop.id}`);
            dispatch(getShopDetailAction({ id: shop.id }));
          }}
        >
          <S.ShopsName title={shop.name}>{shop.name}</S.ShopsName>
          <S.ShopsAddress title={shop.address}>{shop.address}</S.ShopsAddress>
          <S.ShopsKind>{shop.kind}</S.ShopsKind>
        </Card>
      </Col>
    ));
  }, [newShopList.data]);

  return (
    <S.Wrapper>
      <Header />
      <S.MainContainer>
        <S.MainBanner>
          <S.MainBannerContainer>
            <Row
              gutters={32}
              align="middle"
              justify="center"
              style={{ height: "100%" }}
            >
              <Col span={10}>
                <S.MainBannerTitle>Giao hàng chỉ từ 20'</S.MainBannerTitle>
                <S.ServiceButtonGroup>
                  {renderServiceListButton()}
                </S.ServiceButtonGroup>
              </Col>
              <Col span={14}>
                <S.ShopListContainer>
                  <S.ShopListContent>
                    <S.ShopListTittle>Quán nổi bật</S.ShopListTittle>
                    <S.ShopList>
                      <Row gutter={[16, 16]}>{renderTopShopList}</Row>
                    </S.ShopList>
                  </S.ShopListContent>
                  <S.ShopListContent>
                    <S.ShopListTittle>Quán mới</S.ShopListTittle>
                    <S.ShopList>
                      <Row gutter={[16, 16]}>{renderNewShopList}</Row>
                    </S.ShopList>
                  </S.ShopListContent>
                </S.ShopListContainer>
              </Col>
            </Row>
          </S.MainBannerContainer>
        </S.MainBanner>
      </S.MainContainer>
      <S.DeliveryContainer>
        <S.Heading>Đơn hàng của bạn sẽ được bảo quản như thế nào?</S.Heading>
        <S.DeliveryContent>
          Foodie sẽ bảo quản đơn của bạn bằng túi & thùng để chống nắng mưa, giữ
          nhiệt... trên đường đi một cách tốt nhất.
          <S.DeliveryImage
            alt="delivery"
            src="http://localhost:3000/delivery-image.png"
          />
        </S.DeliveryContent>
      </S.DeliveryContainer>

      <S.AppContainer>
        <S.Heading>Foodie Merchant App</S.Heading>
        <S.AppContent>
          <p>
            - <strong>Foodie Merchant</strong> là ứng dụng quản lý đơn hàng cho
            các nhà hàng đối tác của dịch vụ đặt món tận nơi
          </p>
          <p>
            - <strong>Foodie</strong> luôn sẵn sàng hợp tác với các nhà hàng,
            quán ăn, cafe... để mở rộng kinh doanh cũng như gia tăng khách hàng.
            Hãy kết nối vào hệ thống đặt và giao hàng để giảm bớt chi phí quản
            lý, vận hành, marketing, công nghệ...
          </p>
          <p>
            Đăng ký tham gia: <a href="#">tại đây</a>
          </p>

          <S.AppImage alt="app" src="http://localhost:3000/app-tutorial.png" />
        </S.AppContent>
      </S.AppContainer>
      <Footer />
    </S.Wrapper>
  );
};

export default Home;
