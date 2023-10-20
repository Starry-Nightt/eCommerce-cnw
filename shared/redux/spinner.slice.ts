import { createSlice } from "@reduxjs/toolkit";

export interface SpinnerState {
  loading: boolean;
}

const initialState: SpinnerState = {
  loading: false,
};

export const spinnerSlice = createSlice({
  name: "spinner",
  initialState,
  reducers: {
    showSpinner: (state) => {
      state.loading = true;
    },
    hideSpinner: (state) => {
      state.loading = false;
    },
  },
});

export const { showSpinner, hideSpinner } = spinnerSlice.actions;

export default spinnerSlice.reducer;
