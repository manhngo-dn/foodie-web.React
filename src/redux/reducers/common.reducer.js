import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, COMMON_ACTION } from "../constants";

const initialState = {
  breadcrumb: [],
};

const commonReducer = createReducer(initialState, {
  [REQUEST(COMMON_ACTION.CHANGE_BREADCRUMB)]: (state, action) => {
    return {
      ...state,
      breadcrumb: action.payload,
    };
  },
});

export default commonReducer;
