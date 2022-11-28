import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todo: []
}

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todo.push(action.payload);
    },
    editTodo: (state, {message, index}) => {
      state.todo.splice(index, 1, message);
    }
  }
})

export default todoSlice.reducer;
export const {addTodo, editTodo} = todoSlice.actions;