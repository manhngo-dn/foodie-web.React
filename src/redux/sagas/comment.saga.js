import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { REQUEST, SUCCESS, FAIL, COMMENT_ACTION } from "../constants";

function* getCommentListSaga(action) {
  try {
    const { shopId } = action.payload;

    const result = yield axios.get(
      `https://foodie-web-delivery-api.herokuapp.com/comments`,
      {
        params: {
          shopId: shopId,
          _expand: "user",
          _sort: "id",
          _order: "desc",
        },
      }
    );

    yield put({
      type: SUCCESS(COMMENT_ACTION.GET_COMMENT_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(COMMENT_ACTION.GET_COMMENT_LIST),
      payload: "Lấy data lỗi",
    });
  }
}

function* sendCommentSaga(action) {
  const { shopId } = action.payload;
  try {
    const result = yield axios.post(
      `https://foodie-web-delivery-api.herokuapp.com/comments`,
      action.payload
    );

    yield put({
      type: REQUEST(COMMENT_ACTION.GET_COMMENT_LIST),
      payload: {
        shopId,
      },
    });

    yield put({
      type: SUCCESS(COMMENT_ACTION.SEND_COMMENT),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(COMMENT_ACTION.SEND_COMMENT),
      payload: "Lấy data lỗi",
    });
  }
}

export default function* commentSaga() {
  yield takeEvery(REQUEST(COMMENT_ACTION.GET_COMMENT_LIST), getCommentListSaga);
  yield takeEvery(REQUEST(COMMENT_ACTION.SEND_COMMENT), sendCommentSaga);
}
