import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./redux/reducer";

const initialState = {};


export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(),
);