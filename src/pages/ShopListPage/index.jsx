import React, { useEffect, useMemo, useState } from "react";
import {
  Row,
  Col,
  Checkbox,
  Card,
  Skeleton,
  Dropdown,
  Space,
  Tag,
  Input,
  Pagination,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  SearchOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";

import { PAGING } from "../../constants/paging";
import { ROUTERS } from "../../constants/routers";
import {
  getCategoryListAction,
  getShopListAction,
  getShopDetailAction,
  changeBreadcrumbAction,
} from "../../redux/actions";

import * as S from "./styles";

const SERVICE_LIST = {
  [ROUTERS.FOOD]: "Đồ ăn",
  [ROUTERS.FRESH]: "Thực phẩm",
  [ROUTERS.LIQUOR]: "Bia",
  [ROUTERS.FLOWERS]: "Hoa",
  [ROUTERS.MARKETS]: "Siêu thị",
  [ROUTERS.MEDICINE]: "Thuốc",
  [ROUTERS.PETS]: "Thú cưng",
};

const ShopList = () => {
  const [activeButton, setActiveButton] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const location = useLocation();
  const dispatch = useDispatch();
  const pathname = location.pathname;

  const [filterParams, setFilterParams] = useState({
    categoryIds: [],
    keyword: "",
    pathname,
  });

  const { categoryList } = useSelector((state) => state.categoryReducer);
  const { shopList } = useSelector((state) => state.shopListReducer);

  useEffect(() => {
    setFilterParams({
      categoryIds: [],
      pathname,
    });
    dispatch(getCategoryListAction({ ...filterParams, path: pathname }));
    dispatch(
      getShopListAction({
        ...filterParams,
        path: pathname,
        page: 1,
        limit: PAGING.PRODUCT_LIST,
      })
    );
  }, []);

  useEffect(() => {
    setFilterParams({
      categoryIds: [],
      pathname,
    });
    setCurrentPage(1);
    dispatch(
      changeBreadcrumbAction([
        { name: "Trang chủ", path: ROUTERS.HOME },
        { name: SERVICE_LIST[pathname] },
      ])
    );
  }, [pathname]);

  const handleFilterCategory = (values) => {
    setFilterParams({
      ...filterParams,
      categoryIds: values,
    });
    dispatch(
      getShopListAction({
        ...filterParams,
        path: pathname,
        categoryIds: values,
        page: 1,
        limit: PAGING.PRODUCT_LIST,
      })
    );
  };

  const handleFilterKeyword = (value) => {
    setFilterParams({
      ...filterParams,
      keyword: value,
    });
    dispatch(
      getShopListAction({
        ...filterParams,
        path: pathname,
        keyword: value,
        page: 1,
        limit: PAGING.PRODUCT_LIST,
      })
    );
  };

  const handleClearFilterCategory = (e, categoryId) => {
    e.preventDefault();
    const newCategoryIds = filterParams.categoryIds.filter(
      (categoryIdItem) => categoryIdItem !== categoryId
    );
    setFilterParams({
      ...filterParams,
      categoryIds: newCategoryIds,
    });
    dispatch(
      getShopListAction({
        ...filterParams,
        categoryIds: newCategoryIds,
        path: pathname,
        page: 1,
        limit: PAGING.PRODUCT_LIST,
      })
    );
  };

  const handleClearFilterKeyword = (e) => {
    e.preventDefault();
    setFilterParams({
      ...filterParams,
      keyword: "",
    });
    dispatch(
      getShopListAction({
        ...filterParams,
        keyword: "",
        path: pathname,
        page: 1,
        limit: PAGING.PRODUCT_LIST,
      })
    );
  };

  const renderCategoryList = useMemo(() => {
    if (categoryList.loading) return <Skeleton />;
    const categoryListOptions = categoryList.data.map((category) => ({
      value: category.id,
      label: category.name,
    }));

    return categoryListOptions.map((category, index) => (
      <Col md={6} sm={8} xs={12} key={index}>
        <Checkbox value={category.value}>{category.label}</Checkbox>
      </Col>
    ));
  }, [categoryList]);

  const renderFilterTag = useMemo(() => {
    return (
      <Space wrap style={{ marginBottom: 16 }}>
        {filterParams.categoryIds.map((categoryId, tagIndex) => {
          const categoryData = categoryList.data.find(
            (category) => category.id === categoryId
          );
          return (
            <Tag
              key={`category ${tagIndex}`}
              closable
              onClose={(e) => {
                handleClearFilterCategory(e, categoryId);
              }}
              color="#ff9c6e"
            >
              {categoryData.name}
            </Tag>
          );
        })}
        {filterParams.keyword && (
          <Tag
            closable
            onClose={(e) => handleClearFilterKeyword(e)}
            color="#ff9c6e"
          >
            <strong>Từ khóa:</strong> {filterParams.keyword}
          </Tag>
        )}
      </Space>
    );
  }, [filterParams]);

  const categoryListDisplay = (
    <S.CategoryDropdown>
      <Checkbox.Group
        onChange={(values) => handleFilterCategory(values)}
        onClick={(e) => e?.stopPropagation()}
        value={filterParams.categoryIds}
      >
        <Row gutter={16}>{renderCategoryList}</Row>
      </Checkbox.Group>
    </S.CategoryDropdown>
  );

  const renderShopList = useMemo(() => {
    if (shopList.loading) return <Skeleton />;
    return shopList.data.map((productItem, productIndex) => (
      <Col lg={6} sm={8} xs={12} key={productIndex}>
        <Card
          size="small"
          hoverable
          cover={<img alt={productItem.name} src={productItem.image} />}
          onClick={() => {
            navigate(`/shop/${productItem.id}`);
            dispatch(getShopDetailAction({ id: productItem.id }));
          }}
        >
          <S.ShopsName title={productItem.name}>{productItem.name}</S.ShopsName>
          <S.ShopsAddress title={productItem.address}>
            {productItem.address}
          </S.ShopsAddress>
          <S.ShopsKind>{productItem.kind}</S.ShopsKind>
        </Card>
      </Col>
    ));
  }, [shopList]);

  const handleChangePage = (page) => {
    dispatch(
      getShopListAction({
        ...filterParams,
        path: pathname,
        page,
        limit: PAGING.PRODUCT_LIST,
      })
    );
    setCurrentPage(page);
  };

  const renderPagination = () => {
    if (shopList.loading) return <Skeleton />;
    if (shopList.data.length === 0) return <></>;
    return (
      <S.Pagination>
        <Row justify="center">
          <Pagination
            current={currentPage}
            pageSize={PAGING.PRODUCT_LIST}
            total={parseInt(shopList.meta.total)}
            showSizeChanger={false}
            onChange={(page) => handleChangePage(page)}
          />
        </Row>
      </S.Pagination>
    );
  };

  return (
    <S.Wrapper>
      <S.NavFilterContainer>
        <S.NavFilter>
          <Dropdown
            overlay={categoryListDisplay}
            placement="bottomLeft"
            trigger={["click"]}
            onVisibleChange={() => setActiveButton(!activeButton)}
            style={{ width: 120, marginRight: 16 }}
          >
            {activeButton ? (
              <S.ActivatedCategoryButton>
                PHÂN LOẠI <CaretUpOutlined />
              </S.ActivatedCategoryButton>
            ) : (
              <S.CategoryButton>
                PHÂN LOẠI <CaretDownOutlined />
              </S.CategoryButton>
            )}
          </Dropdown>
          <S.SearchButton>
            <Input
              prefix={<SearchOutlined className="site-form-item-icon" />}
              placeholder="Tìm kiếm"
              value={filterParams.keyword}
              onChange={(e) => handleFilterKeyword(e.target.value)}
            />
          </S.SearchButton>
        </S.NavFilter>
        <div>{renderFilterTag}</div>
      </S.NavFilterContainer>
      <S.ShopsListContainer>
        <Row gutter={[16, 16]}>{renderShopList}</Row>
      </S.ShopsListContainer>
      {renderPagination()}
    </S.Wrapper>
  );
};

export default ShopList;
