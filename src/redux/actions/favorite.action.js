import { createAction } from "@reduxjs/toolkit";

import { REQUEST, FAVORITE_ACTION } from "../constants";

export const addToFavoriteAction = createAction(
  REQUEST(FAVORITE_ACTION.ADD_TO_FAVORITE)
);
export const removeFromFavoriteAction = createAction(
  REQUEST(FAVORITE_ACTION.REMOVE_FROM_FAVORITE)
);
