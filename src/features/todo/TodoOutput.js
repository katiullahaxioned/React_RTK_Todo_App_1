import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateTodo, deleteTodo, completeTodo } from './todoSlice';


const TodoOutput = () => {
  const dispatch = useDispatch();
  const todoContainer = useRef(null);
  const todoItems = useSelector((state) => state.todos);

  const removeActive = () => {
    for (let item of todoContainer?.current?.children)
      item.classList.remove("active");
  };

  const handleEdit = (e) => {
    removeActive();
    e.target.parentElement.parentElement.classList.add("active");
  }

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
    removeActive();
  }

  const textareaUpdate = (e, id) => {
    if (e.key === "Enter") {
      dispatch(updateTodo({ id, item: e.target.value.trim() }));
      removeActive();
    }
  };

  const handleComplete = (id) => {
    dispatch(completeTodo(id));
    removeActive();
  }

  const handleFormUpdate = (e) => e.preventDefault();

  return (
    <div className='todo'>
      <div className="toggle-task">
        <span className="toggle-btn active-btn">active</span>
        <span className="toggle-btn completed-btn">completed</span>
        <span className="toggle-btn all-btn">all</span>
      </div>
      <ul className="todo-items-all" ref={todoContainer}>
        {todoItems && todoItems.map((todo) => {
          const {id, item} = todo;
          return (
            <li key={id} className='todo-item'>
              <form className='form-todo-update' onSubmit={handleFormUpdate}>
                <p className='textarea-para'>{item}</p>
                <div className="input-textarea">
                  <textarea className="textarea" onKeyUp={(e) => textareaUpdate(e, id)} defaultValue={item} />
                </div>
              </form>
              <div className="todo-items-control">
                <span className="toggle-btn edit-btn" onClick={(e) => handleEdit(e)}>edit</span>
                <span className="toggle-btn complete-btn" onClick={() => handleComplete(id)}>complete</span>
                <span className="toggle-btn delete-btn" onClick={() => handleDelete(id)}>delete</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoOutput
