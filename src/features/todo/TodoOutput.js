import React, { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateTodo, deleteTodo, completeTodo } from './todoSlice';


const TodoOutput = () => {
  const dispatch = useDispatch();
  const todoContainer = useRef(null);
  const [todoStatus, setTodoStatus] = useState("active");
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
  
  // status toggle controls
  const handleTodoStatus = (status) => {
    setTodoStatus(status);
    removeActive();
  } 

  return (
    <div className='todo'>
      <div className="task-status-control">
        <span className={todoStatus === "active" ? "active" : ""} onClick={() => handleTodoStatus("active")}>active</span>
        <span className={todoStatus === "completed" ? "active" : ""} onClick={() => handleTodoStatus("completed")}>completed</span>
        <span className={todoStatus === "all" ? "active" : ""} onClick={() => handleTodoStatus("all")}>all</span>
      </div>
      <ul className="todo-items-all" ref={todoContainer}>
        {/* todoStatus === "all" */}
        {todoStatus === "all" && todoItems && todoItems.map((todo) => {
          const {id, item, complete} = todo;
          return (
            <li key={id} className='todo-item'>
              <form className='form-todo-update' onSubmit={handleFormUpdate}>
                <p className='textarea-para'>{item}</p>
                <div className="input-textarea">
                  <textarea className="textarea" onKeyUp={(e) => textareaUpdate(e, id)} defaultValue={item} />
                </div>
              </form>
              {complete && <span className='completed-flag'>✓</span>}
              <div className="todo-items-control">
                <span className="edit-btn" onClick={(e) => handleEdit(e)}>edit</span>
                {!complete && <span className="complete-btn" onClick={() => handleComplete(id)}>complete</span>}
                <span className="delete-btn" onClick={() => handleDelete(id)}>delete</span>
              </div>
            </li>
          );
        })}
        {/* todoStatus === "completed" */}
        {todoStatus === "completed" && todoItems && todoItems.map((todo) => {
          const {id, item, complete} = todo;
          let todoCompleted;
          if(complete) {
            todoCompleted = <li key={id} className='todo-item'>
              <form className='form-todo-update' onSubmit={handleFormUpdate}>
                <p className='textarea-para'>{item}</p>
                <div className="input-textarea">
                  <textarea className="textarea" onKeyUp={(e) => textareaUpdate(e, id)} defaultValue={item} />
                </div>
              </form>
              <span className='completed-flag'>✓</span>
              <div className="todo-items-control">
                <span className="edit-btn" onClick={(e) => handleEdit(e)}>edit</span>
                <span className="delete-btn" onClick={() => handleDelete(id)}>delete</span>
              </div>
            </li>
          }
          return todoCompleted
        })}
        {/* todoStatus === "active" */}
        {todoStatus === "active" && todoItems && todoItems.map((todo) => {
          const {id, item, complete} = todo;
          let todoActive;
          if(!complete) {
            todoActive = <li key={id} className='todo-item'>
              <form className='form-todo-update' onSubmit={handleFormUpdate}>
                <p className='textarea-para'>{item}</p>
                <div className="input-textarea">
                  <textarea className="textarea" onKeyUp={(e) => textareaUpdate(e, id)} defaultValue={item} />
                </div>
              </form>
              <div className="todo-items-control">
                <span className="edit-btn" onClick={(e) => handleEdit(e)}>edit</span>
                <span className="complete-btn" onClick={() => handleComplete(id)}>complete</span>
                <span className="delete-btn" onClick={() => handleDelete(id)}>delete</span>
              </div>
            </li>
          }
          return todoActive
        })}
      </ul>
    </div>
  );
}

export default TodoOutput
