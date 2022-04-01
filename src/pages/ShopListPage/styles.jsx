import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const NavFilterContainer = styled.div`
  display: block;
  position: relative;
  padding-top: 15px;

  border-bottom: 1px solid #d7d7d7;
`;

export const NavFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 15px;

  clear: both;
`;

export const ListFilter = styled.div`
  float: left;
`;

export const CategoryButton = styled.span`
  padding: 4px 8px;
  border-radius: 2px;
  text-align: center;
  background-color: #fff2e8;
  border: 1px solid #f5c9b9;
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: #f5c9b9;
    border: 1px solid #ffbb96;
    font-weight: 700;
  }
`;

export const ActivatedCategoryButton = styled.span`
  padding: 4px 8px;
  border-radius: 2px;
  text-align: center;
  color: #fff;
  background-color: #f5c9b9;
  border: 1px solid #ffbb96;
  font-weight: 700;
  cursor: pointer;
`;

export const CategoryDropdown = styled.div`
  width: 700px;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;

  @media (max-width: 768px) {
    width: 500px;
  }

  @media (max-width: 550px) {
    width: 280px;
  }
`;

export const SearchButton = styled.div`
  width: calc(100% - 136px);

  @media (max-width: 375px) {
    width: 100%;
    margin-top: 8px;
  }
`;

export const ShopsListContainer = styled.div`
  flex: 1;
  width: 100%;
  margin-top: 20px;
`;

export const ShopsName = styled.div`
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const ShopsAddress = styled.div`
  font-size: 14px;
  color: #8e8e8e;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const ShopsKind = styled.div`
  width: 100%;
  padding-top: 10px;

  font-size: 14px;
  color: #8e8e8e;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const Pagination = styled.div`
  width: 100%;
  padding-top: 20px;
`;
