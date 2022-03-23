import { createAction } from "@reduxjs/toolkit";

import { REQUEST, MEU_ACTION } from "../constants";

export const getMenuAction = createAction(REQUEST(MEU_ACTION.GET_MENU_ACTION));
