import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  Skeleton,
  Anchor,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Rate,
  Card,
  notification,
} from "antd";
import {
  CommentOutlined,
  UserOutlined,
  HeartOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

import moment from "moment";

import { ROUTERS } from "../../constants/routers";
import {
  getShopDetailAction,
  getProductDetailAction,
  getMenuAction,
  getCommentListAction,
  sendCommentAction,
  addToFavoriteAction,
  removeFromFavoriteAction,
  changeBreadcrumbAction,
} from "../../redux/actions";
import ProductItem from "./component/ProductItem";
import CartList from "./component/CartList";
import * as S from "./styles";

const ShopDetail = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [isCommentModalShow, setIsCommentModalShow] = useState(false);
  const [rateValue, setRateValue] = useState(0);
  const [commentForm] = Form.useForm();

  const { shopDetail } = useSelector((state) => state.shopDetailReducer);
  const { productList } = useSelector((state) => state.productReducer);
  const { menuList } = useSelector((state) => state.menuReducer);
  const { commentList, sendCommentData } = useSelector(
    (state) => state.commentReducer
  );
  const { userInfo } = useSelector((state) => state.userReducer);

  let totalRate = 0;
  commentList.data.forEach((item) => {
    totalRate += item.rate;
  });

  useEffect(() => {
    dispatch(
      getShopDetailAction({
        id,
      })
    );
    dispatch(getProductDetailAction({ id }));
    dispatch(getMenuAction({ id }));
    dispatch(getCommentListAction({ shopId: id }));
  }, [id]);

  useEffect(() => {
    if (shopDetail.data.id) {
      dispatch(
        changeBreadcrumbAction([
          { name: "Trang chủ", path: ROUTERS.HOME },
          {
            name: shopDetail.data.name,
            noTitle: true,
          },
        ])
      );
    }
  }, [shopDetail.data]);

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

  const handleComment = (values) => {
    if (userInfo.data.id) {
      dispatch(
        sendCommentAction({
          ...values,
          rate: rateValue,
          shopId: id,
          userId: userInfo.data.id,
        })
      );
      commentForm.resetFields();
      setRateValue(0);
      notification.success({
        message: "Gửi bình luận thành công",
      });
    } else {
      notification.error({
        message: "Vui lòng đăng nhập để gửi bình luận",
      });
    }
  };

  const handleAddToFavoriteButton = () => {
    if (userInfo.data.id) {
      dispatch(
        addToFavoriteAction({
          shopId: parseFloat(id),
          userId: userInfo.data.id,
        })
      );
    } else {
      notification.error({
        message: "Vui lòng đăng nhập để sử dụng chức năng này",
      });
    }
  };

  const handleRemoveFromFavoriteButton = (favoriteId) => {
    dispatch(
      removeFromFavoriteAction({
        favoriteId,
        shopId: parseFloat(id),
      })
    );
  };

  const renderCommentList = () => {
    return commentList.data.map((commentItem, commentIndex) => {
      return (
        <S.CommentContainer key={commentItem.id}>
          <Space align="baseline" size="large">
            <S.UserNameComment>
              <UserOutlined /> {commentItem.user?.fullName}
            </S.UserNameComment>
            <S.CommentTime>
              {moment(commentItem.createdAt).fromNow()}
            </S.CommentTime>
          </Space>
          <div>
            <Rate disabled value={commentItem.rate} allowHalf />
          </div>

          <S.CommentContent>{commentItem.content}</S.CommentContent>
        </S.CommentContainer>
      );
    });
  };

  const renderFavoriteButton = () => {
    const favoriteIndex = shopDetail.data.favorites?.findIndex(
      (item) => item.userId === userInfo.data.id
    );

    const favoriteId = shopDetail.data.favorites?.[favoriteIndex]?.id;

    if (favoriteIndex !== -1) {
      return (
        <Button
          type="default"
          onClick={() => handleRemoveFromFavoriteButton(favoriteId)}
        >
          <HeartOutlined
            style={{
              color: "#ee4d2d",
            }}
          />
          Đã yêu thích
        </Button>
      );
    } else {
      return (
        <Button
          type="default"
          onClick={() => {
            handleAddToFavoriteButton();
          }}
        >
          <HeartOutlined />
          Thêm vào yêu thích
        </Button>
      );
    }
  };

  return (
    <>
      {shopDetail.loading ? (
        <Skeleton active />
      ) : (
        <S.Container>
          <Card size="small">
            <Row gutter={[16, 16]}>
              <Col xl={10} md={12} xs={24}>
                <Image
                  width="100%"
                  height="auto"
                  src={shopDetail.data.image}
                  alt="ada"
                />
              </Col>
              <Col xl={14} md={12} xs={24}>
                <S.ShopDetailInfo>
                  <Space direction="vertical">
                    <Space>
                      <Rate
                        disabled
                        style={{ color: "#ee4d2d" }}
                        value={
                          commentList.data.length
                            ? totalRate / commentList.data.length
                            : 0
                        }
                      />
                      {`${commentList.data?.length} lượt đánh giá`}
                    </Space>
                    <div>
                      <S.Favorites>
                        {`${shopDetail.data.favorites?.length} người đã thích`}
                      </S.Favorites>
                    </div>

                    <S.ShopKind>{shopDetail.data.kind}</S.ShopKind>
                    <Space>
                      <EnvironmentOutlined />
                      <S.ShopAddress>{shopDetail.data.address}</S.ShopAddress>
                    </Space>
                    <Space>
                      <ClockCircleOutlined />
                      <S.ShopActiveTime>{`${shopDetail.data.openTime} - ${shopDetail.data.closeTime}`}</S.ShopActiveTime>
                    </Space>
                    <Space>
                      {renderFavoriteButton()}
                      <Button
                        type="default"
                        icon={<CommentOutlined />}
                        onClick={() => setIsCommentModalShow(true)}
                      >
                        Bình luận
                      </Button>
                    </Space>
                  </Space>
                </S.ShopDetailInfo>
              </Col>
            </Row>
          </Card>

          <Row gutter={[16, 16]}>
            <Col
              xl={{ span: 24, order: 1 }}
              md={{ span: 24, order: 2 }}
              xs={{ span: 24, order: 2 }}
            >
              <S.MenuTab>MENU</S.MenuTab>
            </Col>
            <Col
              xl={{ span: 5, order: 2 }}
              md={{ span: 8, order: 3 }}
              xs={{ span: 24, order: 3 }}
            >
              <S.MenuCategoryList>
                <Anchor affix={false} offsetTop={70}>
                  {renderMenuCategoryList()}
                </Anchor>
              </S.MenuCategoryList>
            </Col>
            <Col
              xl={{ span: 13, order: 3 }}
              md={{ span: 16, order: 4 }}
              xs={{ span: 24, order: 4 }}
            >
              <S.ProductList>{renderProductList()}</S.ProductList>
            </Col>
            <Col
              xl={{ span: 6, order: 4 }}
              md={{ span: 24, order: 1 }}
              xs={{ span: 24, order: 1 }}
            >
              <S.BillContainer>
                <CartList />
              </S.BillContainer>
            </Col>
          </Row>

          <Modal
            title="Viết bình luận"
            width={500}
            visible={isCommentModalShow}
            onCancel={() => setIsCommentModalShow(false)}
            bodyStyle={{ maxHeight: "400px", overflowX: "scroll" }}
            footer={
              <Form
                form={commentForm}
                layout="horizontal"
                onFinish={(values) => handleComment(values)}
              >
                <Form.Item label="Đánh giá">
                  <S.Rate>
                    <Rate
                      allowHalf
                      value={rateValue}
                      onChange={(value) => setRateValue(value)}
                    />
                  </S.Rate>
                </Form.Item>
                <Form.Item label="Nội dung" name="content">
                  <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
                </Form.Item>
                {sendCommentData.loading ? (
                  <Button type="primary" htmlType="submit" loading>
                    Đang Gửi
                  </Button>
                ) : (
                  <Button type="primary" htmlType="submit">
                    Gửi
                  </Button>
                )}
              </Form>
            }
          >
            {renderCommentList()}
          </Modal>
        </S.Container>
      )}
    </>
  );
};

export default ShopDetail;
