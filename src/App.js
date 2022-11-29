import './App.css';
import TodoForm from './features/todo/TodoForm';
import TodoOutput from './features/todo/TodoOutput';

function App() {
  return (
    <div className='App'>
      <h2 className='section-heading'>todo app</h2>
      <TodoForm />
      <TodoOutput />
    </div>
  );
}

export default App;
