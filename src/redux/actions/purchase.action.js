import { createAction } from "@reduxjs/toolkit";

import { REQUEST, PURCHASE_ACTION } from "../constants";

export const addPurchaseAction = createAction(
  REQUEST(PURCHASE_ACTION.ADD_PURCHASE)
);
