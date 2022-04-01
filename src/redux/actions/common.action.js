import { createAction } from "@reduxjs/toolkit";

import { REQUEST, COMMON_ACTION } from "../constants";

export const changeBreadcrumbAction = createAction(
  REQUEST(COMMON_ACTION.CHANGE_BREADCRUMB)
);
