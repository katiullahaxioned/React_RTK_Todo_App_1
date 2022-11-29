import React from 'react'
import { EditBtn, DeleteBtn, CompleteBtn } from './svgIcons';

const TodoItems = (props) => {
  const {id, handleFormUpdate, textareaUpdate, item, complete, handleEdit, handleComplete, handleDelete} = props;
  return (
    <li className='todo-item'>
      <form className='form-todo-update' onSubmit={handleFormUpdate}>
        <p className='textarea-para'>{item}</p>
        <div className="input-textarea">
          <textarea className="textarea" onKeyUp={(e) => textareaUpdate(e, id)} defaultValue={item} />
        </div>
      </form>
      {complete && <span className='completed-flag'>done</span>}
      <div className="todo-items-control">
        <span className="edit-btn" onClick={(e) => handleEdit(e)}><EditBtn /></span>
        {!complete && <span className="complete-btn" onClick={() => handleComplete(id)}><CompleteBtn /></span>}
        <span className="delete-btn" onClick={() => handleDelete(id)}><DeleteBtn /></span>
      </div>
    </li>
  )
}

export default TodoItems