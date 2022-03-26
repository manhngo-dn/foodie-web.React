import { createAction } from "@reduxjs/toolkit";

import { REQUEST, PURCHASE_ACTION } from "../constants";

export const addPurchaseAction = createAction(
  REQUEST(PURCHASE_ACTION.ADD_PURCHASE)
);

export const getPurchaseListAction = createAction(
  REQUEST(PURCHASE_ACTION.GET_PURCHASE_LIST)
);
