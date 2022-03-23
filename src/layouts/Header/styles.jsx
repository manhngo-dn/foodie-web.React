import styled from "styled-components";

export const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  background-color: #fff;
  display: block;
  height: 70px;
  width: 100%;
  z-index: 100;
`;

export const HeaderContainer = styled.div`
  margin: auto;
  position: relative;
  display: block;
  margin: 0 auto;

  max-width: 1200px;
  height: 100%;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  position: relative;
  width: 100%;
  height: 100%;
`;

export const LogoWrapper = styled.div`
  position: static;
  right: 100%;
  margin-right: 70px;
  height: 30px;
`;

export const Logo = styled.img`
  height: 30px;
  cursor: pointer;
`;

export const Navbar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  align-items: end;
`;

export const MainNavbar = styled.div`
  display: flex;
  flex-direction: row;

  height: 100%;
  align-items: end;
`;

export const NavbarItem = styled.div`
  padding: 10px 12px 21px;
  margin-bottom: 0;
  height: 100%;
  font-size: 14px;
  color: black;
  cursor: pointer;
  &:hover {
    color: #ee4d2d;
  }
`;

export const NavbarActiveItem = styled.div`
  padding: 10px 12px 21px;
  margin-bottom: 0;
  height: 100%;
  font-size: 14px;
  font-weight: 700;
  color: #ee4d2d;

  border-bottom: 5px solid #ee4d2d;
`;

export const userButton = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #d4380d;
  cursor: pointer;
`;

export const userAccount = styled.div`
  padding-left: 40px;
  height: 100%;
  max-width: 250px;
  display: flex;
  align-items: center;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
