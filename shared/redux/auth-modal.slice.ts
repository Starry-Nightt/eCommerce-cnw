import { User } from "@/models/user.model";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthFormState {
  showingLogin: boolean;
  showingRegister: boolean;
}

const initialState: AuthFormState = {
  showingLogin: false,
  showingRegister: false,
};

export const authModalSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    showLogin: (state, action: PayloadAction) => {
      state.showingLogin = true;
      state.showingRegister = false;
    },
    hideLogin: (state, action: PayloadAction) => {
      state.showingLogin = false;
      state.showingRegister = false;
    },
    showRegister: (state) => {
      state.showingLogin = false;
      state.showingRegister = true;
    },
    hideRegister: (state) => {
      state.showingLogin = false;
      state.showingRegister = false;
    },
  },
});

export const { showLogin, showRegister, hideLogin, hideRegister } =
  authModalSlice.actions;

export default authModalSlice.reducer;
