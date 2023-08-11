import { actionTypes } from "./actionTypes";
import { csrfFetch } from "./csrf";

const initialState = { user: null };

const setSession = (user) => ({
  type: actionTypes.SET_SESSION,
  payload: user,
});
export const removeSession = () => ({
  type: actionTypes.REMOVE_SESSION,
});

export const thunkSetSession =
  ({ credential, password }) =>
  async (dispatch) => {
    try {
      const res = await csrfFetch("/api/session", {
        method: "POST",
        body: { credential, password },
      });
      const data = await res.json();
      dispatch(setSession(data));
      return data;
    } catch (err) {
      console.log("there was an err", err);
      if (err.json) return await err.json();
    }
  };
export const thunkGetSession = () => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/session");
    const data = await res.json();
    dispatch(setSession(data));
    return data;
  } catch (err) {
    return err.json();
  }
};
export const thunkCreateUser =
  ({ email, username, password, firstName, lastName }) =>
  async (dispatch) => {
    try {
      const res = await csrfFetch("/api/users", {
        method: "POST",
        body: {
          email,
          username,
          password,
          firstName,
          lastName,
        },
      });
      const data = await res.json();
      await csrfFetch("/api/session", {
        method: "POST",
        body: { credential: username, password },
      });
      await csrfFetch("/api/session");
      dispatch(setSession(data));

      return data;
    } catch (err) {
      console.log("there was an error", err);
      if (err.json) return await err.json();
    }
  };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SESSION:
      return { ...state, user: action.payload.user };
    case actionTypes.REMOVE_SESSION:
      return { ...state, user: null };
    default:
      return state;
  }
}
