import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, SERVICE_ACTION } from "../constants";

const initialState = {
  serviceList: {
    data: [],
    loading: false,
    errors: null,
  },
};

const categoryReducer = createReducer(initialState, {
  [REQUEST(SERVICE_ACTION.GET_SERVICE_LIST)]: (state, action) => {
    return {
      ...state,
      serviceList: {
        ...state.serviceList,
        loading: true,
      },
    };
  },
  [SUCCESS(SERVICE_ACTION.GET_SERVICE_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      serviceList: {
        ...state.serviceList,
        data,
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(SERVICE_ACTION.GET_SERVICE_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      serviceList: {
        ...state.serviceList,
        loading: false,
        errors,
      },
    };
  },
});

export default categoryReducer;
