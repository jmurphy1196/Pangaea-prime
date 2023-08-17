import { actionTypes } from "./actionTypes";
import { csrfFetch } from "./csrf";

const initalState = null;

export const clearSingleProduct = () => ({
  type: actionTypes.CLEAR_PRODUCT,
});

const setSingleProduct = (product) => ({
  type: actionTypes.SET_PRODUCT,
  payload: {
    product,
  },
});

const deleteSingleProduct = (productId) => ({
  type: actionTypes.DELETE_PRODUCT,
  payload: {
    productId,
  },
});

const addReviewData = (reviews, userReview) => ({
  type: actionTypes.GET_PRODUCT_REVIEWS,
  payload: {
    reviews,
    userReview,
  },
});

const editReviewData = (review) => ({
  type: actionTypes.EDIT_PRODUCT_REVIEW,
  payload: {
    review,
  },
});

const deleteReviewData = (reviewId) => ({
  type: actionTypes.DELETE_PRODUCT_REVIEW,
  payload: {
    reviewId,
  },
});

const createReviewData = (review) => ({
  type: actionTypes.CREATE_PRODUCT_REVIEW,
  payload: {
    review,
  },
});

export const thunkDeleteProductReview = (reviewId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
    });
    dispatch(deleteReviewData(reviewId));
    const data = await res.json();
  } catch (err) {
    if (err.json) return await err.json();
    return err;
  }
};

export const thunkEditProductReview =
  (reviewId, reviewData) => async (dispatch) => {
    try {
      const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        body: reviewData,
      });
      const data = await res.json();
      dispatch(editReviewData(data));
      return data;
    } catch (err) {
      if (err.json) return err.json();
      return err;
    }
  };

export const thunkCreateReview =
  (productId, reviewData) => async (dispatch) => {
    try {
      const res = await csrfFetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        body: reviewData,
      });
      const data = await res.json();
      console.log("THIS IS THE DATA", data);
      dispatch(createReviewData(data));
      return data;
    } catch (err) {
      if (err.json) return await err.json();
      return err;
    }
  };

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

export const thunkGetReviewData = (productId) => async (dispatch) => {
  try {
    console.log("Getting review data...");
    const res = await csrfFetch(`/api/products/${productId}/reviews`);
    const data = await res.json();
    dispatch(addReviewData(data.reviews, data.userReview));
    return data;
  } catch (err) {
    console.log("there was an err", err);
    if (err.json) return await err.json();
    return err;
  }
};

export const thunkDeleteSingleProduct = (productId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/products/${productId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    dispatch(deleteSingleProduct(productId));
    return data;
  } catch (err) {
    console.log("there was an err", err);
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

      const newState = structuredClone({ ...state, ...product });
      return newState;
    }
    case actionTypes.CREATE_PRODUCT_REVIEW: {
      const { review } = action.payload;
      const newState = structuredClone(state);
      newState.reviews = [...newState.reviews, review];
      newState.userReview = review;
      newState.numRatings += 1;
      return newState;
    }
    case actionTypes.DELETE_PRODUCT: {
      return initalState;
    }
    case actionTypes.CLEAR_PRODUCT: {
      console.log("THIS IS RUNNNNING");
      return initalState;
    }
    case actionTypes.GET_PRODUCT_REVIEWS: {
      const { reviews, userReview } = action.payload;
      const newState = structuredClone(state);
      newState.reviews = reviews;
      newState.userReview = userReview;
      return newState;
    }
    case actionTypes.EDIT_PRODUCT_REVIEW: {
      const { review } = action.payload;
      const newState = structuredClone(state);
      newState.reviews.userReview = review;

      let existingReviewIdx = newState.reviews.findIndex(
        (rev) => rev.id == review.id
      );
      if (existingReviewIdx !== -1) {
        newState.reviews[existingReviewIdx] = review;
      }
      return newState;
    }
    case actionTypes.DELETE_PRODUCT_REVIEW: {
      const newState = structuredClone(state);
      const { reviewId } = action.payload;
      console.log("REVIEWID", reviewId);
      newState.userReview = null;
      newState.numRatings -= 1;
      newState.reviews = newState.reviews.filter((rev) => rev.id != reviewId);
      return newState;
    }
    default:
      return state;
  }
};
