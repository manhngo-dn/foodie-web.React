import { createAction } from "@reduxjs/toolkit";

import { REQUEST, SHOP_LIST_ACTION } from "../constants";

export const getCategoryListAction = createAction(
  REQUEST(SHOP_LIST_ACTION.GET_CATEGORY_LIST)
);

export const getShopListAction = createAction(
  REQUEST(SHOP_LIST_ACTION.GET_SHOP_LIST)
);

export const getTopShopListAction = createAction(
  REQUEST(SHOP_LIST_ACTION.GET_TOP_SHOP_LIST)
);

export const getNewShopListAction = createAction(
  REQUEST(SHOP_LIST_ACTION.GET_NEW_SHOP_LIST)
);
