import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, SHOP_LIST_ACTION } from "../constants";

const initialState = {
  categoryList: {
    data: [],
    loading: false,
    errors: null,
  },
};

const categoryReducer = createReducer(initialState, {
  [REQUEST(SHOP_LIST_ACTION.GET_CATEGORY_LIST)]: (state, action) => {
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        loading: true,
      },
    };
  },
  [SUCCESS(SHOP_LIST_ACTION.GET_CATEGORY_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        data,
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(SHOP_LIST_ACTION.GET_CATEGORY_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        loading: false,
        errors,
      },
    };
  },
});

export default categoryReducer;
