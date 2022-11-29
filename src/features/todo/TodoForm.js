import React, { useRef } from 'react'
import { addTodo } from './todoSlice';
import { useDispatch } from 'react-redux';

const TodoForm = () => {

  const dispatch = useDispatch();
  const inputTodo = useRef(null);

  const handleFormAction = (e) => e.preventDefault();

  const handleAddTodo = () => {
    const uid = (Math.random()).toString()
    const todoValue = {
      id: uid.slice(2,uid.length),
      item: inputTodo.current.value.trim(),
      complete: false,
    }
    if(todoValue) {
      dispatch(addTodo(todoValue));
      inputTodo.current.value = '';
    }
  }

  return (
    <>
      <form className='todo-form' onSubmit={handleFormAction}>
        <div className="input-group">
          <input ref={inputTodo} type="text" />
        </div>
        <div className="input-control">
          <button type='button' className='form-button' onClick={handleAddTodo}>+</button>
        </div>
      </form>
    </>
  )
}

export default TodoForm
