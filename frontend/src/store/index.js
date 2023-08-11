import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import logger from "redux-logger";
import { productsReducer } from "./products";

const rootReducer = combineReducers({
  session,
  products: productsReducer,
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
