import { combineReducers, configureStore } from "@reduxjs/toolkit";
// Redux for components
import MapReducer from "./Reducers/Map";
import RootReducer from "./Reducers/Root";

const reducer = combineReducers({
  root: RootReducer,
  map: MapReducer,
});

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type Store = ReturnType<typeof store.getState>;

export default store;
