import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, Skeleton } from "antd";

import * as S from "./styles";
import { addToCartAction } from "../../../../redux/actions";

const ProductItem = ({ product, shopId }) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(
      addToCartAction({
        shopId,
        productPrice: product.currentPrice,
        productId: product.id,
        productName: product.name,
        quantity: 1,
      })
    );
  };

  return (
    <S.ProductItem>
      <Row gutter={16} align={"center"}>
        <Col span={4}>
          <S.ProductImage src="adadad" />
        </Col>
        <Col span={12}>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductContent>{product.description}</S.ProductContent>
        </Col>
        <Col span={8}>
          <Row gutter={16} align={"middle"} justify={"center"}>
            <Col>
              {product.initialPrice === product.currentPrice ? (
                <S.ProductCurrentPrice>
                  {product.currentPrice.toLocaleString()}₫
                </S.ProductCurrentPrice>
              ) : (
                <>
                  <S.ProductInitialPrice>
                    {product.initialPrice.toLocaleString()}₫
                  </S.ProductInitialPrice>
                  <S.ProductCurrentPrice>
                    {product.currentPrice.toLocaleString()}₫
                  </S.ProductCurrentPrice>
                </>
              )}
            </Col>
            <Col>
              {product.max === 0 ? (
                <S.ProductQuantity>het hang</S.ProductQuantity>
              ) : (
                <S.ProductAddToCart onClick={() => handleAddToCart()}>
                  +
                </S.ProductAddToCart>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </S.ProductItem>
  );
};

export default ProductItem;
