import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { message } from "antd";

import { REQUEST, SUCCESS, FAIL, USER_ACTION } from "../constants";

function* signInSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post("http://localhost:4000/login", data);
    yield localStorage.setItem("accessToken", result.data.accessToken);
    yield put({
      type: SUCCESS(USER_ACTION.SIGN_IN),
      payload: {
        data: result.data,
      },
    });
    message.success("Đăng nhập thành công");
    if (callback.redirectHome) yield callback.redirectHome();
  } catch (error) {
    yield put({
      type: FAIL(USER_ACTION.SIGN_IN),
      payload: {
        errors: "Email hoặc mật khẩu không đúng",
      },
    });
  }
}

function* signUpSaga(action) {
  try {
    const { data, callback } = action.payload;
    yield axios.post("http://localhost:4000/register", data);
    yield put({
      type: SUCCESS(USER_ACTION.SIGN_UP),
    });
    message.success("Đăng ký thành công");
    if (callback.redirectSignIn) yield callback.redirectSignIn();
  } catch (errors) {
    const errorMessage =
      errors.response.data === "Email already exists"
        ? "Email đã tồn tại"
        : errors.response.data;
    yield put({
      type: FAIL(USER_ACTION.SIGN_UP),
      payload: {
        errors: errorMessage,
      },
    });
  }
}

function* getUserInfoSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/users/${id}`);
    yield put({
      type: SUCCESS(USER_ACTION.GET_USER_INFO),
      payload: {
        data: result.data,
      },
    });
  } catch (errors) {
    yield put({
      type: FAIL(USER_ACTION.GET_USER_INFO),
      payload: {
        errors: "Không tìm thấy người dùng",
      },
    });
  }
}

function* updateUserInfoSaga(action) {
  try {
    const { id, location, fullName, email, phoneNumber } = action.payload;
    const result = yield axios.patch(`http://localhost:4000/users/${id}`, {
      location: location,
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
    });
    yield put({
      type: SUCCESS(USER_ACTION.GET_USER_INFO),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(USER_ACTION.GET_USER_INFO),
      payload: {
        errors: "Lỗi không xác định",
      },
    });
  }
}

function* changePasswordSaga(action) {
  try {
    const { id, data, callback } = action.payload;
    yield axios.post("http://localhost:4000/login", {
      email: data.email,
      password: data.oldPassword,
    });
    yield axios.patch(`http://localhost:4000/users/${id}`, {
      password: data.newPassword,
    });
    if (callback?.clearForm) {
      yield callback.clearForm();
    }
    yield put({
      type: SUCCESS(USER_ACTION.CHANGE_PASSWORD),
    });
    message.success("Đổi mật khẩu thành công");
  } catch (error) {
    yield put({
      type: FAIL(USER_ACTION.CHANGE_PASSWORD),
      payload: {
        errors: "Mật khẩu cũ không đúng",
      },
    });
  }
}

export default function* userSaga() {
  yield takeEvery(REQUEST(USER_ACTION.SIGN_IN), signInSaga);
  yield takeEvery(REQUEST(USER_ACTION.SIGN_UP), signUpSaga);
  yield takeEvery(REQUEST(USER_ACTION.GET_USER_INFO), getUserInfoSaga);
  yield takeEvery(REQUEST(USER_ACTION.UPDATE_USER_INFO), updateUserInfoSaga);
  yield takeEvery(REQUEST(USER_ACTION.CHANGE_PASSWORD), changePasswordSaga);
}
