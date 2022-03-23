import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { message } from "antd";

import { REQUEST, SUCCESS, FAIL, PURCHASE_ACTION } from "../constants";

function* addPurchaseSaga(action) {
  const { data, callback } = action.payload;
  try {
    yield axios.post(`http://localhost:4000/purchases`, data);

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

export default function* purchaseSaga() {
  yield takeEvery(REQUEST(PURCHASE_ACTION.ADD_PURCHASE), addPurchaseSaga);
}
