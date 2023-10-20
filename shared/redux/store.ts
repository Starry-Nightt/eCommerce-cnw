import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter.slice";
import spinnerReducer from "./spinner.slice";

export const store = configureStore({
  reducer: combineReducers({
    counter: counterReducer,
    spinner: spinnerReducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
