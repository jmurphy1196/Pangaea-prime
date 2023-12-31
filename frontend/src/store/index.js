import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import logger from "redux-logger";
import { productsReducer } from "./products";
import { singleProductReducer } from "./singleProduct";
import { categoriesReducer } from "./categories";
import { cartReducer } from "./cart";
import { ordersReducer } from "./orders";
import { singleOrderReducer } from "./singleOrder";
import { featuredProductsReducer } from "./featuredProducts";

const rootReducer = combineReducers({
  session,
  products: productsReducer,
  singleProduct: singleProductReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  orders: ordersReducer,
  singleOrder: singleOrderReducer,
  featuredProducts: featuredProductsReducer,
});

let enhancer;

const environment = import.meta.env.VITE_NODE_ENV || "development";

if (environment === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
