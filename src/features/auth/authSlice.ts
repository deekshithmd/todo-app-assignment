"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DatabaseType } from "@/types/type";
import { sampleData } from "@/utils/contants";

// Define a type for the slice state
interface AuthState {
  isLoggedIn?: boolean;
  userData?: DatabaseType;
}

// Define the initial state using that type
const initialState: AuthState = {
  isLoggedIn: false,
  userData: {},
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<DatabaseType>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      localStorage.setItem("isLoggedIn", String(state.isLoggedIn));
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
  },
});

export const { setUserData } = authSlice.actions;

export default authSlice.reducer;
