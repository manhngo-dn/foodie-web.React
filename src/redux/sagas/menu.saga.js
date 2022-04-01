import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { REQUEST, SUCCESS, FAIL, MEU_ACTION } from "../constants";

function* getMenuListSaga(action) {
  try {
    const { id } = action.payload;

    const result = yield axios.get(
      `https://foodie-web-delivery-api.herokuapp.com/menus`,
      {
        params: {
          shopId: id,
        },
      }
    );

    yield put({
      type: SUCCESS(MEU_ACTION.GET_MENU_ACTION),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(MEU_ACTION.GET_MENU_ACTION),
      payload: "Lấy data lỗi",
    });
  }
}

export default function* menuSaga() {
  yield takeEvery(REQUEST(MEU_ACTION.GET_MENU_ACTION), getMenuListSaga);
}
