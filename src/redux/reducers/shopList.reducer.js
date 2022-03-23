import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, SHOP_LIST_ACTION } from "../constants";

const initialState = {
  shopList: {
    data: [],
    meta: {},
    loading: false,
    errors: null,
  },
};

const shopListReducer = createReducer(initialState, {
  [REQUEST(SHOP_LIST_ACTION.GET_SHOP_LIST)]: (state, action) => {
    return {
      ...state,
      shopList: {
        ...state.shopList,
        meta: {
          ...state.shopList.meta,
        },
        loading: true,
      },
    };
  },
  [SUCCESS(SHOP_LIST_ACTION.GET_SHOP_LIST)]: (state, action) => {
    const { data, meta } = action.payload;
    return {
      ...state,
      shopList: {
        ...state.shopList,
        data,
        meta,
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(SHOP_LIST_ACTION.GET_SHOP_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      shopList: {
        ...state.shopList,
        loading: false,
        errors,
      },
    };
  },
});

export default shopListReducer;
