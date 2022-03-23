import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, SHOP_DETAIL_ACTION } from "../constants";

const initialState = {
  shopDetail: {
    data: {},
    loading: false,
    errors: null,
  },
};

const shopDetailReducer = createReducer(initialState, {
  [REQUEST(SHOP_DETAIL_ACTION.GET_SHOP_DETAIL)]: (state, action) => {
    return {
      ...state,
      shopDetail: {
        ...state.shopDetail,
        loading: true,
      },
    };
  },
  [SUCCESS(SHOP_DETAIL_ACTION.GET_SHOP_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      shopDetail: {
        ...state.shopDetail,
        data,
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(SHOP_DETAIL_ACTION.GET_SHOP_DETAIL)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      shopDetail: {
        ...state.shopDetail,
        loading: false,
        errors,
      },
    };
  },
});

export default shopDetailReducer;
