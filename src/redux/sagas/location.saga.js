import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { REQUEST, SUCCESS, FAIL, LOCATION_ACTION } from "../constants";

function* getCityListSaga(action) {
  try {
    const result = yield axios.get(
      `https://foodie-web-delivery-api.herokuapp.com/cities`
    );

    yield put({
      type: SUCCESS(LOCATION_ACTION.GET_CITY_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(LOCATION_ACTION.GET_CITY_LIST),
      payload: "Lấy data lỗi",
    });
  }
}

function* getDistrictListSaga(action) {
  const { cityCode } = action.payload;
  try {
    const result = yield axios.get(
      `https://foodie-web-delivery-api.herokuapp.com/districts`,
      {
        params: {
          parentcode: cityCode,
        },
      }
    );

    yield put({
      type: SUCCESS(LOCATION_ACTION.GET_DISTRICT_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(LOCATION_ACTION.GET_DISTRICT_LIST),
      payload: "Lấy data lỗi",
    });
  }
}

function* getWardListSaga(action) {
  const { districtCode } = action.payload;
  try {
    const result = yield axios.get(
      `https://foodie-web-delivery-api.herokuapp.com/wards`,
      {
        params: {
          parentcode: districtCode,
        },
      }
    );

    yield put({
      type: SUCCESS(LOCATION_ACTION.GET_WARD_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(LOCATION_ACTION.GET_WARD_LIST),
      payload: "Lấy data lỗi",
    });
  }
}

export default function* locationSaga() {
  yield takeEvery(REQUEST(LOCATION_ACTION.GET_CITY_LIST), getCityListSaga);
  yield takeEvery(
    REQUEST(LOCATION_ACTION.GET_DISTRICT_LIST),
    getDistrictListSaga
  );
  yield takeEvery(REQUEST(LOCATION_ACTION.GET_WARD_LIST), getWardListSaga);
}
