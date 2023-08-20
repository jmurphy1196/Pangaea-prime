import { actionTypes } from "./actionTypes";
import { csrfFetch } from "./csrf";

const initalState = {
  orderedOrders: [],
};

const addOrder = (order) => ({
  type: actionTypes.CREATE_ORDER,
  payload: {
    order,
  },
});

const getOrders = (orders) => ({
  type: actionTypes.GET_ORDERS,
  payload: {
    orders,
  },
});

export const thunkGetOrders = () => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/orders/current");
    const data = await res.json();
    dispatch(getOrders(data));
    return data;
  } catch (err) {
    console.log("There was an error", err);
    if (err.json) return await err.json();
    return err;
  }
};

export const thunkCreateOrder = (addressData) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/orders`, {
      method: "POST",
      body: addressData,
    });
    const data = await res.json();
    console.log("This is the data", data);
    dispatch(addOrder(data));
    return data;
  } catch (err) {
    console.log("There was an error", err);
    if (err.json) return await err.json();
    return err;
  }
};

export const ordersReducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ORDER: {
      const newState = structuredClone(state);
      const { order } = action.payload;
      if (!newState[order.id]) newState.orderedOrders.push(order.id);
      newState[order.id] = order;

      return newState;
    }
    default:
      return state;
  }
};
