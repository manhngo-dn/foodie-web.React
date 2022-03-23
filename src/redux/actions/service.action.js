import { createAction } from "@reduxjs/toolkit";

import { REQUEST, SERVICE_ACTION } from "../constants";

export const getServiceListAction = createAction(
  REQUEST(SERVICE_ACTION.GET_SERVICE_LIST)
);
