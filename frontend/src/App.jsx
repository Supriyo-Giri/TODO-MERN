import { useEffect, useState } from 'react';
import './App.css'
import InputField from './components/InputField'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import TodoCard from './components/TodoCard';

function App() {
  const [todos, setTodo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getTodos = await axios.get('http://localhost:5000/api/get-all-tasks');

        toast.success("Fetched all the todos");
        setTodo(getTodos.data);
        setLoading(false);

      } catch (error) {
        toast.error("Could not fetch todos!");
        console.log(`Error in fetching data! ${error}`);
      }
    }
  fetchData()
  }, [1])

  const fetchData = async () => {
      try {
        const getTodos = await axios.get('http://localhost:5000/api/get-all-tasks');
        setTodo(getTodos.data);
        setLoading(false);

      } catch (error) {
        toast.error("Could not fetch todos!");
        console.log(`Error in fetching data! ${error}`);
      }
    }
  if(loading){
    return(
      <div className='main-container'>
        <h1 className='heading'>TODO List Application</h1>
        <p className='loading-text'>Loading todos...</p>
        <ToastContainer />
      </div>

    )
  }

  if(todos.length === 0){
    return (
      <div className='main-container'>
      <h1 className='heading'>TODO List Application</h1>
      <InputField/>
      <h2 className='no-todo'>No todo found!</h2>
      <ToastContainer />
    </div>
    )
  }

  return (
    <div className='main-container'>
      <h1 className='heading'>TODO List Application</h1>
      <InputField refresh={fetchData}/>
      {
        todos.map(todo=>(
          <TodoCard task={todo.task} id={todo._id} refresh={fetchData} key={todo._id} isDone={todo.done}/>
        ))
      }
      <ToastContainer />
    </div>
  )
}

export default App
