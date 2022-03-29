import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, SHOP_LIST_ACTION } from "../constants";

const initialState = {
  shopList: {
    data: [],
    meta: {},
    loading: false,
    errors: null,
  },
  topShopList: {
    data: {},
    loading: false,
    errors: null,
  },
  newShopList: {
    data: {},
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

  [REQUEST(SHOP_LIST_ACTION.GET_TOP_SHOP_LIST)]: (state, action) => {
    return {
      ...state,
      topShopList: {
        ...state.topShopList,
        loading: true,
      },
    };
  },
  [SUCCESS(SHOP_LIST_ACTION.GET_TOP_SHOP_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      topShopList: {
        ...state.topShopList,
        data,
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(SHOP_LIST_ACTION.GET_TOP_SHOP_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      topShopList: {
        ...state.topShopList,
        loading: false,
        errors,
      },
    };
  },

  [REQUEST(SHOP_LIST_ACTION.GET_NEW_SHOP_LIST)]: (state, action) => {
    return {
      ...state,
      newShopList: {
        ...state.newShopList,
        loading: true,
      },
    };
  },
  [SUCCESS(SHOP_LIST_ACTION.GET_NEW_SHOP_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      newShopList: {
        ...state.newShopList,
        data,
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(SHOP_LIST_ACTION.GET_NEW_SHOP_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      newShopList: {
        ...state.newShopList,
        loading: false,
        errors,
      },
    };
  },
});

export default shopListReducer;
