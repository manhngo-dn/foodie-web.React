import { createAction } from "@reduxjs/toolkit";

import { REQUEST, SHOP_DETAIL_ACTION } from "../constants";

export const getShopDetailAction = createAction(
  REQUEST(SHOP_DETAIL_ACTION.GET_SHOP_DETAIL)
);
