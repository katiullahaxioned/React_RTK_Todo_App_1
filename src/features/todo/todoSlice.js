import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      return [...state, action.payload]
    },
    updateTodo: (state, action) => {
      const {id, item} = action.payload;
      for(let todo of state) if(todo.id === id) todo.item = item;
      return state;
    },
    deleteTodo: (state, action) => {
      return state.filter(item => item.id !== action.payload)
    },
    completeTodo: (state, action) => {
      for(let todo of state) if(todo.id === action.payload) todo.complete = true;
      return state;
    },
  }
})

export default todoSlice.reducer;
export const {addTodo, updateTodo, deleteTodo, completeTodo } = todoSlice.actions;
