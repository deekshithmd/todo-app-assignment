import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";

// Define a type for the slice state
interface AuthState {
  isLoggedIn?: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAuthenticaion: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
      localStorage.setItem("isLoggedIn", action.payload);
    },
  },
});

export const { setAuthenticaion } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
