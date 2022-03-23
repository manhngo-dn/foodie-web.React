import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, Skeleton, Anchor, Space, Button, Modal } from "antd";
import { CommentOutlined } from "@ant-design/icons";

import {
  getShopDetailAction,
  getProductDetailAction,
  getMenuAction,
} from "../../redux/actions";
import ProductItem from "./component/ProductItem";
import CartList from "./component/CartList";
import CommentsModal from "./component/CommentsModal";
import * as S from "./styles";

const ShopDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isCommentModalShow, setIsCommentModalShow] = useState(false);

  const { shopDetail } = useSelector((state) => state.shopDetailReducer);
  const { productList } = useSelector((state) => state.productReducer);
  const { menuList } = useSelector((state) => state.menuReducer);

  useEffect(() => {
    dispatch(
      getShopDetailAction({
        id,
      })
    );
    dispatch(getProductDetailAction({ id }));
    dispatch(getMenuAction({ id }));
  }, []);

  const { Link } = Anchor;
  const renderMenuCategoryList = () => {
    return menuList.data.map((menuItem) => {
      return (
        <S.MenuCategoryItem key={menuItem.id}>
          <Link href={`#menu-${menuItem.id}`} title={menuItem.name} />
        </S.MenuCategoryItem>
      );
    });
  };

  const renderProductList = () => {
    return menuList.data.map((menuItem) => {
      const productsMenu = productList.data.filter(
        (product) => product.menuId === menuItem.id
      );
      const renderProductsMenu = productsMenu.map((product) => {
        return (
          <ProductItem
            product={product}
            shopId={id}
            key={`product-${product.id}`}
          />
        );
      });
      return (
        <S.MenuCategory key={`menu-${menuItem.id}`} id={`menu-${menuItem.id}`}>
          <S.MenuCategoryName>{menuItem.name}</S.MenuCategoryName>
          {renderProductsMenu}
        </S.MenuCategory>
      );
    });
  };

  return (
    <>
      {shopDetail.loading ? (
        <Skeleton active />
      ) : (
        <S.Container>
          <S.ShopDetail>
            <Row gutter={[48, 16]} wrap={false}>
              <Col flex="none">
                <Image
                  width={480}
                  height={300}
                  src={shopDetail.data.image}
                  alt="ada"
                />
              </Col>
              <Col flex="auto">
                <S.ShopDetailInfo>
                  <Space direction="vertical" size="large">
                    <S.ShopName>{shopDetail.data.name}</S.ShopName>
                    <S.ShopKind>{shopDetail.data.kind}</S.ShopKind>
                    {/* <S.Breadcrumb>Breadcrumb</S.Breadcrumb> */}

                    <S.ShopAddress>{shopDetail.data.address}</S.ShopAddress>
                    <S.ShopActiveTime>
                      {shopDetail.data.openTime} - {shopDetail.data.closeTime}
                    </S.ShopActiveTime>
                    <div>
                      <Button
                        type="default"
                        icon={<CommentOutlined />}
                        onClick={() => setIsCommentModalShow(true)}
                      >
                        Bình luận
                      </Button>
                    </div>
                  </Space>
                </S.ShopDetailInfo>
              </Col>
            </Row>
          </S.ShopDetail>
          <S.MenuTab>MENU</S.MenuTab>
          <Row gutter={16}>
            <Col span={5}>
              <S.MenuCategoryList>
                <Anchor affix={false} offsetTop={70}>
                  {renderMenuCategoryList()}
                </Anchor>
              </S.MenuCategoryList>
            </Col>
            <Col span={13}>
              <S.ProductList>{renderProductList()}</S.ProductList>
            </Col>
            <Col span={6}>
              <S.BillContainer>
                <CartList />
              </S.BillContainer>
            </Col>
          </Row>

          <Modal
            title="Viết bình luận"
            width={900}
            visible={isCommentModalShow}
            onOk={() => setIsCommentModalShow(false)}
            onCancel={() => setIsCommentModalShow(false)}
          >
            <CommentsModal />
          </Modal>
        </S.Container>
      )}
    </>
  );
};

export default ShopDetail;
