import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter.slice";
import spinnerReducer from "./spinner.slice";
import userReducer from "./user.slice";
import authModalReducer from "./auth-modal.slice";

export const store = configureStore({
  reducer: combineReducers({
    counter: counterReducer,
    spinner: spinnerReducer,
    user: userReducer,
    authModal: authModalReducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
