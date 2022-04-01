import styled from "styled-components";

export const Container = styled.div``;

export const ShopDetail = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid #d7d7d7;
`;

export const ShopDetailInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ShopImage = styled.img`
  width: 480px;
  height: 300px;
`;

export const ShopKind = styled.div`
  font-size: 14px;
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
`;

export const ShopAddress = styled.div`
  font-size: 15px;
`;

export const ShopActiveTime = styled.div`
  font-size: 15px;
`;

export const MenuTab = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #cf2127;
  padding: 12px 24px 0;

  @media (max-width: 1200px) {
    padding: 0 16px;
  }
`;

export const MenuCategoryList = styled.div`
  font-size: 14px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebebeb;
  padding: 10px;
  position: sticky;
  top: 86px;
  display: flex;
  flex-direction: column;
`;

export const MenuCategoryItem = styled.div`
  font-size: 14px;
  text-transform: upperCase;
  padding: 5px;

  margin: 5px 0px;
`;

export const ProductList = styled.div`
  position: sticky;
  top: 70px;
  width: 100%;
  font-size: 14px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebebeb;
  padding: 20px;
`;

export const MenuCategory = styled.div`
  width: 100%;
  margin-bottom: 16px;
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
  border: 1px solid #ebebeb;
  position: sticky;
  top: 86px;

  @media (max-width: 1200px) {
    margin-top: 16px;
  }
`;

export const CommentContainer = styled.div`
  border: 1px solid #ebebeb;
  border-radius: 4px;
  margin-bottom: 12px;
  padding: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const UserNameComment = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

export const CommentTime = styled.div`
  font-size: 12px;
  color: #959595;
`;

export const CommentContent = styled.div`
  font-size: 14px;
`;

export const Rate = styled.div`
  text-align: start;
`;

export const Favorites = styled.span`
  font-size: 16px;
  color: #ee4d2d;
`;
