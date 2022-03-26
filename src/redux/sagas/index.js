import { fork } from "redux-saga/effects";

import shopListSaga from "./shopList.saga";
import userSaga from "./user.saga";
import serviceSaga from "./service.saga";
import shopDetailSaga from "./shopDetail.saga";
import productSaga from "./product.saga";
import menuListSaga from "./menu.saga";
import locationSaga from "./location.saga";
import purchaseSaga from "./purchase.saga";
import commentSaga from "./comment.saga";
import favoriteSaga from "./favorite.saga";

export default function* rootSaga() {
  yield fork(shopListSaga);
  yield fork(userSaga);
  yield fork(serviceSaga);
  yield fork(shopDetailSaga);
  yield fork(productSaga);
  yield fork(menuListSaga);
  yield fork(locationSaga);
  yield fork(purchaseSaga);
  yield fork(commentSaga);
  yield fork(favoriteSaga);
}
