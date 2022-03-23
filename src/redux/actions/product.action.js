import { createAction } from "@reduxjs/toolkit";

import { REQUEST, PRODUCT_ACTION } from "../constants";

export const getProductDetailAction = createAction(
  REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL)
);
