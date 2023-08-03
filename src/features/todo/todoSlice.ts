import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
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
    populateTodo: (state, action: PayloadAction<any>) => {
      state.todos = action.payload ? action.payload : todos;
    },
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
    updateEditedTodo: (state, action: PayloadAction<any>) => {
      state.todos = state.todos?.map((todo) =>
        todo?.id === action.payload.id ? action.payload : todo
      );
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  markComplete,
  updateEditedTodo,
  populateTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
