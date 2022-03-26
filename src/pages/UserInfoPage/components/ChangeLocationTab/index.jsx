import React, { useEffect, useState, useMemo } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  notification,
  Row,
  Col,
  Space,
} from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  getCityListAction,
  getDistrictListAction,
  getWardListAction,
  updateUserInfoAction,
} from "../../../../redux/actions";

import * as S from "./styles";

const ChangeLocationTab = (activeKey) => {
  const dispatch = useDispatch();
  const [isChangeLocation, setIsChangeLocation] = useState(false);
  const [locationForm] = Form.useForm();

  useEffect(() => {
    dispatch(getCityListAction());
  }, []);

  useEffect(() => {
    setIsChangeLocation(false);
  }, [activeKey]);

  const { cityList, districtList, wardList } = useSelector(
    (state) => state.locationReducer
  );
  const { userInfo } = useSelector((state) => state.userReducer);
  const userId = userInfo.data.id;

  const renderCityOptions = () => {
    return cityList.data.map((cityItem) => {
      return (
        <Select.Option key={cityItem.id} value={cityItem.code}>
          {cityItem.name}
        </Select.Option>
      );
    });
  };

  const renderDistrictOptions = () => {
    return districtList.data.map((districtItem) => {
      return (
        <Select.Option key={districtItem.id} value={districtItem.code}>
          {districtItem.name}
        </Select.Option>
      );
    });
  };

  const renderWardOptions = () => {
    return wardList.data.map((wardItem) => {
      return (
        <Select.Option key={wardItem.id} value={wardItem.code}>
          {wardItem.name}
        </Select.Option>
      );
    });
  };

  const renderLocationInfo = useMemo(() => {
    if (userInfo.data.location) {
      return (
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <S.Title>Thành phố/ Tỉnh:</S.Title>
          </Col>
          <Col span={18}>
            <S.Content>{userInfo.data.location.city.name}</S.Content>
          </Col>
          <Col span={6}>
            <S.Title>Quận/ Huyện:</S.Title>
          </Col>
          <Col span={18}>
            <S.Content>{userInfo.data.location.district.name}</S.Content>
          </Col>
          <Col span={6}>
            <S.Title>Phường/ Xã:</S.Title>
          </Col>
          <Col span={18}>
            <S.Content>{userInfo.data.location.ward.name}</S.Content>
          </Col>
          <Col span={6}>
            <S.Title>Địa chỉ cụ thể:</S.Title>
          </Col>
          <Col span={18}>
            <S.Content>{userInfo.data.location.address}</S.Content>
          </Col>
          <Col>
            <Button type="primary" onClick={() => setIsChangeLocation(true)}>
              Thay đổi địa chỉ
            </Button>
          </Col>
        </Row>
      );
    } else {
      return (
        <div>
          <p>
            <strong>Chưa cập nhật thông tin địa chỉ</strong>
          </p>
          <Button type="primary" onClick={() => setIsChangeLocation(true)}>
            Thêm địa chỉ
          </Button>
        </div>
      );
    }
  }, [userInfo.data]);

  const renderChangeLocationForm = () => {
    return (
      <Form
        form={locationForm}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={(values) => handleChangeLocation(values)}
      >
        <Form.Item
          label="Tỉnh/Thành phố"
          name="city"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn Tỉnh/Thành phố của bạn",
            },
          ]}
        >
          <Select
            allowClear
            onChange={(value) => {
              dispatch(getDistrictListAction({ cityCode: value }));
              locationForm.setFieldsValue({ district: undefined });
              locationForm.setFieldsValue({ ward: undefined });
            }}
          >
            {renderCityOptions()}
          </Select>
        </Form.Item>

        <Form.Item
          label="Quận/Huyện"
          name="district"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn Quận/Huyện của bạn",
            },
          ]}
        >
          <Select
            allowClear
            onChange={(value) => {
              dispatch(getWardListAction({ districtCode: value }));
              locationForm.setFieldsValue({ ward: undefined });
            }}
          >
            {renderDistrictOptions()}
          </Select>
        </Form.Item>

        <Form.Item
          label="Phường/Xã"
          name="ward"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn Phường/Xã của bạn",
            },
          ]}
        >
          <Select allowClear>{renderWardOptions()}</Select>
        </Form.Item>

        <Form.Item
          label="Địa chỉ cụ thể"
          name="address"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ cụ thể của bạn!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Thay đổi
            </Button>
            <Button onClick={() => setIsChangeLocation(false)}>Hủy</Button>
          </Space>
        </Form.Item>
      </Form>
    );
  };

  const handleChangeLocation = (values) => {
    const { city, district, ward, address } = values;
    const cityName = cityList.data.find(
      (cityItem) => cityItem.code === city
    ).name;
    const districtName = districtList.data.find(
      (districtItem) => districtItem.code === district
    ).name;
    const wardName = wardList.data.find(
      (wardItem) => wardItem.code === ward
    ).name;
    const location = {
      city: {
        code: city,
        name: cityName,
      },
      district: {
        code: district,
        name: districtName,
      },
      ward: {
        code: ward,
        name: wardName,
      },
      address,
    };
    dispatch(
      updateUserInfoAction({
        id: userId,
        location,
      })
    );
    notification.success({
      message: "Thay đổi thành công",

      description: "Địa chỉ của bạn đã được thay đổi",
    });
    locationForm.resetFields();
    setIsChangeLocation(false);
  };

  return (
    <div>
      <S.HeadingText>Thay đổi địa chỉ</S.HeadingText>
      <S.DetailContainer>
        {isChangeLocation ? renderChangeLocationForm() : renderLocationInfo}
      </S.DetailContainer>
    </div>
  );
};

export default ChangeLocationTab;
