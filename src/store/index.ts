import { configureStore, combineReducers } from "@reduxjs/toolkit";
// Redux for components
import RootReducer from "./Reducers/Root";
import MapReducer from "./Reducers/Map";

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
