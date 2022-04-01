import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  notification,
  Input,
  Space,
  Button,
  Modal,
  Badge,
  Radio,
  Form,
} from "antd";
import {
  PlusSquareOutlined,
  MinusSquareOutlined,
  PlusOutlined,
  MoneyCollectOutlined,
  BankOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";

import * as S from "./styles";
import { SHIP_FEE } from "./constants";
import { ROUTERS } from "../../../../constants/routers";
import AddAndChangeLocation from "./components/AddAndChangeLocation";
import {
  addToCartAction,
  reduceQuantityAction,
  removeFromCartAction,
  addPurchaseAction,
  clearCartAction,
} from "../../../../redux/actions";

const CartList = () => {
  const [visiblePaymentModal, setVisiblePaymentModal] = useState(false);
  const [visibleLoginNoticeModal, setVisibleLoginNoticeModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isHideAddLocation, setIsHideAddLocation] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [receiverInfoForm] = Form.useForm();

  const { id } = useParams();
  const { cartList } = useSelector((state) => state.cartReducer);
  const { userInfo } = useSelector((state) => state.userReducer);
  const { purchaseStatus } = useSelector((state) => state.purchaseReducer);
  const paymentLoading = purchaseStatus.loading;

  const cartListActive = cartList.data.filter(
    (product) => product.shopId === id
  );
  let totalPrice = 0;

  const handleIncreaseQuantity = (product) => {
    dispatch(
      addToCartAction({
        productId: product.productId,
        shopId: product.shopId,
      })
    );
  };

  const handleReduceQuantity = (product) => {
    dispatch(
      reduceQuantityAction({
        productId: product.productId,
        shopId: product.shopId,
      })
    );
  };

  const handleRemoveProduct = (product) => {
    dispatch(
      removeFromCartAction({
        productId: product.productId,
      })
    );
  };

  const handleClearCart = () => {
    dispatch(clearCartAction({ shopId: id }));
  };

  const handleOrderButton = () => {
    if (cartListActive.length === 0) {
      const emptyCartNotice = (type) => {
        notification[type]({
          message: "Đơn hàng trống",
          description:
            "Bạn chưa chọn sản phẩm nào để đặt hàng, vui lòng thêm sản phẩm vào giỏ hàng",
        });
      };
      return emptyCartNotice("info");
    } else if (userInfo.data.id) {
      setVisiblePaymentModal(true);
    } else {
      setVisibleLoginNoticeModal(true);
    }
  };

  const handleFinishPayment = () => {
    if (
      !receiverInfoForm.getFieldsValue().fullName ||
      !receiverInfoForm.getFieldsValue().phoneNumber ||
      !userInfo.data.location
    ) {
      return notification.error({
        message: "Thông tin người nhận không hợp lệ",
        description: "Vui lòng nhập đầy đủ thông tin",
      });
    } else {
      dispatch(
        addPurchaseAction({
          data: {
            cartList: cartListActive,
            shopId: id,
            paymentMethod,
            userId: userInfo.data.id,
            fullName: receiverInfoForm.getFieldsValue().fullName,
            phoneNumber: receiverInfoForm.getFieldsValue().phoneNumber,
            location: userInfo.data.location,
            shipFee: SHIP_FEE,
          },
          callback: {
            finishPayment: () => {
              setVisiblePaymentModal(false);
              dispatch(clearCartAction({ shopId: id }));
            },
          },
        })
      );
    }
  };

  const renderCartListActive = () => {
    return cartListActive.map((product) => {
      totalPrice = totalPrice + product.productPrice * product.quantity;
      return (
        <S.CartListItem key={product.productId}>
          <S.CartListItemDetail>
            <Space>
              <div>
                <PlusSquareOutlined
                  style={{ color: "green", paddingRight: "5px" }}
                  onClick={() => handleIncreaseQuantity(product)}
                />
                {product.quantity}
                <MinusSquareOutlined
                  style={{ paddingRight: "5px", paddingLeft: "5px" }}
                  onClick={() => handleReduceQuantity(product)}
                />
              </div>
              <S.CartListItemName>{product.productName}</S.CartListItemName>
            </Space>

            <Button
              size="small"
              danger
              onClick={() => handleRemoveProduct(product)}
            >
              Xóa
            </Button>
          </S.CartListItemDetail>
          <S.CartListItemPrice>
            {(product.productPrice * product.quantity).toLocaleString()}₫
          </S.CartListItemPrice>
        </S.CartListItem>
      );
    });
  };

  const renderCartListPayment = () => {
    return cartListActive.map((product) => {
      return (
        <Row gutter={16} key={product.productId} justify={"space-between"}>
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
            {(product.productPrice * product.quantity).toLocaleString()}₫
          </Col>
        </Row>
      );
    });
  };

  return (
    <S.CartListContainer>
      <Row justify="space-between" align="middle">
        <Col>
          <S.CartListHeading>Đơn hàng hiện tại</S.CartListHeading>
        </Col>
        <Col>
          <Button
            danger
            size="small"
            onClick={() => handleClearCart()}
            style={{ marginRight: 10 }}
          >
            Xóa toàn bộ
          </Button>
        </Col>
      </Row>

      {renderCartListActive()}
      <S.CartListTotalPrice>
        <Row gutter={16} justify={"space-between"}>
          <Col>Tổng cộng</Col>
          <Col>
            <S.TotalPrice>{totalPrice.toLocaleString()}₫</S.TotalPrice>
          </Col>
        </Row>
      </S.CartListTotalPrice>
      <S.PaymentButton>
        <Button type="primary" block onClick={() => handleOrderButton()}>
          Đặt hàng
        </Button>
      </S.PaymentButton>

      <Modal
        title={<S.CartListHeading>Xác nhận đơn hàng </S.CartListHeading>}
        centered
        visible={visiblePaymentModal}
        onCancel={() => {
          setVisiblePaymentModal(false);
          receiverInfoForm.resetFields();
        }}
        width={1000}
        footer={
          <Button
            type="primary"
            onClick={() => handleFinishPayment()}
            block
            loading={paymentLoading}
          >
            Thanh toán
          </Button>
        }
      >
        <Row gutter={16}>
          <Col span={14}>
            <S.CartListHeading>Thông tin người đặt hàng</S.CartListHeading>
            <Form
              form={receiverInfoForm}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{
                fullName: userInfo.data.fullName,
                phoneNumber: userInfo.data.phoneNumber,
              }}
            >
              <Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
              >
                <Input placeholder="Nhập họ và tên" />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phoneNumber"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại" },
                ]}
              >
                <Input addonBefore="+84" placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Form>

            <Row gutter={[16, 16]}>
              <Col span={8}>
                <strong>Địa chỉ:</strong>
              </Col>
              {userInfo.data.location ? (
                <Col span={16}>
                  <p>
                    {userInfo.data.location.address},{" "}
                    {userInfo.data.location.ward.name},{" "}
                    {userInfo.data.location.district.name},{" "}
                    {userInfo.data.location.city.name}
                  </p>
                  <Button
                    hidden={!isHideAddLocation}
                    onClick={() => setIsHideAddLocation(!isHideAddLocation)}
                  >
                    Thay đổi địa chỉ
                  </Button>
                </Col>
              ) : (
                <Col span={16}>
                  <Button
                    type="default"
                    icon={<PlusOutlined />}
                    block
                    onClick={() => setIsHideAddLocation(!isHideAddLocation)}
                    hidden={!isHideAddLocation}
                  >
                    Thêm địa chỉ
                  </Button>
                </Col>
              )}
              <Col offset={8} span={16}>
                <div hidden={isHideAddLocation}>
                  <AddAndChangeLocation
                    setIsHideAddLocation={setIsHideAddLocation}
                  />
                </div>
              </Col>
              <Col span={8}>
                <strong>Hình thức thanh toán:</strong>
              </Col>
              <Col span={16}>
                <Radio.Group
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <Space direction="vertical">
                    <Radio value={"cash"}>
                      <MoneyCollectOutlined />
                      Tiền mặt
                    </Radio>
                    <Radio value={"banking"}>
                      <BankOutlined /> Internet banking
                    </Radio>
                    <Radio value={"eWallet"}>
                      <WalletOutlined /> Ví điện tử
                    </Radio>
                  </Space>
                </Radio.Group>
              </Col>
            </Row>
          </Col>
          <Col span={10}>
            <S.CartListHeading>Chi tiết đơn hàng</S.CartListHeading>

            {renderCartListPayment()}
            <S.PaymentTotalPrice>
              <Row gutter={16} justify={"space-between"}>
                <Col>Cộng</Col>
                <Col>{totalPrice.toLocaleString()}₫</Col>
              </Row>
              <Row gutter={16} justify={"space-between"}>
                <Col>Phí vận chuyển</Col>
                <Col>{SHIP_FEE.toLocaleString()}₫</Col>
              </Row>
            </S.PaymentTotalPrice>
            <Row gutter={16} justify={"space-between"}>
              <Col>
                <S.PaymentPriceText>TỔNG CỘNG</S.PaymentPriceText>
              </Col>
              <Col>
                <S.PaymentPriceNumber>
                  {(totalPrice + SHIP_FEE).toLocaleString()}₫
                </S.PaymentPriceNumber>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>

      <Modal
        centered
        visible={visibleLoginNoticeModal}
        title={<S.CartListHeading>Bạn chưa đăng nhập</S.CartListHeading>}
        onCancel={() => setVisibleLoginNoticeModal(false)}
        footer={
          <>
            <Button type="primary" onClick={() => navigate(ROUTERS.SIGN_IN)}>
              Đăng nhập
            </Button>

            <Button onClick={() => setVisibleLoginNoticeModal(false)}>
              Quay lại
            </Button>
          </>
        }
      >
        <p>Bạn cần đăng nhập để có thể tiếp tục đặt hàng</p>
      </Modal>
    </S.CartListContainer>
  );
};

export default CartList;
