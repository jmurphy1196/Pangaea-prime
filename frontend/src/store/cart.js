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

const updateProductQty = (product) => ({
  type: actionTypes.UPDATE_CART_QTY,
  payload: {
    product,
  },
});

const removeProductCart = (productId) => ({
  type: actionTypes.REMOVE_PRODUCT_CART,
  payload: {
    productId,
  },
});

export const thunkRemoveProductCart = (productId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/carts`, {
      method: "DELETE",
      body: {
        productId,
      },
    });
    dispatch(removeProductCart(productId));
    return await res.json();
  } catch (err) {
    console.log("There was an error", err);
    if (err.json) return await err.json();
    return err;
  }
};

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

export const thunkUpdateProductQty =
  (productId, quantity) => async (dispatch) => {
    try {
      const res = await csrfFetch(`/api/carts`, {
        method: "PUT",
        body: { productId, quantity },
      });
      const data = await res.json();
      dispatch(updateProductQty(data));
    } catch (err) {
      console.log("there was an err", err);
      if (err.json) return await err.json();
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
    case actionTypes.UPDATE_CART_QTY: {
      const newState = structuredClone(state);
      const { product } = action.payload;
      newState.products = newState.products.map((prod) => {
        if (prod.id == product.id) return product;
        return prod;
      });
      return newState;
    }
    case actionTypes.REMOVE_PRODUCT_CART: {
      const newState = structuredClone(state);
      const { productId } = action.payload;
      newState.products = newState.products.filter(
        (prod) => prod.id != productId
      );
      newState.numberOfProducts -= 1;
      return newState;
    }
    case actionTypes.CREATE_ORDER: {
      return initalState;
    }
    case actionTypes.REMOVE_SESSION: {
      return initalState;
    }
    default:
      return state;
  }
};
