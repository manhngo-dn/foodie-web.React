import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, FAVORITE_ACTION } from "../constants";

const initialState = {
  favoriteList: {
    loading: false,
    errors: null,
  },
};

const favoriteReducer = createReducer(initialState, {
  [REQUEST(FAVORITE_ACTION.ADD_TO_FAVORITE)]: (state, action) => {
    return {
      ...state,
      favoriteList: {
        ...state.favoriteList,
        loading: true,
      },
    };
  },
  [SUCCESS(FAVORITE_ACTION.ADD_TO_FAVORITE)]: (state, action) => {
    return {
      ...state,
      favoriteList: {
        ...state.favoriteList,

        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(FAVORITE_ACTION.ADD_TO_FAVORITE)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      favoriteList: {
        ...state.favoriteList,
        loading: false,
        errors,
      },
    };
  },

  [REQUEST(FAVORITE_ACTION.REMOVE_FROM_FAVORITE)]: (state, action) => {
    return {
      ...state,
      favoriteList: {
        ...state.favoriteList,
        loading: true,
      },
    };
  },
  [SUCCESS(FAVORITE_ACTION.REMOVE_FROM_FAVORITE)]: (state, action) => {
    return {
      ...state,
      favoriteList: {
        ...state.favoriteList,

        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(FAVORITE_ACTION.REMOVE_FROM_FAVORITE)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      favoriteList: {
        ...state.favoriteList,
        loading: false,
        errors,
      },
    };
  },
});

export default favoriteReducer;
