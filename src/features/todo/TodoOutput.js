import React, { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateTodo, deleteTodo, completeTodo } from './todoSlice';
import TodoItems from './TodoItems';


const TodoOutput = () => {
  const dispatch = useDispatch();
  const todoContainer = useRef(null);
  const [todoStatus, setTodoStatus] = useState("active");
  const todoItems = useSelector((state) => state.todos);

  // remove previous <li> "active" class, when edit function invoked
  const removeActive = () => {
    for (let item of todoContainer?.current?.children)
      item.classList.remove("active");
  };

  // todo item edit function
  const handleEdit = (e) => {
    removeActive();
    e.currentTarget.parentElement.parentElement.classList.add("active");
  }

  // todo item delete function
  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
    removeActive();
  }

  // update function:  to update modified textarea's value 
  const textareaUpdate = (e, id) => {
    if (e.key === "Enter") {
      dispatch(updateTodo({ id, item: e.target.value.trim() }));
      removeActive();
    }
  };

  // set todo item's status = completed 
  const handleComplete = (id) => {
    dispatch(completeTodo(id));
    removeActive();
  }

  // prevent form's default behavior
  const handleFormUpdate = (e) => e.preventDefault();
  
  // todo item's status toggle function
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
            <TodoItems key={id} id={id} handleFormUpdate={handleFormUpdate} textareaUpdate={textareaUpdate} item={item} complete={complete} handleEdit={handleEdit} handleComplete={handleComplete} handleDelete={handleDelete} />
          );
        })}
        {/* todoStatus === "completed" */}
        {todoStatus === "completed" && todoItems && todoItems.map((todo) => {
          const {id, item, complete} = todo;
          let todoCompleted;
          if(complete) {
            todoCompleted = <TodoItems key={id} id={id} handleFormUpdate={handleFormUpdate} textareaUpdate={textareaUpdate} item={item} complete={complete} handleEdit={handleEdit} handleComplete={handleComplete} handleDelete={handleDelete} />
          }
          return todoCompleted;
        })}
        {/* todoStatus === "active" */}
        {todoStatus === "active" && todoItems && todoItems.map((todo) => {
          const {id, item, complete} = todo;
          let todoActive;
          if(!complete) {
            todoActive = <TodoItems key={id} id={id} handleFormUpdate={handleFormUpdate} textareaUpdate={textareaUpdate} item={item} complete={complete} handleEdit={handleEdit} handleComplete={handleComplete} handleDelete={handleDelete} />
          }
          return todoActive;
        })}
      </ul>
    </div>
  );
}

export default TodoOutput
