import styled from "styled-components";

export const Container = styled.div`
  padding-top: 30px;
`;

export const ShopDetail = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid #d7d7d7;
`;

export const ShopDetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 30px;
`;

export const ShopImage = styled.img`
  width: 480px;
  height: 300px;
`;

export const Breadcrumb = styled.div`
  font-size: 11px;
  color: #0288d1;

  padding-bottom: 10px;
`;

export const ShopKind = styled.div`
  font-size: 11px;
  color: #959595;
  padding-bottom: 5px;
`;

export const ShopName = styled.div`
  font-size: 24px;
  color: #464646;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 5px;
`;

export const ShopAddress = styled.div`
  font-size: 14px;
  padding-bottom: 5px;
`;

export const ShopActiveTime = styled.div`
  font-size: 16px;
  vertical-align: middle;
`;

export const MenuTab = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #cf2127;

  padding: 13px 26px;
`;

export const MenuCategoryList = styled.div`
  font-size: 14px;
  background-color: #fff;
  border-radius: 4px;
  padding: 10px;
`;

export const ProductList = styled.div`
  width: 100%;
  font-size: 14px;
  background-color: #fff;
  border-radius: 4px;
  padding: 10px;
`;

export const MenuCategory = styled.div`
  width: 100%;
`;

export const MenuCategoryName = styled.div`
  width: 100%;
  padding: 5px 0;
  font-size: 14px;
  color: #6d6f71;
  text-transform: uppercase;
`;

export const ProductItem = styled.div`
  width: 100%;
  padding: 5px 0;
  border-bottom: 1px solid #d7d7d7;
`;

export const ProductImage = styled.img`
  width: 60px;
  height: 60px;
`;

export const ProductName = styled.div`
  font-size: 16px;
  color: black;
  font-weight: 700;
  padding-bottom: 5px;
`;

export const ProductContent = styled.div`
  font-size: 14px;
  color: #6d6f71;
`;

export const ProductInitialPrice = styled.div`
  font-size: 14px;
  color: #6d6f71;
  text-decoration: line-through;
  padding-bottom: 5px;
`;

export const ProductCurrentPrice = styled.div`
  font-size: 16px;
  color: #0288d1;
  font-weight: 700;
`;

export const ProductQuantity = styled.div`
  font-size: 14px;
  color: #fff;
  text-align: center;
  border-radius: 4px;
  padding: 2px 10px;
  background-color: #959595;
`;

export const ProductAddToCart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  color: #fff;

  border-radius: 4px;
  width: 22px;
  height: 22px;
  background-color: #ee4d2d;
  cursor: pointer;
  &:hover {
    background-color: #e37f68;
  }
`;

export const BillContainer = styled.div`
  font-size: 14px;
  background-color: #fff;
  border-radius: 4px;
`;
