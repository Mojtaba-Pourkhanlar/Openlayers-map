import { configureStore, combineReducers } from "@reduxjs/toolkit";
// Redux for components
import RootReducer from "./Reducers/Root";
import ProjetcReducer from "./Reducers/Projects";
import ProfileReducer from "./Reducers/Profile";
import MapReducer from "./Reducers/Map";
import HistoryReducer from "./Reducers/History";

const reducer = combineReducers({
  root: RootReducer,
  project: ProjetcReducer,
  profile: ProfileReducer,
  map: MapReducer,
  history: HistoryReducer,
});

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type Store = ReturnType<typeof store.getState>;

export default store;
