import { actionTypes } from "./actionTypes";
import { csrfFetch } from "./csrf";

const initalState = {
  products: [],
  numberOfProducts: 0,
};

const getCart = (cart) => ({
  type: actionTypes.GET_CART,
  payload: {
    cart,
  },
});

// sends entire new cart
const addProductToCart = (cart) => ({
  type: actionTypes.ADD_TO_CART,
  payload: {
    cart,
  },
});

export const thunkGetCart = () => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/carts/current`);
    const data = await res.json();
    console.log("this is the data", data);
    dispatch(getCart(data));
    return data;
  } catch (err) {
    console.log("There was an error", err);
    if (err.json) return await err.json();
    return err;
  }
};

export const thunkAddProductToCart =
  (productId, quantity) => async (dispatch) => {
    try {
      const res = await csrfFetch(`/api/carts`, {
        method: "POST",
        body: {
          productId,
          quantity,
        },
      });
      const data = await res.json();
      console.log("THIS IS THE DATA", data);
      dispatch(addProductToCart(data));
    } catch (err) {
      if (err) return await err.json();
      return err;
    }
  };

export const cartReducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.GET_CART: {
      const newState = structuredClone(state);
      const { cart } = action.payload;
      newState.products = cart.products;
      newState.numberOfProducts = cart.products.length;
      return newState;
    }
    case actionTypes.ADD_TO_CART: {
      const newState = structuredClone(state);
      const { cart } = action.payload;
      newState.products = cart.products;
      newState.numberOfProducts = cart.products.length;
      return newState;
    }
    default:
      return state;
  }
};
