import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { editTodo } from './todoSlice';


const TodoOutput = () => {
  const todoItems = useSelector((state) => state.todos.todo);
  // const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const todoContainer = useRef(null);
  const textarea = useRef(null);

  // useEffect(()=>{
  //   // const textareaUpdate = (e) => {
  //   //   // if(e.target.key === 'Enter') {
  //   //     console.log(e.target);
  //   //     // dispatch(editTodo({message: e.target.value.trim(), index: e.target.dataset.index}))
  //   //   // }
  //   // }
  //   textarea?.current?.addEventListener('keydown', (e) => {
  //     // if(e.key === 'Enter') {
  //       console.log(e.target.value);
  //       // dispatch(editTodo({message: e.target.value.trim(), index: e.target.dataset.index}))
  //     // }
  //   } )
  //   // return () => {
  //   //   textarea?.current?.removeEventListener('keypress', textareaUpdate)
  //   // }
  // }, [])

  const handleEdit = (index) => {
    const itemLi = todoContainer.current.children;
    for(let item of itemLi) {
      item.classList.remove("active");
    }
    itemLi[index].classList.add("active");
  }

  const handleFormUpdate = (e) => {
    // e.preventDefault();
    // console.log(textarea.current.value);
  }


  return (
    <>
      <div className="toggle-task">
        <span className="toggle-btn active">active</span>
        <span className="toggle-btn completed">completed</span>
        <span className="toggle-btn all">all</span>
      </div>
      <ul className="todo-items-all" ref={todoContainer}>
        {todoItems.map((item, i) => {
          return (
            <li key={i} className='todo-item'>
              <form className='form-todo-update' onSubmit={handleFormUpdate}>
                <p className='textarea-para'>{item}</p>
                <div className="input-textarea">
                  <textarea className="textarea" ref={textarea} data-index={i} defaultValue={item}></textarea>
                </div>
              </form>
              <div className="todo-items-control">
                <span className="toggle-btn edit" onClick={() => handleEdit(i)}>edit</span>
                <span className="toggle-btn complete">complete</span>
                <span className="toggle-btn delete">delete</span>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default TodoOutput










//   return (
//     <>
//       <div className="toggle-task">
//         <span className="toggle-btn active">active</span>
//         <span className="toggle-btn completed">completed</span>
//         <span className="toggle-btn all">all</span>
//       </div>
//       <ul className="todo-items-all" ref={todoContainer}>
//         {todoItems.map((item, i) => {
//           return (
//             <li key={i} className='todo-item'>
//               <p className='textarea-para' style={{display: `${isEdit ? 'none' : 'block'}`}}>{item}</p>
//               <div className="input-textarea">
//                 <textarea className="textarea" ref={textarea} data-index={i} defaultValue={item} style={{display: `${isEdit ? 'block' : 'none'}`}}></textarea>
//               </div>
//               <div className="todo-items-control">
//                 <span className="toggle-btn edit" onClick={() => handleEdit(i)}>edit</span>
//                 <span className="toggle-btn complete">complete</span>
//                 <span className="toggle-btn delete">delete</span>
//               </div>
//             </li>
//           );
//         })}
//       </ul>
//     </>
//   );
// }

// export default TodoOutput