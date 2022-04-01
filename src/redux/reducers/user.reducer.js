import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, USER_ACTION } from "../constants";

const initialState = {
  userInfo: {
    data: {},
    loading: false,
    errors: null,
  },
  signInData: {
    loading: false,
    errors: null,
  },
  signUpData: {
    loading: false,
    errors: null,
  },
  changePasswordData: {
    loading: false,
    errors: null,
  },
};

const userReducer = createReducer(initialState, {
  [REQUEST(USER_ACTION.SIGN_IN)]: (state, action) => {
    return {
      ...state,
      signInData: {
        loading: true,
        errors: null,
      },
    };
  },
  [SUCCESS(USER_ACTION.SIGN_IN)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        data: data.user,
        loading: false,
        errors: null,
      },
      signInData: {
        ...state.signInData,
        loading: false,
        errors: null,
      },
    };
  },

  [FAIL(USER_ACTION.SIGN_IN)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,

      signInData: {
        ...state.signInData,
        loading: false,
        errors,
      },
    };
  },

  [REQUEST(USER_ACTION.SIGN_UP)]: (state, action) => {
    return {
      ...state,
      signUpData: {
        ...state.signUpData,
        loading: true,
        errors: null,
      },
    };
  },
  [SUCCESS(USER_ACTION.SIGN_UP)]: (state, action) => {
    return {
      ...state,
      signUpData: {
        ...state.signUpData,
        loading: false,
        errors: null,
      },
    };
  },

  [FAIL(USER_ACTION.SIGN_UP)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,

      signUpData: {
        ...state.signInData,
        loading: false,
        errors,
      },
    };
  },

  [REQUEST(USER_ACTION.GET_USER_INFO)]: (state, action) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        loading: true,
      },
    };
  },
  [SUCCESS(USER_ACTION.GET_USER_INFO)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        data,
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(USER_ACTION.GET_USER_INFO)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        loading: false,
        errors,
      },
    };
  },

  [REQUEST(USER_ACTION.SIGN_OUT)]: (state, action) => {
    return {
      ...state,
      userInfo: {
        data: {},
        loading: false,
        errors: null,
      },
    };
  },

  [REQUEST(USER_ACTION.CHANGE_PASSWORD)]: (state, action) => {
    return {
      ...state,
      changePasswordData: {
        ...state.changePasswordData,
        loading: true,
      },
    };
  },
  [SUCCESS(USER_ACTION.CHANGE_PASSWORD)]: (state, action) => {
    return {
      ...state,
      changePasswordData: {
        ...state.changePasswordData,
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(USER_ACTION.CHANGE_PASSWORD)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      changePasswordData: {
        ...state.changePasswordData,
        loading: false,
        errors,
      },
    };
  },
});

export default userReducer;
