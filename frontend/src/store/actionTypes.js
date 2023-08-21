const SET_SESSION = "session/setUserData";
const REMOVE_SESSION = "session/removeUserData";
const GET_PRODUCTS = "products/getProductsData";
const CLEAR_PRODUCTS = "products/clearProductsData";
const SET_PRODUCT = "singleProduct/setProductData";
const CLEAR_PRODUCT = "singleProduct/clearProductData";
const GET_CATEGORIES = "categories/getCategoriesData";
const CREATE_PRODUCT = "singleProduct/createProduct";
const UPDATE_PRODUCT = "singleProduct/updateProduct";
const DELETE_PRODUCT = "singleProduct/deleteProduct";
const GET_PRODUCT_REVIEWS = "singleProduct/getReviewData";
const CREATE_PRODUCT_REVIEW = "singleProduct/createReview";
const EDIT_PRODUCT_REVIEW = "singleProduct/editProductReview";
const DELETE_PRODUCT_REVIEW = "singleProduct/deleteProductReview";
const GET_CART = "cart/getCartData";
const ADD_TO_CART = "cart/addProductToCard";
const UPDATE_CART_QTY = "cart/updateProductQty";
const REMOVE_PRODUCT_CART = "cart/removeProduct";
const CREATE_ORDER = "order/createOrder";
const GET_ORDERS = "order/getOrders";
const GET_ORDER = "singleOrder/getOrder";
const REMOVE_ORDER = "singleOrder/removeOrderData";
const CANCEL_ORDER = "singleOrder/cancelOrder";

export const actionTypes = {
  SET_SESSION,
  REMOVE_SESSION,
  GET_PRODUCTS,
  CLEAR_PRODUCTS,
  SET_PRODUCT,
  CLEAR_PRODUCT,
  GET_CATEGORIES,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT_REVIEWS,
  CREATE_PRODUCT_REVIEW,
  EDIT_PRODUCT_REVIEW,
  DELETE_PRODUCT_REVIEW,
  GET_CART,
  ADD_TO_CART,
  UPDATE_CART_QTY,
  REMOVE_PRODUCT_CART,
  CREATE_ORDER,
  GET_ORDERS,
  GET_ORDER,
  REMOVE_ORDER,
  CANCEL_ORDER,
};
