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
    editTodo: (state, action) => {
      state.todo.splice(action.payload.index, 1, action.payload.message);
    }
  }
})

export default todoSlice.reducer;
export const {addTodo, editTodo} = todoSlice.actions;