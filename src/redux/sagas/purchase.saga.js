import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { message } from "antd";

import { REQUEST, SUCCESS, FAIL, PURCHASE_ACTION } from "../constants";

function* addPurchaseSaga(action) {
  const { data, callback } = action.payload;
  try {
    yield axios.post(
      `https://foodie-web-delivery-api.herokuapp.com/purchases`,
      data
    );

    yield put({
      type: SUCCESS(PURCHASE_ACTION.ADD_PURCHASE),
      payload: {
        loading: false,
      },
    });
    message.success("Bạn đã đặt hàng thành công");
    if (callback.finishPayment) yield callback.finishPayment();
  } catch (error) {
    message.warning("Đặt hàng không thành công");
    yield put({
      type: FAIL(PURCHASE_ACTION.ADD_PURCHASE),
      payload: {
        loading: false,
        errors: "Giao dịch thất bại",
      },
    });
  }
}

function* getPurchaseListSaga(action) {
  try {
    const { userId, page, limit } = action.payload;
    const result = yield axios.get(
      `https://foodie-web-delivery-api.herokuapp.com/purchases`,
      {
        params: {
          userId,
          _expand: "shop",
          _page: page,
          _limit: limit,
          _sort: "id",
          _order: "desc",
        },
      }
    );

    yield put({
      type: SUCCESS(PURCHASE_ACTION.GET_PURCHASE_LIST),
      payload: {
        data: result.data,
        meta: {
          page,
          limit,
          total: result.headers["x-total-count"],
        },
        loading: false,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(PURCHASE_ACTION.GET_PURCHASE_LIST),
      payload: {
        loading: false,
        errors: "Lấy dữ liệu lỗi",
      },
    });
  }
}

export default function* purchaseSaga() {
  yield takeEvery(REQUEST(PURCHASE_ACTION.ADD_PURCHASE), addPurchaseSaga);
  yield takeEvery(
    REQUEST(PURCHASE_ACTION.GET_PURCHASE_LIST),
    getPurchaseListSaga
  );
}
