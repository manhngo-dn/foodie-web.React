import { createAction } from "@reduxjs/toolkit";

import { REQUEST, CART_ACTION } from "../constants";

export const addToCartAction = createAction(REQUEST(CART_ACTION.ADD_TO_CART));
export const reduceQuantityAction = createAction(
  REQUEST(CART_ACTION.REDUCE_QUANTITY)
);
export const removeFromCartAction = createAction(
  REQUEST(CART_ACTION.REMOVE_FROM_CART)
);

export const clearCartAction = createAction(REQUEST(CART_ACTION.CLEAR_CART));
