import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import cartReducer from "./ducks/cart";
import productsReducer from "./ducks/products";

import { composeWithDevTools } from "redux-devtools-extension";

const combinedReducers = combineReducers({
  cartReducer,
  productsReducer,
});

const store = createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
