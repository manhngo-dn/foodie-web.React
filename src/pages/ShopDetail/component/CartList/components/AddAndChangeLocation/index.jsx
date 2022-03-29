import React, { useEffect } from "react";
import { Form, Input, Button, Select, notification, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  getCityListAction,
  getDistrictListAction,
  getWardListAction,
  updateUserInfoAction,
} from "../../../../../../redux/actions";

const AddAndChangeLocation = ({ setIsHideAddLocation }) => {
  const dispatch = useDispatch();

  const [locationForm] = Form.useForm();

  useEffect(() => {
    dispatch(getCityListAction());
  }, []);

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
    setIsHideAddLocation(true);
  };

  return (
    <Form
      form={locationForm}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
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
          <Button onClick={() => setIsHideAddLocation(true)}>Hủy</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default AddAndChangeLocation;
