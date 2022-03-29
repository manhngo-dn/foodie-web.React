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
  notification,
} from "antd";
import {
  CommentOutlined,
  UserOutlined,
  HeartOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import moment from "moment";

import {
  getShopDetailAction,
  getProductDetailAction,
  getMenuAction,
  getCommentListAction,
  sendCommentAction,
  addToFavoriteAction,
  removeFromFavoriteAction,
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

  const handleComment = (values) => {
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
  };

  const handleAddToFavoriteButton = () => {
    dispatch(
      addToFavoriteAction({
        shopId: parseFloat(id),
        userId: userInfo.data.id,
      })
    );
  };

  const handleRemoveFromFavoriteButton = (favoriteId) => {
    dispatch(
      removeFromFavoriteAction({
        favoriteId,
        shopId: parseFloat(id),
      })
    );

    console.log(favoriteId);
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
                  <Space direction="vertical">
                    <S.ShopName>{shopDetail.data.name}</S.ShopName>
                    <div>
                      <Rate
                        disabled
                        style={{ color: "#ee4d2d" }}
                        value={
                          commentList.data.length
                            ? totalRate / commentList.data.length
                            : 0
                        }
                      />
                      <S.favorites>
                        {`${shopDetail.data.favorites?.length} người đã thích`}
                      </S.favorites>
                    </div>

                    <S.ShopKind>{shopDetail.data.kind}</S.ShopKind>
                    <S.ShopAddress>{shopDetail.data.address}</S.ShopAddress>
                    <S.ShopActiveTime>
                      <ClockCircleOutlined /> {shopDetail.data.openTime} -{" "}
                      {shopDetail.data.closeTime}
                    </S.ShopActiveTime>
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
