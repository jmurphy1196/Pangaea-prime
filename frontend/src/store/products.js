import { actionTypes } from "./actionTypes";
import { csrfFetch } from "./csrf";

const initialState = {
  orderedProductIds: [],
};

const addProducts = (products) => ({
  type: actionTypes.GET_PRODUCTS,
  payload: {
    products: products,
  },
});

export const clearProducts = () => ({
  type: actionTypes.CLEAR_PRODUCTS,
  payload: undefined,
});

export const thunkGetProducts =
  (filters = {}) =>
  async (dispatch) => {
    const environment = import.meta.env.VITE_NODE_ENV || "development";
    const newUrl = new URL(
      `/api/products`,
      environment === "development"
        ? "http://localhost:5173"
        : "https://pangaea-prime.onrender.com"
    );
    for (const [key, value] of Object.entries(filters)) {
      newUrl.searchParams.append(key, value);
    }

    try {
      const res = await csrfFetch(newUrl, {
        method: "GET",
      });
      const data = await res.json();
      console.log("This is the data", data);
      dispatch(addProducts(data));
      return data;
    } catch (err) {
      console.log("There was an error", err);
      return err;
    }
  };

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS: {
      const newState = structuredClone(state);
      const { products } = action.payload;
      for (const product of products) {
        if (!newState[product.id]) {
          newState[product.id] = { ...product };
          newState.orderedProductIds.push(product.id);
        }
      }
      return newState;
    }
    case actionTypes.CLEAR_PRODUCTS: {
      const newState = initialState;
      return newState;
    }
    default:
      return state;
  }
};
