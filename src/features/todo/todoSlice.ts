import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { todos } from "@/data/todos";

// Define a type for the slice state
interface TodoState {
  todos?: any;
}

// Define the initial state using that type
const initialState: TodoState = {
  todos: todos,
};

export const todoSlice = createSlice({
  name: "todo",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<any>) => {
      state.todos = state.todos?.concat(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<any>) => {
      state.todos = state.todos?.filter(
        (todo) => todo?.id !== action.payload.id
      );
    },
    markComplete: (state, action: PayloadAction<any>) => {
      state.todos = state.todos?.map((todo) =>
        todo?.id === action.payload.id ? { ...todo, completed: true } : todo
      );
    },
  },
});

export const { addTodo, deleteTodo, markComplete } = todoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth.isLoggedIn;

export default todoSlice.reducer;
