import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, MEU_ACTION } from "../constants";

const initialState = {
  menuList: {
    data: [],
    loading: false,
    errors: null,
  },
};

const menuReducer = createReducer(initialState, {
  [REQUEST(MEU_ACTION.GET_MENU_ACTION)]: (state, action) => {
    return {
      ...state,
      menuList: {
        ...state.menuList,
        loading: true,
      },
    };
  },
  [SUCCESS(MEU_ACTION.GET_MENU_ACTION)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      menuList: {
        ...state.menuList,
        data,
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(MEU_ACTION.GET_MENU_ACTION)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      menuList: {
        ...state.menuList,
        loading: false,
        errors,
      },
    };
  },
});

export default menuReducer;
