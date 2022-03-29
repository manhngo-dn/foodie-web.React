import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";

import "./App.css";
import PrimaryLayout from "./layouts/PrimaryLayout";
import LoginLayout from "./layouts/LoginLayout";
import ShopList from "./pages/ShopListPage";
import Home from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserInfoPage from "./pages/UserInfoPage";
import ShopDetail from "./pages/ShopDetail";
import { ROUTERS } from "./constants/routers";
import {
  getUserInfoAction,
  addToCartAction,
  getServiceListAction,
} from "./redux/actions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getServiceListAction());

    const accessToken = localStorage.getItem("accessToken");
    const cartList = JSON.parse(localStorage.getItem("cartList"));

    if (accessToken) {
      const decodedUserData = jwtDecode(accessToken);
      dispatch(getUserInfoAction({ id: decodedUserData.sub }));
    }
    if (cartList) {
      cartList.map((product) => {
        dispatch(addToCartAction(product));
      });
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path={ROUTERS.HOME} element={<Home />} />
        <Route element={<PrimaryLayout />}>
          <Route path={ROUTERS.FOOD} element={<ShopList />} />
          <Route path={ROUTERS.FRESH} element={<ShopList />} />
          <Route path={ROUTERS.LIQUOR} element={<ShopList />} />
          <Route path={ROUTERS.FLOWERS} element={<ShopList />} />
          <Route path={ROUTERS.MARKETS} element={<ShopList />} />
          <Route path={ROUTERS.MEDICINE} element={<ShopList />} />
          <Route path={ROUTERS.PETS} element={<ShopList />} />
          <Route path={ROUTERS.SHOP_DETAIL} element={<ShopDetail />} />
          <Route path={ROUTERS.USER_INFO} element={<UserInfoPage />} />
        </Route>
        <Route element={<LoginLayout />}>
          <Route path={ROUTERS.SIGN_IN} element={<LoginPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
