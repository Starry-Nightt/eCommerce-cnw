import { User } from "@/models/user.model";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: User;
  loggedIn: boolean;
}

const initialState: UserState = {
  user: null,
  loggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
    },
    update: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, update } = userSlice.actions;

export default userSlice.reducer;
