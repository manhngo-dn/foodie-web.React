import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
  REQUEST,
  SUCCESS,
  FAIL,
  FAVORITE_ACTION,
  SHOP_DETAIL_ACTION,
} from "../constants";

function* addToFavoriteSaga(action) {
  const { shopId } = action.payload;
  try {
    yield axios.post(`http://localhost:4000/favorites`, action.payload);

    yield put({
      type: REQUEST(SHOP_DETAIL_ACTION.GET_SHOP_DETAIL),
      payload: {
        id: shopId,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(FAVORITE_ACTION.ADD_TO_FAVORITE),
      payload: "Lấy data lỗi",
    });
  }
}

function* removeFromFavoriteSaga(action) {
  const { shopId, favoriteId } = action.payload;
  try {
    yield axios.delete(`http://localhost:4000/favorites/${favoriteId}`);

    yield put({
      type: REQUEST(SHOP_DETAIL_ACTION.GET_SHOP_DETAIL),
      payload: {
        id: shopId,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(FAVORITE_ACTION.REMOVE_FROM_FAVORITE),
      payload: "Lấy data lỗi",
    });
  }
}

export default function* favoriteSaga() {
  yield takeEvery(REQUEST(FAVORITE_ACTION.ADD_TO_FAVORITE), addToFavoriteSaga);
  yield takeEvery(
    REQUEST(FAVORITE_ACTION.REMOVE_FROM_FAVORITE),
    removeFromFavoriteSaga
  );
}
