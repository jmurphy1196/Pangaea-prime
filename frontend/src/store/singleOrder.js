import { actionTypes } from "./actionTypes";
import { csrfFetch } from "./csrf";

const initialState = {};

const getOrder = (order) => ({
  type: actionTypes.GET_ORDER,
  payload: {
    order,
  },
});

export const removeOrder = () => ({
  type: actionTypes.REMOVE_ORDER,
});

export const thunkGetOrder = (orderId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/orders/${orderId}`);
    const data = await res.json();
    dispatch(getOrder(data));
    return data;
  } catch (err) {
    console.log("There was an error", err);
    if (err.json) return await err.json();
    return err;
  }
};

export const singleOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ORDER: {
      let newState = structuredClone(state);
      newState = { ...action.payload.order };
      return newState;
    }
    case actionTypes.REMOVE_ORDER: {
      return initialState;
    }
    default:
      return state;
  }
};
