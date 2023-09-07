import { actionTypes } from "./actionTypes";
import { csrfFetch } from "./csrf";
const initialState = {
  orderedFeaturedProductIds: [],
};

const getFeaturedProducts = (products) => ({
  type: actionTypes.GET_FEATURED_PRODUCTS,
  payload: { products },
});

export const thunkGetFeaturedProducts = () => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/products/featured`);
    const data = await res.json();
    console.log("THIS IS THE DATA", data);
    dispatch(getFeaturedProducts(data));
    return data;
  } catch (err) {
    console.log("THERE WAS AN ERROR", err);
    if (err.json) return await err.json();
    return err;
  }
};

export const featuredProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_FEATURED_PRODUCTS: {
      const newState = structuredClone(state);
      const { products } = action.payload;
      for (const product of products) {
        if (!newState[product.id]) {
          newState[product.id] = { ...product.Product };
          newState.orderedFeaturedProductIds.push(product.id);
        }
      }
      return newState;
    }
    case actionTypes.DELETE_PRODUCT: {
      const newState = structuredClone(state);
      const { productId } = action.payload;
      const existingId = newState.orderedFeaturedProductIds.find(
        (id) => id == productId
      );
      if (existingId) {
        newState.orderedFeaturedProductIds =
          newState.orderedFeaturedProductIds.filter((id) => id != productId);
        delete newState[productId];
      }
      return newState;
    }
    default:
      return state;
  }
};
