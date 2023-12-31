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

const cancelOrder = (orderId) => ({
  type: actionTypes.CANCEL_ORDER,
  payload: {
    orderId,
  },
});

export const thunkCancelOrder = (orderId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/orders/${orderId}/cancel`, {
      method: "PUT",
    });
    const data = await res.json();
    dispatch(cancelOrder(orderId));
    return data;
  } catch (err) {
    console.log("there was an error, ", err);
    if (err.json) return await err.json();
    return err;
  }
};

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
    case actionTypes.CANCEL_ORDER: {
      const newState = structuredClone(state);
      const { orderId } = action.payload;
      if (newState.id == orderId) {
        newState.status = "cancelled";
      }
      return newState;
    }
    default:
      return state;
  }
};
