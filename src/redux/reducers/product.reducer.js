import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, PRODUCT_ACTION } from "../constants";

const initialState = {
  productList: {
    data: [],
    loading: false,
    errors: null,
  },
};

const productReducer = createReducer(initialState, {
  [REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    return {
      ...state,
      productList: {
        ...state.productList,
        loading: true,
      },
    };
  },
  [SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      productList: {
        ...state.productList,
        data,
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      productList: {
        ...state.productList,
        loading: false,
        errors,
      },
    };
  },
});

export default productReducer;
