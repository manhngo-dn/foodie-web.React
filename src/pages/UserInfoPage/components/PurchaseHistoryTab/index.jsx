import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Collapse, Row, Col, Space, Badge, Pagination, Skeleton } from "antd";
import moment from "moment";

import { getPurchaseListAction } from "../../../../redux/actions";
import { PAGING } from "../../../../constants/paging";

import * as S from "./styles";

const PurchaseHistoryTab = (activeKey) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const { userInfo } = useSelector((state) => state.userReducer);
  const { purchaseList } = useSelector((state) => state.purchaseReducer);
  console.log(purchaseList.data);

  useEffect(() => {
    dispatch(
      getPurchaseListAction({
        userId: userInfo.data.id,
        page: 1,
        limit: PAGING.PURCHASE_HISTORY_LIST,
      })
    );
  }, []);

  const handleChangePage = (page) => {
    setCurrentPage(page);
    dispatch(
      getPurchaseListAction({
        userId: userInfo.data.id,
        page,
        limit: PAGING.PURCHASE_HISTORY_LIST,
      })
    );
  };

  const renderPurchaseList = useMemo(() => {
    return purchaseList.data.map((item) => {
      let totalPrice = 0;

      return (
        <Collapse.Panel
          header={
            <Row justify="space-between" style={{ width: "100%" }}>
              <Col flex="auto">
                <S.ShopName>{item.shop.name}</S.ShopName>
              </Col>
              <Col flex="none">
                {moment(item.createdAt).format("DD-MM-YYYY HH:mm:ss")}
              </Col>
            </Row>
          }
          key={item.id}
        >
          <Row gutter={32}>
            <Col span={12}>
              <Space direction="vertical">
                <S.Heading> THÔNG TIN NGƯỜI NHẬN </S.Heading>
                <div>
                  <S.Title>Họ và tên:</S.Title> {item.fullName}
                </div>
                <div>
                  <S.Title>Số điện thoại:</S.Title> {item.phoneNumber}
                </div>
                <div>
                  <S.Title>Địa chỉ:</S.Title> {item.location.address},{" "}
                  {item.location.ward.name}, {item.location.district.name},{" "}
                  {item.location.city.name}
                </div>
              </Space>
            </Col>
            <Col span={12}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <S.Heading> THÔNG TIN ĐƠN HÀNG </S.Heading>

                {item.cartList.map((product) => {
                  totalPrice =
                    totalPrice + product.productPrice * product.quantity;
                  return (
                    <Row gutter={16} key={item.id} justify={"space-between"}>
                      <Col>
                        <Space>
                          <Badge
                            count={product.quantity}
                            style={{
                              backgroundColor: "#52c41a",
                              verticalAlign: "baseline",
                            }}
                            size={"small"}
                          />
                          <span>{product.productName}</span>
                        </Space>
                      </Col>
                      <Col>
                        {(
                          product.productPrice * product.quantity
                        ).toLocaleString()}
                        ₫
                      </Col>
                    </Row>
                  );
                })}
                <S.PaymentTotalPrice>
                  <Row gutter={16} justify={"space-between"}>
                    <Col>Cộng</Col>
                    <Col>{totalPrice.toLocaleString()}₫</Col>
                  </Row>
                  <Row gutter={16} justify={"space-between"}>
                    <Col>Phí vận chuyển</Col>
                    <Col>{item.shipFee.toLocaleString()}₫</Col>
                  </Row>
                </S.PaymentTotalPrice>
                <Row gutter={16} justify={"space-between"}>
                  <Col>
                    <S.PaymentPriceText>TỔNG CỘNG</S.PaymentPriceText>
                  </Col>
                  <Col>
                    <S.PaymentPriceNumber>
                      {(totalPrice + item.shipFee).toLocaleString()}₫
                    </S.PaymentPriceNumber>
                  </Col>
                </Row>
              </Space>
            </Col>
          </Row>
        </Collapse.Panel>
      );
    });
  }, [purchaseList.data]);

  const renderPagination = () => {
    if (purchaseList.loading) return <Skeleton />;
    if (purchaseList.data.length === 0) return <></>;
    return (
      <S.Pagination>
        <Row justify="center">
          <Pagination
            current={currentPage}
            pageSize={PAGING.PRODUCT_LIST}
            total={parseInt(purchaseList.meta.total)}
            showSizeChanger={false}
            onChange={(page) => handleChangePage(page)}
          />
        </Row>
      </S.Pagination>
    );
  };

  return (
    <div>
      <S.HeadingText>Lịch sử mua hàng</S.HeadingText>
      <S.DetailContainer>
        <Collapse>{renderPurchaseList}</Collapse>
        {renderPagination()}
      </S.DetailContainer>
    </div>
  );
};

export default PurchaseHistoryTab;
