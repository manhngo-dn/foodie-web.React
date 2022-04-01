import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { REQUEST, SUCCESS, FAIL, SHOP_DETAIL_ACTION } from "../constants";

function* getShopDetailSaga(action) {
  try {
    const { id } = action.payload;

    const result = yield axios.get(
      `https://foodie-web-delivery-api.herokuapp.com/shops?id=${id}`,
      {
        params: {
          _embed: "favorites",
        },
      }
    );
    if (result.data.length === 1) {
      const data = result.data[0];
      yield put({
        type: SUCCESS(SHOP_DETAIL_ACTION.GET_SHOP_DETAIL),
        payload: {
          data,
        },
      });
    }
  } catch (error) {
    yield put({
      type: FAIL(SHOP_DETAIL_ACTION.GET_SHOP_DETAIL),
      payload: "Lấy data lỗi",
    });
  }
}

export default function* shopDetailSaga() {
  yield takeEvery(
    REQUEST(SHOP_DETAIL_ACTION.GET_SHOP_DETAIL),
    getShopDetailSaga
  );
}
