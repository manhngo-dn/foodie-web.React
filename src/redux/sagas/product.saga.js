import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { REQUEST, SUCCESS, FAIL, PRODUCT_ACTION } from "../constants";

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;

    const result = yield axios.get(
      `https://foodie-web-delivery-api.herokuapp.com/products`,
      {
        params: {
          shopId: id,
        },
      }
    );

    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: "Lấy data lỗi",
    });
  }
}

export default function* productSaga() {
  yield takeEvery(
    REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
    getProductDetailSaga
  );
}
