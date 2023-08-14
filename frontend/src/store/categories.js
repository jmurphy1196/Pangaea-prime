import { actionTypes } from "./actionTypes";
import { csrfFetch } from "./csrf";

const initalState = {
  orderedCategories: [],
};

const addCategories = (categories) => ({
  type: actionTypes.GET_CATEGORIES,
  payload: {
    categories,
  },
});

export const thunkGetCategories = () => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/categories");
    const data = await res.json();
    dispatch(addCategories(data));
    return data;
  } catch (err) {
    console.log("there was an error", err);
    if (err.json) return await err.json();
    return err;
  }
};

export const categoriesReducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORIES: {
      const newState = structuredClone(state);
      const { categories } = action.payload;
      newState.orderedCategories = categories;
      return newState;
    }
    default:
      return state;
  }
};
