import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, PURCHASE_ACTION } from "../constants";

const initialState = {
  purchaseStatus: {
    loading: false,
    errors: null,
  },
};

const purchaseReducer = createReducer(initialState, {
  [REQUEST(PURCHASE_ACTION.ADD_PURCHASE)]: (state, action) => {
    return {
      ...state,
      purchaseStatus: {
        ...state.purchaseStatus,
        loading: true,
      },
    };
  },
  [SUCCESS(PURCHASE_ACTION.ADD_PURCHASE)]: (state, action) => {
    return {
      ...state,
      purchaseStatus: {
        ...state.purchaseStatus,
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(PURCHASE_ACTION.ADD_PURCHASE)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      purchaseStatus: {
        ...state.purchaseStatus,
        loading: false,
        errors,
      },
    };
  },
});

export default purchaseReducer;
