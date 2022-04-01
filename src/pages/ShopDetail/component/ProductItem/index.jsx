import React from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Image, Space } from "antd";

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
      <Row gutter={16} align="middle">
        <Col span={4} style={{ textAlign: "left" }}>
          <Image src={product.image} width={60} />
        </Col>
        <Col span={14} style={{ textAlign: "left" }}>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductContent>{product.description}</S.ProductContent>
        </Col>
        <Col span={6} style={{ textAlign: "right" }}>
          <Space>
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
            {product.max === 0 ? (
              <S.ProductQuantity>Hết</S.ProductQuantity>
            ) : (
              <S.ProductAddToCart onClick={() => handleAddToCart()}>
                +
              </S.ProductAddToCart>
            )}
          </Space>
        </Col>
      </Row>
    </S.ProductItem>
  );
};

export default ProductItem;
