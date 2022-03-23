import { createAction } from "@reduxjs/toolkit";

import { REQUEST, USER_ACTION } from "../constants";

export const signInAction = createAction(REQUEST(USER_ACTION.SIGN_IN));

export const signUpAction = createAction(REQUEST(USER_ACTION.SIGN_UP));

export const signOutAction = createAction(REQUEST(USER_ACTION.SIGN_OUT));

export const getUserInfoAction = createAction(
  REQUEST(USER_ACTION.GET_USER_INFO)
);

export const updateUserInfoAction = createAction(
  REQUEST(USER_ACTION.UPDATE_USER_INFO)
);
