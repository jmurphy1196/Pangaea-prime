import { actionTypes } from "./actionTypes";
import { csrfFetch } from "./csrf";

const initalState = null;

const setSingleProduct = (product) => ({
  type: actionTypes.SET_PRODUCT,
  payload: {
    product,
  },
});

export const thunkSetSingleProduct = (productId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/products/${productId}`);
    const data = await res.json();
    console.log("this is the data", data);
    dispatch(setSingleProduct(data));
  } catch (err) {
    console.log("there was an error", err);
    if (err.json) return await err.json();
    return err;
  }
};

export const thunkUpdateSingleProduct =
  (productId, productData, imageData = null) =>
  async (dispatch) => {
    try {
      console.log("updating product..." + productId);
      console.log("THIS IS THE IMAGEDATA", imageData);
      console.log("imageData entries length", imageData.entries().length);
      const res = await csrfFetch(`/api/products/${productId}`, {
        method: "PUT",
        body: productData,
      });
      const data = await res.json();
      console.log("This is the data", data);
      if (imageData) {
        console.log("DISPATCHING THUNK TO UPLOAD PRODUCT IMAGES", imageData);
        await dispatch(thunkUploadProductImages(productId, imageData));
      }
      return data;
    } catch (err) {
      console.log("there was an error", err);
      if (err.json) return await err.json();
      return err;
    }
  };

export const thunkCreateSingleProduct =
  (productData, imageData) => async (dispatch) => {
    try {
      const res = await csrfFetch(`/api/products`, {
        method: "POST",
        body: productData,
      });
      const data = await res.json();
      console.log("This is the data", data);
      console.log("this is the image data", imageData);
      //   upload the images
      if (imageData) {
        await dispatch(thunkUploadProductImages(data.id, imageData));
      }
      return data;
    } catch (err) {
      console.log("there was an err", err);
      if (err.json) return await err.json();
      return err;
    }
  };

export const thunkUploadProductImages =
  (productId, imageData) => async (dispatch) => {
    try {
      const res = await csrfFetch(
        `/api/products/${productId}/images`,
        {
          method: "POST",
          body: imageData,
        },
        true
      );
      const data = await res.json();
      console.log("THIS IS THE DATA", data);
      return data;
    } catch (err) {
      console.log("there was an error", err);
      if (err.json) return await err.json();
      return err;
    }
  };

export const singleProductReducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.SET_PRODUCT: {
      const { product } = action.payload;
      const newState = { ...product };
      return newState;
    }
    case actionTypes.CLEAR_PRODUCT: {
      return initalState;
    }
    default:
      return state;
  }
};
