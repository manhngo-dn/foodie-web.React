import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, CART_ACTION } from "../constants";

const initialState = {
  cartList: {
    data: [],
    loading: false,
    errors: null,
  },
};

const cartReducer = createReducer(initialState, {
  [REQUEST(CART_ACTION.ADD_TO_CART)]: (state, action) => {
    const { productId } = action.payload;
    const newCartList = [...state.cartList.data];
    const existingProductIndex = newCartList.findIndex(
      (product) => product.productId === productId
    );
    if (existingProductIndex !== -1) {
      newCartList.splice(existingProductIndex, 1, {
        ...newCartList[existingProductIndex],
        quantity: newCartList[existingProductIndex].quantity + 1,
      });
      localStorage.setItem("cartList", JSON.stringify(newCartList));
      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: newCartList,
        },
      };
    } else {
      localStorage.setItem(
        "cartList",
        JSON.stringify([...state.cartList.data, action.payload])
      );
      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: [...state.cartList.data, action.payload],
        },
      };
    }
  },

  [REQUEST(CART_ACTION.REDUCE_QUANTITY)]: (state, action) => {
    const { productId } = action.payload;
    const newCartList = [...state.cartList.data];
    const existingProductIndex = newCartList.findIndex(
      (product) => product.productId === productId
    );

    if (newCartList[existingProductIndex].quantity > 1) {
      newCartList.splice(existingProductIndex, 1, {
        ...newCartList[existingProductIndex],
        quantity: newCartList[existingProductIndex].quantity - 1,
      });
      localStorage.setItem("cartList", JSON.stringify(newCartList));
      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: newCartList,
        },
      };
    } else {
      newCartList.splice(existingProductIndex, 1);
      localStorage.setItem("cartList", JSON.stringify(newCartList));
      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: newCartList,
        },
      };
    }
  },

  [REQUEST(CART_ACTION.REMOVE_FROM_CART)]: (state, action) => {
    const { productId } = action.payload;
    const newCartList = [...state.cartList.data];
    const existingProductIndex = newCartList.findIndex(
      (product) => product.productId === productId
    );

    newCartList.splice(existingProductIndex, 1);
    localStorage.setItem("cartList", JSON.stringify(newCartList));
    return {
      ...state,
      cartList: {
        ...state.cartList,
        data: newCartList,
      },
    };
  },

  [REQUEST(CART_ACTION.CLEAR_CART)]: (state, action) => {
    const { shopId } = action.payload;

    const newCartList = state.cartList.data.filter(
      (product) => product.shopId !== shopId
    );
    localStorage.setItem("cartList", JSON.stringify(newCartList));
    return {
      ...state,
      cartList: {
        ...state.cartList,
        data: newCartList,
      },
    };
  },
});

export default cartReducer;
