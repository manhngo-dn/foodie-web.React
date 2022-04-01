import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { REQUEST, SUCCESS, FAIL, SERVICE_ACTION } from "../constants";

function* getServiceListSaga(action) {
  try {
    const result = yield axios.get(
      `https://foodie-web-delivery-api.herokuapp.com/services`
    );

    yield put({
      type: SUCCESS(SERVICE_ACTION.GET_SERVICE_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(SERVICE_ACTION.GET_SERVICE_LIST),
      payload: "Lấy data lỗi",
    });
  }
}

export default function* serviceSaga() {
  yield takeEvery(REQUEST(SERVICE_ACTION.GET_SERVICE_LIST), getServiceListSaga);
}
