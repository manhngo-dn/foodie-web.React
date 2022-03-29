import { debounce, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { REQUEST, SUCCESS, FAIL, SHOP_LIST_ACTION } from "../constants";

function* getCategoryListSaga(action) {
  try {
    const { path } = action.payload;
    const serviceList = yield axios.get(`http://localhost:4000/services`);
    const serviceId = serviceList.data.find(
      (service) => service.path === path
    ).id;

    const result = yield axios.get("http://localhost:4000/categories?", {
      params: {
        serviceId: serviceId,
      },
    });
    yield put({
      type: SUCCESS(SHOP_LIST_ACTION.GET_CATEGORY_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(SHOP_LIST_ACTION.GET_CATEGORY_LIST),
      payload: "Lấy data lỗi",
    });
  }
}

function* getShopListSaga(action) {
  try {
    const { page, limit, categoryIds, keyword, path } = action.payload;

    const serviceList = yield axios.get(`http://localhost:4000/services`);
    const serviceId = serviceList.data.find(
      (service) => service.path === path
    ).id;

    const result = yield axios.get("http://localhost:4000/shops", {
      params: {
        serviceId: serviceId,
        categoryId: categoryIds,
        q: keyword,
        _limit: limit,
        _page: page,
      },
    });
    yield put({
      type: SUCCESS(SHOP_LIST_ACTION.GET_SHOP_LIST),
      payload: {
        data: result.data,
        meta: {
          page,
          limit,
          total: result.headers["x-total-count"],
        },
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(SHOP_LIST_ACTION.GET_SHOP_LIST),
      payload: "Lấy data lỗi",
    });
  }
}

function* getTopShopListSaga(action) {
  try {
    const result = yield axios.get("http://localhost:4000/tops", {
      params: {
        _embed: "shops",
      },
    });
    yield put({
      type: SUCCESS(SHOP_LIST_ACTION.GET_TOP_SHOP_LIST),
      payload: {
        data: result.data[0],
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(SHOP_LIST_ACTION.GET_TOP_SHOP_LIST),
      payload: "Lấy data lỗi",
    });
  }
}

function* getNewShopListSaga(action) {
  try {
    const result = yield axios.get("http://localhost:4000/news", {
      params: {
        _embed: "shops",
      },
    });
    yield put({
      type: SUCCESS(SHOP_LIST_ACTION.GET_NEW_SHOP_LIST),
      payload: {
        data: result.data[0],
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(SHOP_LIST_ACTION.GET_NEW_SHOP_LIST),
      payload: "Lấy data lỗi",
    });
  }
}

export default function* shopListSaga() {
  yield takeEvery(
    REQUEST(SHOP_LIST_ACTION.GET_CATEGORY_LIST),
    getCategoryListSaga
  );
  yield debounce(500, REQUEST(SHOP_LIST_ACTION.GET_SHOP_LIST), getShopListSaga);
  yield takeEvery(
    REQUEST(SHOP_LIST_ACTION.GET_TOP_SHOP_LIST),
    getTopShopListSaga
  );
  yield takeEvery(
    REQUEST(SHOP_LIST_ACTION.GET_NEW_SHOP_LIST),
    getNewShopListSaga
  );
}
