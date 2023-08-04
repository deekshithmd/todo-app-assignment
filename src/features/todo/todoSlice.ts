"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { database } from "@/data/database";
import { DatabaseType } from "@/types/type";

// Define a type for the slice state
interface TodoState {
  todos?: DatabaseType;
}

// Define the initial state using that type
const initialState: TodoState = {
  todos: {},
};

export const todoSlice = createSlice({
  name: "todo",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    populateTodo: (state, action: PayloadAction<any>) => {
      state.todos = action.payload ? action.payload : database[0];
    },
    addTodo: (state, action: PayloadAction<any>) => {
      state.todos = {
        ...state.todos,
        todos: state?.todos?.todos?.concat(action.payload),
      };
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...state.todos,
          todos: state.todos?.todos?.map((todo) => todo),
        })
      );
    },
    deleteTodo: (state, action: PayloadAction<any>) => {
      state.todos = {
        ...state.todos,
        todos: state.todos?.todos?.filter(
          (todo) => todo?.id !== action.payload.id
        ),
      };
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...state.todos,
          todos: state.todos?.todos?.map((todo) => todo),
        })
      );
    },
    markComplete: (state, action: PayloadAction<any>) => {
      state.todos = {
        ...state.todos,
        todos: state.todos?.todos?.map((todo) =>
          todo?.id === action.payload.id ? { ...todo, completed: true } : todo
        ),
      };
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...state.todos,
          todos: state.todos?.todos?.map((todo) => todo),
        })
      );
    },
    updateEditedTodo: (state, action: PayloadAction<any>) => {
      state.todos = {
        ...state.todos,
        todos: state.todos?.todos?.map((todo) =>
          todo?.id === action.payload.id ? action.payload : todo
        ),
      };
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...state.todos,
          todos: state.todos?.todos?.map((todo) => todo),
        })
      );
    },
    markImportant: (state, action: PayloadAction<any>) => {
      state.todos = {
        ...state.todos,
        todos: state.todos?.todos?.map((todo) =>
          todo?.id === action.payload.id
            ? { ...todo, important: todo?.important ? false : true }
            : todo
        ),
      };
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...state.todos,
          todos: state.todos?.todos?.map((todo) => todo),
        })
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
  markImportant,
} = todoSlice.actions;

export default todoSlice.reducer;
