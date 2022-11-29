import React, { useRef } from 'react'
import { addTodo } from './todoSlice';
import { useDispatch } from 'react-redux';

const TodoForm = () => {
  const dispatch = useDispatch();
  const inputTodo = useRef(null);

  // prevent form's default behavior
  const handleFormAction = (e) => e.preventDefault();

  // add new todo
  const handleAddTodo = () => {
    const inputVal = inputTodo.current.value.trim();
    const uid = (Math.random()).toString()
    const todoValue = {
      id: uid.slice(2,),
      item: inputVal,
      complete: false,
    }
    if(inputVal.length > 0) {
      dispatch(addTodo(todoValue));
      inputTodo.current.value = '';
    }
  }

  return (
    <>
      <form className='todo-form' onSubmit={handleFormAction}>
        <div className="input-group">
          <input ref={inputTodo} type="text" className='todo-input' />
        </div>
        <div className="input-control">
          <button type='button' className='form-button' onClick={handleAddTodo}>+</button>
        </div>
      </form>
    </>
  )
}

export default TodoForm
