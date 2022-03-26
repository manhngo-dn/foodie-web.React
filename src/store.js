import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import categoryReducer from "./redux/reducers/category.reducer";
import shopListReducer from "./redux/reducers/shopList.reducer";
import shopDetailReducer from "./redux/reducers/shopDetail.reducer";
import userReducer from "./redux/reducers/user.reducer";
import serviceReducer from "./redux/reducers/service.reducer";
import productReducer from "./redux/reducers/product.reducer";
import menuReducer from "./redux/reducers/menu.reducer";
import cartReducer from "./redux/reducers/cart.reducer";
import locationReducer from "./redux/reducers/location.reducer";
import purchaseReducer from "./redux/reducers/purchase.reducer";
import commentReducer from "./redux/reducers/comment.reducer";
import favoriteReducer from "./redux/reducers/favorite.reducer";
import rootSaga from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    userReducer,
    serviceReducer,
    categoryReducer,
    shopListReducer,
    shopDetailReducer,
    productReducer,
    menuReducer,
    cartReducer,
    locationReducer,
    purchaseReducer,
    commentReducer,
    favoriteReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export default store;
